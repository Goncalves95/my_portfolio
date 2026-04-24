import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCachedData, setCachedData } from '@/lib/github-cache';

export async function GET() {
  // Check cache first
  const cachedProjects = getCachedData('work_projects');
  if (cachedProjects) {
    return NextResponse.json(cachedProjects);
  }

  try {
    // Get manual projects
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
    let manualProjects = [];
    
    try {
      const projectsData = fs.readFileSync(projectsPath, 'utf8');
      manualProjects = JSON.parse(projectsData);
    } catch (error) {
      console.error('Error loading manual projects:', error);
    }

    // Get GitHub projects
    let githubProjects = [];
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/github/projects`);
      if (response.ok) {
        githubProjects = await response.json();
      }
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
    }

    // Combine projects, giving priority to manual projects
    const allProjects = [
      ...manualProjects.map(p => ({ ...p, source: 'manual', visible: p.visible !== false })),
      ...githubProjects.map(p => ({ ...p, source: 'github', visible: p.visible !== false }))
    ];

    // Sort by order field first, then by dateAdded and featured status
    const sortedProjects = allProjects.sort((a, b) => {
      // If both have order, sort by order
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      
      // Featured projects come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by date
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });

    // Filter only visible projects
    const visibleProjects = sortedProjects.filter(project => project.visible !== false);
    
    // Re-number projects
    const numberedProjects = visibleProjects.map((project, index) => ({
      ...project,
      num: String(index + 1).padStart(2, '0'),
    }));

    // Cache the results
    setCachedData('work_projects', numberedProjects);
    
    return NextResponse.json(numberedProjects);
  } catch (error) {
    console.error('Work Projects API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const newProject = await request.json();
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
    
    let projects = [];
    try {
      const projectsData = fs.readFileSync(projectsPath, 'utf8');
      projects = JSON.parse(projectsData);
    } catch (error) {
      // If file doesn't exist, start with empty array
    }
    
    const projectToAdd = {
      ...newProject,
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      num: String(projects.length + 1).padStart(2, '0'),
      dateAdded: new Date().toISOString().split('T')[0],
      featured: newProject.featured || false,
      source: 'manual'
    };
    
    projects.push(projectToAdd);
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    // Clear cache
    setCachedData('work_projects', null);
    
    return NextResponse.json(projectToAdd);
  } catch (error) {
    console.error('Error adding work project:', error);
    return NextResponse.json(
      { error: 'Failed to add work project' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updatedProject } = await request.json();
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
    
    const projectsData = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(projectsData);
    
    const index = projects.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects[index] = { ...projects[index], ...updatedProject, source: 'manual' };
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    // Clear cache
    setCachedData('work_projects', null);
    
    return NextResponse.json(projects[index]);
  } catch (error) {
    console.error('Error updating work project:', error);
    return NextResponse.json(
      { error: 'Failed to update work project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
    const projectsData = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(projectsData);
    
    const filteredProjects = projects.filter(p => p.id !== parseInt(id));
    
    if (filteredProjects.length !== projects.length) {
      // Renumber the projects
      const renumberedProjects = filteredProjects.map((project, index) => ({
        ...project,
        num: String(index + 1).padStart(2, '0')
      }));
      
      fs.writeFileSync(projectsPath, JSON.stringify(renumberedProjects, null, 2));
      
      // Clear cache
      setCachedData('work_projects', null);
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting work project:', error);
    return NextResponse.json(
      { error: 'Failed to delete work project' },
      { status: 500 }
    );
  }
}
