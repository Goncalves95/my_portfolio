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
import { 
  Switch
} from "@/components/ui/switch";
import { getWorkProjects, addWorkProject, updateWorkProject, deleteWorkProject, getGitHubProjects, getGitHubProjectsWithSettings, updateGitHubProjectSettings } from "@/lib/work-projects";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiGithub, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

const WorkAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [githubProjects, setGithubProjects] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedGithubProject, setSelectedGithubProject] = useState(null);
  const [githubProjectSettings, setGithubProjectSettings] = useState([]);
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
      loadGithubProjects();
      loadGithubProjectSettings();
    }
  }, [isAuthenticated]);

  const loadProjects = async () => {
    const projectsData = await getWorkProjects();
    setProjects(projectsData);
  };

  const loadGithubProjects = async () => {
    const githubData = await getGitHubProjects();
    setGithubProjects(githubData);
  };

  const loadGithubProjectSettings = async () => {
    const settingsData = await getGitHubProjectsWithSettings();
    setGithubProjectSettings(settingsData);
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

  const handleImportGithubProject = () => {
    if (!selectedGithubProject) return;

    const projectData = {
      title: selectedGithubProject.title,
      category: selectedGithubProject.category,
      description: selectedGithubProject.description,
      stack: selectedGithubProject.stack.join(", "),
      image: selectedGithubProject.image,
      live: selectedGithubProject.live,
      github: selectedGithubProject.github,
      featured: selectedGithubProject.featured
    };

    setFormData(projectData);
    setIsImportDialogOpen(false);
    setIsDialogOpen(true);
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
      featured: project.featured
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja apagar este projeto?")) {
      deleteWorkProject(id);
      loadProjects();
    }
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

  const handleToggleVisibility = async (projectId, visible) => {
    const success = await updateGitHubProjectSettings(projectId, visible, undefined);
    if (success) {
      loadGithubProjectSettings();
      loadProjects();
    }
  };

  const handleOrderChange = async (projectId, order) => {
    const success = await updateGitHubProjectSettings(projectId, undefined, order);
    if (success) {
      loadGithubProjectSettings();
      loadProjects();
    }
  };

  const moveProject = async (projectId, direction) => {
    const sortedProjects = [...githubProjectSettings].sort((a, b) => a.order - b.order);
    const currentIndex = sortedProjects.findIndex(p => p.id === projectId);
    
    if (direction === 'up' && currentIndex > 0) {
      const currentProject = sortedProjects[currentIndex];
      const prevProject = sortedProjects[currentIndex - 1];
      
      await handleOrderChange(projectId, prevProject.order);
      await handleOrderChange(prevProject.id, currentProject.order);
    } else if (direction === 'down' && currentIndex < sortedProjects.length - 1) {
      const currentProject = sortedProjects[currentIndex];
      const nextProject = sortedProjects[currentIndex + 1];
      
      await handleOrderChange(projectId, nextProject.order);
      await handleOrderChange(nextProject.id, currentProject.order);
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Gestão de Projetos Work</h1>
          <div className="flex gap-4">
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FiGithub /> Gerir Projetos GitHub
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#27272c] border-white/10 max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">Gerir Projetos do GitHub</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Projetos Disponíveis</h3>
                    {githubProjectSettings.length === 0 ? (
                      <p className="text-white/60">Nenhum projeto GitHub encontrado.</p>
                    ) : (
                      <div className="space-y-2">
                        {githubProjectSettings
                          .sort((a, b) => a.order - b.order)
                          .map((project, index) => (
                            <div key={project.id} className="bg-[#1c1c22] p-4 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-accent font-bold">{index + 1}</span>
                                    <h4 className="text-white font-semibold">{project.title}</h4>
                                    <span className={`px-2 py-1 rounded text-xs ${project.visible ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                      {project.visible ? 'Visível' : 'Oculto'}
                                    </span>
                                  </div>
                                  <p className="text-white/60 text-sm mb-2">{project.description}</p>
                                  <div className="flex items-center gap-4 text-sm text-white/40">
                                    <span>Linguagem: {project.language}</span>
                                    <span>•</span>
                                    <span>Stars: {project.stars || 0}</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => moveProject(project.id, 'up')}
                                      disabled={index === 0}
                                      className="border-white/20"
                                    >
                                      ↑
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => moveProject(project.id, 'down')}
                                      disabled={index === githubProjectSettings.length - 1}
                                      className="border-white/20"
                                    >
                                      ↓
                                    </Button>
                                  </div>
                                  
                                  <Switch
                                    checked={project.visible}
                                    onCheckedChange={(checked) => handleToggleVisibility(project.id, checked)}
                                  />
                                  
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      setSelectedGithubProject(project);
                                      setIsImportDialogOpen(false);
                                      setIsDialogOpen(true);
                                    }}
                                  >
                                    <FiEdit2 />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsImportDialogOpen(false)}
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="flex items-center gap-2">
                  <FiPlus /> Novo Projeto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#27272c] border-white/10 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingProject ? "Editar Projeto" : "Novo Projeto"}
                  </DialogTitle>
                </DialogHeader>
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
                        <SelectItem value="full stack">Full Stack</SelectItem>
                        <SelectItem value="data">Data</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
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
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                    />
                    <label htmlFor="featured" className="text-sm text-white/60">
                      Projeto em destaque
                    </label>
                  </div>
                  
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
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#27272c] p-6 rounded-xl border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-accent font-bold">{project.num}</span>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-accent text-primary px-2 py-1 rounded text-sm">Destaque</span>
                    )}
                    {project.source === 'github' && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">GitHub</span>
                    )}
                  </div>
                  <p className="text-white/60 mb-2">{project.description}</p>
                  <div className="flex items-center gap-4 text-sm text-white/40 mb-3">
                    <span>Categoria: {project.category}</span>
                    <span>•</span>
                    <span>Techs: {Array.isArray(project.stack) ? project.stack.join(", ") : project.stack}</span>
                    {project.source === 'github' && project.stars && (
                      <>
                        <span>•</span>
                        <span>⭐ {project.stars}</span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.live && (
                      <Link href={project.live} target="_blank" className="text-accent hover:text-accent-hover flex items-center gap-1">
                        <FiEye /> Live
                      </Link>
                    )}
                    {project.github && (
                      <Link href={project.github} target="_blank" className="text-accent hover:text-accent-hover flex items-center gap-1">
                        <FiGithub /> GitHub
                      </Link>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {project.source === 'manual' && (
                    <>
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
          ))}
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

export default WorkAdmin;
