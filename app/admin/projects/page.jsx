"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getWorkProjects, addWorkProject, updateWorkProject, deleteWorkProject, getGitHubProjectsWithSettings, updateGitHubProjectSettings, updateProjectsOrder } from "@/lib/work-projects";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiGithub, FiExternalLink } from "react-icons/fi";
import { 
  Switch
} from "@/components/ui/switch";
import Link from "next/link";
import { useSimpleDragAndDrop } from "@/hooks/useSimpleDragAndDrop";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [githubProjectSettings, setGithubProjectSettings] = useState([]);
  const [allGithubRepos, setAllGithubRepos] = useState([]);
  const [dialogMode, setDialogMode] = useState('manual'); // 'manual' | 'github'
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    stack: "",
    image: "",
    live: "",
    github: "",
    featured: false
  });

  // Simple password protection (you should change this password)
  const ADMIN_PASSWORD = "fernando123";

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadGithubProjectSettings();
      loadAllGithubRepos();
    }
  }, [isAuthenticated]);

  const loadProjects = async () => {
    const projectsData = await getWorkProjects();
    setProjects(projectsData);
  };

  const loadGithubProjectSettings = async () => {
    try {
      const settings = await getGitHubProjectsWithSettings();
      setGithubProjectSettings(settings);
    } catch (error) {
      console.error('Error loading GitHub project settings:', error);
    }
  };

  const loadAllGithubRepos = async () => {
    try {
      const response = await fetch('/api/github/projects');
      if (response.ok) {
        const repos = await response.json();
        setAllGithubRepos(repos);
      }
    } catch (error) {
      console.error('Error loading all GitHub repos:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Password incorreta!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      stack: formData.stack.split(",").map(s => s.trim()).filter(s => s),
      featured: formData.featured
    };

    if (editingProject) {
      updateWorkProject(editingProject.id, projectData);
    } else {
      addWorkProject(projectData);
    }

    loadProjects();
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      stack: Array.isArray(project.stack) ? project.stack.join(", ") : project.stack,
      image: project.image,
      live: project.live,
      github: project.github,
      featured: project.featured.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja apagar este projeto?")) {
      deleteWorkProject(id);
      loadProjects();
    }
  };

  const handleToggleVisibility = async (projectId, visible) => {
    try {
      const success = await updateGitHubProjectSettings(projectId, visible);
      if (success) {
        await loadGithubProjectSettings();
        await loadProjects();
      }
    } catch (error) {
      console.error('Error toggling project visibility:', error);
    }
  };

  const handleToggleRepoVisibility = async (repoId, visible) => {
    try {
      const success = await updateGitHubProjectSettings(repoId, visible);
      if (success) {
        await loadGithubProjectSettings();
        await loadProjects();
      }
    } catch (error) {
      console.error('Error toggling repo visibility:', error);
    }
  };

  const openDialog = (mode = 'manual') => {
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const moveProject = async (projectId, direction) => {
    const sortedProjects = [...githubProjectSettings].sort((a, b) => a.order - b.order);
    const currentIndex = sortedProjects.findIndex(p => p.id === projectId);
    
    if (direction === 'up' && currentIndex > 0) {
      const currentProject = sortedProjects[currentIndex];
      const prevProject = sortedProjects[currentIndex - 1];
      
      await updateGitHubProjectSettings(projectId, undefined, prevProject.order);
      await updateGitHubProjectSettings(prevProject.id, undefined, currentProject.order);
    } else if (direction === 'down' && currentIndex < sortedProjects.length - 1) {
      const currentProject = sortedProjects[currentIndex];
      const nextProject = sortedProjects[currentIndex + 1];
      
      await updateGitHubProjectSettings(projectId, undefined, nextProject.order);
      await updateGitHubProjectSettings(nextProject.id, undefined, currentProject.order);
    }
    
    loadGithubProjectSettings();
    loadProjects();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      stack: "",
      image: "",
      live: "",
      github: "",
      featured: false
    });
    setEditingProject(null);
  };

  const handleReorder = async (newOrder) => {
    try {
      const success = await updateProjectsOrder(newOrder);
      if (success) {
        // Force a complete reload to ensure state is updated
        await loadProjects();
        await loadGithubProjectSettings();
      }
    } catch (error) {
      console.error('Error updating project order:', error);
    }
  };

  // Use drag and drop hook for all projects
  const { getDragProps, isDragging } = useSimpleDragAndDrop(projects, handleReorder);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#27272c] p-8 rounded-xl max-w-md w-full mx-4"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1c1c22] border-white/10"
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gestão de Projetos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-primary hover:bg-accent/90">
                <FiPlus className="mr-2" />
                Adicionar Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#27272c] border border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingProject ? 'Editar Projeto' : 'Adicionar Projeto'}
                </DialogTitle>
              </DialogHeader>
              
              {!editingProject && (
                <div className="flex gap-2 mb-6">
                  <Button
                    variant={dialogMode === 'manual' ? 'default' : 'outline'}
                    onClick={() => setDialogMode('manual')}
                    className={dialogMode === 'manual' ? 'bg-accent text-primary' : 'border-white/20'}
                  >
                    Criar Manualmente
                  </Button>
                  <Button
                    variant={dialogMode === 'github' ? 'default' : 'outline'}
                    onClick={() => setDialogMode('github')}
                    className={dialogMode === 'github' ? 'bg-accent text-primary' : 'border-white/20'}
                  >
                    Importar do GitHub
                  </Button>
                </div>
              )}
              
              {/* Manual Project Form */}
              {dialogMode === 'manual' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Título"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-[#1c1c22] border-white/10"
                    required
                  />
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-[#1c1c22] border-white/10">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="Full Stack">Full Stack</SelectItem>
                      <SelectItem value="Data">Data</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Textarea
                  placeholder="Descrição"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-[#1c1c22] border-white/10"
                  rows={3}
                  required
                />
                
                <Input
                  placeholder="Tecnologias (separadas por vírgula)"
                  value={formData.stack}
                  onChange={(e) => setFormData({...formData, stack: e.target.value})}
                  className="bg-[#1c1c22] border-white/10"
                  required
                />
                
                <Input
                  placeholder="Caminho da imagem (ex: /assets/work/project.png)"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="bg-[#1c1c22] border-white/10"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="URL Live"
                    value={formData.live}
                    onChange={(e) => setFormData({...formData, live: e.target.value})}
                    className="bg-[#1c1c22] border-white/10"
                  />
                  <Input
                    placeholder="URL GitHub"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="bg-[#1c1c22] border-white/10"
                  />
                </div>
                
                <Select value={formData.featured} onValueChange={(value) => setFormData({...formData, featured: value})}>
                  <SelectTrigger className="bg-[#1c1c22] border-white/10">
                    <SelectValue placeholder="Destaque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Sim</SelectItem>
                    <SelectItem value="false">Não</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingProject ? "Atualizar" : "Criar"} Projeto
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
              )}
              
              {/* GitHub Repos List */}
              {dialogMode === 'github' && (
                <div className="space-y-4">
                  <div className="text-white/60 text-sm">
                    Selecione os repositórios GitHub que deseja incluir nos seus projetos
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {allGithubRepos.map((repo) => {
                      const isVisible = githubProjectSettings.find(p => p.id === repo.id)?.visible !== false;
                      return (
                        <div key={repo.id} className="flex items-center justify-between p-3 bg-[#1c1c22] rounded-lg border border-white/10">
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{repo.title}</h4>
                            <p className="text-white/60 text-sm">{repo.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                {repo.language || 'Unknown'}
                              </span>
                              <span className="text-xs text-white/40">
                                ⭐ {repo.stars || 0}
                              </span>
                            </div>
                          </div>
                          <Switch
                            checked={isVisible}
                            onCheckedChange={(checked) => handleToggleRepoVisibility(repo.id, checked)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="border-white/20"
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#27272c] p-6 rounded-xl border border-white/10 cursor-move"
                {...getDragProps(index)}
              >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/40 text-sm">⋮⋮</span>
                    <span className="text-accent font-bold">{project.num}</span>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-accent text-primary px-2 py-1 rounded text-sm">Destaque</span>
                    )}
                    {project.source === 'github' && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">GitHub</span>
                    )}
                    {project.source === 'github' && !project.visible && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">Oculto</span>
                    )}
                  </div>
                  <p className="text-white/60 mb-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-white/40">
                    <span>Categoria: {project.category}</span>
                    <span>•</span>
                    <span>Techs: {Array.isArray(project.stack) ? project.stack.join(", ") : project.stack}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {project.live && (
                      <Link href={project.live} target="_blank" className="text-accent hover:text-accent-hover">
                        <FiEye className="inline mr-1" /> Live
                      </Link>
                    )}
                    {project.github && (
                      <Link href={project.github} target="_blank" className="text-accent hover:text-accent-hover">
                        <FiGithub className="inline mr-1" /> GitHub
                      </Link>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {project.source === 'github' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">Arraste ⋮⋮ para reordenar</span>
                      </div>
                      
                      <Switch
                        checked={project.visible !== false}
                        onCheckedChange={(checked) => handleToggleVisibility(project.id, checked)}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">Arraste ⋮⋮ para reordenar</span>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                        className="border-white/20"
                      >
                        <FiEdit2 />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(project.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <FiTrash2 />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            className="border-white/20"
          >
            Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsAdmin;
