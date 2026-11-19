import React, { useEffect, useState } from 'react';
import {
  fetchProjects,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from '../../services/api';
import { IProject, ProjectCategory } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { Plus, Edit2, Trash2, FolderKanban, Star, ExternalLink, Github, Eye, Calendar, Code2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

const categories: ProjectCategory[] = ['Web', 'Mobile', 'Backend', 'Dashboard', 'UI/UX', 'Other'];

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<IProject> | null>(null);

  // Local helper states for multiline arrays and tech strings
  const [keyFeaturesText, setKeyFeaturesText] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject({
      title: '',
      shortDescription: '',
      fullDescription: '',
      category: 'Web',
      thumbnailUrl: '',
      githubUrl: '',
      liveUrl: '',
      problemStatement: '',
      solutionStatement: '',
      featured: false,
      completionDate: new Date().toISOString().split('T')[0],
      keyFeatures: [],
      technologies: [],
    });
    setKeyFeaturesText('');
    setTechnologiesText('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: IProject) => {
    setEditingProject(proj);
    setKeyFeaturesText(proj.keyFeatures?.join('\n') || '');
    setTechnologiesText(proj.technologies?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const parsedFeatures = keyFeaturesText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsedTechs = technologiesText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload: Partial<IProject> = {
      ...editingProject,
      keyFeatures: parsedFeatures,
      technologies: parsedTechs,
    };

    try {
      if (editingProject._id) {
        await updateProjectApi(editingProject._id, payload);
      } else {
        await createProjectApi(payload);
      }
      setIsModalOpen(false);
      setEditingProject(null);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProjectApi(id);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects CMS Manager</h2>
          <p className="text-xs text-muted-foreground">Manage portfolio projects, case studies, technologies & links</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <Card key={proj._id} className="p-5 flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {proj.thumbnailUrl ? (
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-14 h-14 rounded-lg object-cover border border-border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <FolderKanban className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-foreground">{proj.title}</h3>
                      {proj.featured && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <Badge variant="default">{proj.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {proj.viewsCount} views
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-muted"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{proj.shortDescription}</p>

              {proj.technologies && proj.technologies.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-primary" /> Tech:
                  </span>
                  {proj.technologies.map((tech, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              {proj.completionDate ? (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {formatDate(proj.completionDate)}
                </span>
              ) : (
                <span />
              )}

              <div className="flex items-center gap-3">
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-foreground hover:text-primary">
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary font-semibold">
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject?._id ? 'Edit Project Details' : 'New Portfolio Project'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Project Title</label>
            <input
              type="text"
              required
              value={editingProject?.title || ''}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              placeholder="PulseAnalytics — SaaS Cloud Dashboard"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Short Subtitle / Description</label>
            <input
              type="text"
              required
              value={editingProject?.shortDescription || ''}
              onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
              placeholder="Real-time telemetry platform built with MERN stack & Recharts..."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Full Overview & Case Study</label>
            <textarea
              rows={4}
              required
              value={editingProject?.fullDescription || ''}
              onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
              placeholder="Detailed description of the application architecture, background context, and features..."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Category</label>
              <select
                value={editingProject?.category || 'Web'}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Completion Date</label>
              <input
                type="date"
                value={editingProject?.completionDate ? new Date(editingProject.completionDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditingProject({ ...editingProject, completionDate: e.target.value })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <ImageUpload
              label="Thumbnail Photo (Cloudflare R2)"
              value={editingProject?.thumbnailUrl || ''}
              onChange={(url) => setEditingProject({ ...editingProject, thumbnailUrl: url })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">GitHub Repo URL</label>
              <input
                type="text"
                value={editingProject?.githubUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                placeholder="https://github.com/example/repo"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Live Demo URL</label>
              <input
                type="text"
                value={editingProject?.liveUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Problem Statement</label>
              <textarea
                rows={2}
                value={editingProject?.problemStatement || ''}
                onChange={(e) => setEditingProject({ ...editingProject, problemStatement: e.target.value })}
                placeholder="What challenge did this project solve?"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Solution Statement</label>
              <textarea
                rows={2}
                value={editingProject?.solutionStatement || ''}
                onChange={(e) => setEditingProject({ ...editingProject, solutionStatement: e.target.value })}
                placeholder="How was the problem engineered and resolved?"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Key Features List (One per line)</label>
            <textarea
              rows={3}
              value={keyFeaturesText}
              onChange={(e) => setKeyFeaturesText(e.target.value)}
              placeholder="Live WebSocket telemetry metrics&#10;Multi-tenant team permissions&#10;Exportable PDF reports"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Technologies Used (Comma separated)</label>
            <input
              type="text"
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              placeholder="React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={editingProject?.featured || false}
              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
              className="rounded border-border"
            />
            <label htmlFor="featured" className="text-xs font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Mark as Featured Project
            </label>
          </div>

          <Button type="submit" className="w-full mt-4 justify-center">
            Save Project Entry
          </Button>
        </form>
      </Modal>
    </div>
  );
};
