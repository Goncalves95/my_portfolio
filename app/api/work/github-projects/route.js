import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCachedData, setCachedData } from '@/lib/github-cache';

export async function GET() {
  try {
    // Get GitHub projects visibility settings
    const configPath = path.join(process.cwd(), 'data', 'github-projects-config.json');
    let config = {};
    
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      // If file doesn't exist, create default config
      config = {
        projects: {},
        defaultVisible: true
      };
    }

    // Get actual GitHub projects
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/github/projects`);
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }
    
    const githubProjects = await response.json();
    
    // Combine with visibility settings
    const projectsWithSettings = githubProjects.map(project => ({
      ...project,
      visible: config.projects[project.id]?.visible !== false,
      order: config.projects[project.id]?.order || 999
    }));

    return NextResponse.json(projectsWithSettings);
  } catch (error) {
    console.error('GitHub Projects Settings Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { projectId, visible, order } = await request.json();
    
    const configPath = path.join(process.cwd(), 'data', 'github-projects-config.json');
    let config = {};
    
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      config = {
        projects: {},
        defaultVisible: true
      };
    }
    
    // Update project settings
    if (!config.projects[projectId]) {
      config.projects[projectId] = {};
    }
    
    if (visible !== undefined) {
      config.projects[projectId].visible = visible;
    }
    
    if (order !== undefined) {
      config.projects[projectId].order = order;
    }
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    // Clear cache
    setCachedData('work_projects', null);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating GitHub project settings:', error);
    return NextResponse.json(
      { error: 'Failed to update GitHub project settings' },
      { status: 500 }
    );
  }
}
