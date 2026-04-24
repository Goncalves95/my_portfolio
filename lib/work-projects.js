// Client-side functions for work projects management using API routes

export async function getWorkProjects() {
  try {
    const response = await fetch('/api/work/projects');
    if (!response.ok) {
      console.error('Error fetching work projects:', response.statusText);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching work projects:', error);
    return [];
  }
}

export async function addWorkProject(project) {
  try {
    const response = await fetch('/api/work/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      console.error('Error adding work project:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding work project:', error);
    return null;
  }
}

export async function updateWorkProject(id, updatedProject) {
  try {
    const response = await fetch('/api/work/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedProject }),
    });
    
    if (!response.ok) {
      console.error('Error updating work project:', response.statusText);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating work project:', error);
    return null;
  }
}

export async function deleteWorkProject(id) {
  try {
    const response = await fetch(`/api/work/projects?id=${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      console.error('Error deleting work project:', response.statusText);
      return false;
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting work project:', error);
    return false;
  }
}

export async function getGitHubProjects() {
  try {
    const response = await fetch('/api/github/projects');
    if (!response.ok) {
      console.error('Error fetching GitHub projects:', response.statusText);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

export async function getGitHubProjectsWithSettings() {
  try {
    const response = await fetch('/api/work/github-projects');
    if (!response.ok) {
      console.error('Error fetching GitHub projects settings:', response.statusText);
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub projects settings:', error);
    return [];
  }
}

export async function updateGitHubProjectSettings(projectId, visible, order) {
  try {
    const response = await fetch('/api/work/github-projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId, visible, order }),
    });
    
    if (!response.ok) {
      console.error('Error updating GitHub project settings:', response.statusText);
      return false;
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error updating GitHub project settings:', error);
    return false;
  }
}
