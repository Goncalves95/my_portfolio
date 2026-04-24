import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Goncalves95';

export async function GET() {
  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user data');
    }

    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }

    const repos = await reposResponse.json();

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

    return NextResponse.json(stats);
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
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

    // Fallback: estimate based on repo count and average activity
    if (totalCommits === 0) {
      totalCommits = repos.length * 50; // Rough estimate
    }
  } catch (error) {
    // Final fallback
    totalCommits = repos.length * 50;
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
  
  return Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
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
  const created = new Date(createdAt);
  const now = new Date();
  const years = Math.floor((now - created) / (365.25 * 24 * 60 * 60 * 1000));
  return Math.max(years, 1); // At least 1 year
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
