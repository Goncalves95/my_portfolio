import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCachedData, setCachedData, CACHE_KEYS } from '@/lib/github-cache';

export async function GET() {
  // Check cache first
  const cachedProjects = getCachedData('github_projects');
  if (cachedProjects) {
    return NextResponse.json(cachedProjects);
  }

  try {
    // Get configuration
    const configPath = path.join(process.cwd(), 'data', 'config.json');
    let config = {};
    
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      console.error('Error loading config:', error);
      config = { github: { username: 'Goncalves95' } };
    }

    const GITHUB_USERNAME = config.github?.username || 'Goncalves95';
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App',
    };

    // Add authentication if token is available
    const token = process.env.GITHUB_PAT || config.github?.personalAccessToken;
    if (token && token !== 'SEU_TOKEN_AQUI' && token !== '') {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Transform GitHub repos to project format
    const githubProjects = repos
      .filter(repo => !repo.fork && !repo.private && repo.description)
      .map((repo, index) => ({
        id: `github-${repo.id}`,
        num: String(index + 1).padStart(2, '0'),
        category: repo.language?.toLowerCase() || 'full stack',
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: repo.description,
        stack: repo.language ? [repo.language] : ['JavaScript'],
        image: `/assets/work/github-default.png`,
        live: repo.homepage || `https://${repo.name.toLowerCase()}.vercel.app`,
        github: repo.html_url,
        featured: repo.stargazers_count > 0,
        dateAdded: new Date(repo.created_at).toISOString().split('T')[0],
        source: 'github',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updated_at: repo.updated_at,
      }));

    // Cache the results
    setCachedData('github_projects', githubProjects);
    
    return NextResponse.json(githubProjects);
  } catch (error) {
    console.error('GitHub Projects API Error:', error.message);
    
    // Return fallback projects
    const fallbackProjects = [
      {
        id: 'github-fallback-1',
        num: '01',
        category: 'frontend',
        title: 'My Portfolio',
        description: 'Personal portfolio website built with Next.js and TailwindCSS',
        stack: ['Next.js', 'TailwindCSS', 'React'],
        image: '/assets/work/my-portfolio.png',
        live: 'https://my-portfolio.vercel.app',
        github: 'https://github.com/Goncalves95/my-portfolio',
        featured: true,
        dateAdded: '2024-01-15',
        source: 'github',
        stars: 5,
        forks: 2,
        language: 'JavaScript',
        updated_at: new Date().toISOString(),
      }
    ];

    setCachedData('github_projects', fallbackProjects);
    return NextResponse.json(fallbackProjects);
  }
}
