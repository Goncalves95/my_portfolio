import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const projectsPath = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  try {
    const jsonData = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(jsonData);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects data:', error);
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newProject = await request.json();
    const jsonData = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(jsonData);
    
    const projectToAdd = {
      ...newProject,
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      num: String(projects.length + 1).padStart(2, '0'),
      dateAdded: new Date().toISOString().split('T')[0],
      featured: newProject.featured || false
    };
    
    projects.push(projectToAdd);
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(projectToAdd);
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updatedProject } = await request.json();
    const jsonData = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(jsonData);
    
    const index = projects.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    projects[index] = { ...projects[index], ...updatedProject };
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(projects[index]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const jsonData = fs.readFileSync(projectsPath, 'utf8');
    const projects = JSON.parse(jsonData);
    
    const filteredProjects = projects.filter(p => p.id !== parseInt(id));
    
    if (filteredProjects.length !== projects.length) {
      // Renumber the projects
      const renumberedProjects = filteredProjects.map((project, index) => ({
        ...project,
        num: String(index + 1).padStart(2, '0')
      }));
      
      fs.writeFileSync(projectsPath, JSON.stringify(renumberedProjects, null, 2));
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
