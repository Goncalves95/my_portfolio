import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request) {
  try {
    const { projectOrders } = await request.json();
    
    const configPath = path.join(process.cwd(), 'data', 'projects-order.json');
    let config = {};
    
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      config = {
        projects: {},
        lastUpdated: new Date().toISOString()
      };
    }
    
    // Update project orders
    projectOrders.forEach((project, index) => {
      if (!config.projects[project.id]) {
        config.projects[project.id] = {};
      }
      config.projects[project.id].order = index + 1;
      config.projects[project.id].lastUpdated = new Date().toISOString();
    });
    
    config.lastUpdated = new Date().toISOString();
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating project order:', error);
    return NextResponse.json(
      { error: 'Failed to update project order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const configPath = path.join(process.cwd(), 'data', 'projects-order.json');
    let config = {};
    
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      config = {
        projects: {},
        lastUpdated: new Date().toISOString()
      };
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching project order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project order' },
      { status: 500 }
    );
  }
}
