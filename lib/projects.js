// Client-side functions for project management using API routes

export async function getProjects() {
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      console.error('Error fetching projects:', response.statusText);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function addProject(project) {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      console.error('Error adding project:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
}

export async function updateProject(id, updatedProject) {
  try {
    const response = await fetch('/api/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedProject }),
    });
    
    if (!response.ok) {
      console.error('Error updating project:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

export async function deleteProject(id) {
  try {
    const response = await fetch(`/api/projects?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      console.error('Error deleting project:', response.statusText);
      return false;
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}
