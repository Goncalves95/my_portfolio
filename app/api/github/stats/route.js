import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCachedData, setCachedData, CACHE_KEYS } from '@/lib/github-cache';

// Load configuration
const configPath = path.join(process.cwd(), 'data', 'config.json');
let config = {};

try {
  const configData = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configData);
} catch (error) {
  console.error('Error loading config:', error);
  config = {
    profile: { yearsOfExperience: 3 },
    github: { username: 'Goncalves95' },
    stats: { overrideYearsOfExperience: false }
  };
}

const GITHUB_USERNAME = config.github?.username || 'Goncalves95';

export async function GET() {
  // Check cache first
  const cachedStats = getCachedData(CACHE_KEYS.STATS_DATA);
  if (cachedStats) {
    return NextResponse.json(cachedStats);
  }

  try {
    // Try to get cached user data
    let userData = getCachedData(CACHE_KEYS.USER_DATA);
    if (!userData) {
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      };

      // Add authentication if token is available
      const token = process.env.GITHUB_PAT || config.github?.personalAccessToken;
      if (token && token !== 'SEU_TOKEN_AQUI' && token !== '') {
        headers['Authorization'] = `token ${token}`;
      }

      const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });

      if (userResponse.ok) {
        userData = await userResponse.json();
        setCachedData(CACHE_KEYS.USER_DATA, userData);
      } else {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
    }

    // Try to get cached repos data
    let repos = getCachedData(CACHE_KEYS.REPOS_DATA);
    if (!repos) {
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      };

      // Add authentication if token is available
      const token = process.env.GITHUB_PAT || config.github?.personalAccessToken;
      if (token && token !== 'SEU_TOKEN_AQUI' && token !== '') {
        headers['Authorization'] = `token ${token}`;
      }

      const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });

      if (reposResponse.ok) {
        repos = await reposResponse.json();
        setCachedData(CACHE_KEYS.REPOS_DATA, repos);
      } else {
        throw new Error(`GitHub repos API error: ${reposResponse.status}`);
      }
    }

    // Calculate statistics
    const totalCommits = await getTotalCommits(GITHUB_USERNAME, repos);
    const languages = getLanguages(repos);
    const featuredRepos = getFeaturedRepos(repos);

    const stats = {
      user: {
        name: userData.name,
        login: userData.login,
        bio: userData.bio,
        location: userData.location,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      },
      stats: {
        totalCommits,
        totalRepos: userData.public_repos,
        languages,
        yearsOfExperience: calculateYearsOfExperience(userData.created_at),
      },
      featuredRepos,
    };

    // Cache the complete stats
    setCachedData(CACHE_KEYS.STATS_DATA, stats);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    
    // Return fallback data when GitHub API fails
    const fallbackStats = {
      user: {
        name: config.profile?.name || 'Fernando Gonçalves',
        login: GITHUB_USERNAME,
        bio: 'Software Engineer specializing in Full Stack Development and Data Analytics',
        location: 'Zurich, Switzerland',
        public_repos: 25,
        followers: 50,
        following: 100,
        created_at: '2021-06-01T00:00:00Z',
        updated_at: new Date().toISOString(),
      },
      stats: {
        totalCommits: (config.stats?.additionalCommits || 500) + 800,
        totalRepos: 25,
        languages: getLanguagesFromConfig(),
        yearsOfExperience: calculateYearsOfExperience('2021-06-01T00:00:00Z'),
      },
      featuredRepos: getFallbackRepos(),
    };

    // Cache fallback data for a shorter time
    setCachedData(CACHE_KEYS.STATS_DATA, fallbackStats);
    return NextResponse.json(fallbackStats);
  }
}

async function getTotalCommits(username, repos) {
  let totalCommits = 0;
  
  // For performance, we'll estimate based on recent activity
  // GitHub API has rate limits, so we'll be strategic
  try {
    // Get contributions from the last year
    const currentYear = new Date().getFullYear();
    const contributions = [];
    
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const week = getWeekNumber(date);
      
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/stats/contributors`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            totalCommits = data.reduce((sum, contributor) => sum + contributor.total, 0);
            break; // Got the data, no need to continue
          }
        }
      } catch (error) {
        // If we can't get detailed stats, estimate based on repo activity
        continue;
      }
    }

    // Always add additional commits from config (for private repos)
    if (config.stats?.additionalCommits) {
      totalCommits += config.stats.additionalCommits;
    }
    
    // Fallback: estimate based on repo count and average activity
    if (totalCommits === 0) {
      totalCommits = repos.length * 50; // Rough estimate
      // Still add additional commits even in fallback
      if (config.stats?.additionalCommits) {
        totalCommits += config.stats.additionalCommits;
      }
    }
  } catch (error) {
    // Final fallback with additional commits
    totalCommits = repos.length * 50;
    if (config.stats?.additionalCommits) {
      totalCommits += config.stats.additionalCommits;
    }
  }

  return totalCommits;
}

function getLanguages(repos) {
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  
  // Add additional technologies from config
  if (config.profile?.additionalTechnologies) {
    config.profile.additionalTechnologies.forEach(tech => {
      if (!languages[tech]) {
        languages[tech] = 1; // Add with count 1 to show it's used
      }
    });
  }
  
  return Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([name, count]) => ({ name, count }));
}

function getFeaturedRepos(repos) {
  return repos
    .filter(repo => !repo.fork && repo.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
    }));
}

function calculateYearsOfExperience(createdAt) {
  // Calculate GitHub account age in years
  const created = new Date(createdAt);
  const now = new Date();
  const githubYears = Math.floor((now - created) / (365.25 * 24 * 60 * 60 * 1000));
  
  // Add 1 year to GitHub experience
  const totalYears = githubYears + 1;
  
  // If there's a manual override, use it, but still add the 1 year bonus
  if (config.stats?.overrideYearsOfExperience && config.profile?.yearsOfExperience) {
    return config.profile.yearsOfExperience + 1;
  }
  
  return Math.max(totalYears, 1); // At least 1 year
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getLanguagesFromConfig() {
  const languages = {};
  
  // Add languages from config
  if (config.profile?.additionalTechnologies) {
    config.profile.additionalTechnologies.forEach(tech => {
      languages[tech] = 1;
    });
  }
  
  // Add some common languages
  const commonLanguages = ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js'];
  commonLanguages.forEach(lang => {
    if (!languages[lang]) {
      languages[lang] = 2;
    }
  });
  
  return Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 15)
    .map(([name, count]) => ({ name, count }));
}

function getFallbackRepos() {
  return [
    {
      id: 1,
      name: 'my-portfolio',
      description: 'Personal portfolio website built with Next.js and TailwindCSS',
      language: 'JavaScript',
      stars: 5,
      forks: 2,
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'data-analysis-project',
      description: 'Data analysis project using Python and machine learning',
      language: 'Python',
      stars: 3,
      forks: 1,
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'full-stack-app',
      description: 'Full stack application with React and Node.js',
      language: 'TypeScript',
      stars: 8,
      forks: 3,
      html_url: `https://github.com/${GITHUB_USERNAME}`,
      updated_at: new Date().toISOString(),
    },
  ];
}
