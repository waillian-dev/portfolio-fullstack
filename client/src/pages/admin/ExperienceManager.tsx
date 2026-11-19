import React, { useEffect, useState } from 'react';
import {
  fetchExperiences,
  createExperienceApi,
  updateExperienceApi,
  deleteExperienceApi,
} from '../../services/api';
import { IExperience } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Plus, Edit2, Trash2, Briefcase, Calendar, MapPin, ListChecks, Code2 } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export const ExperienceManager: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Partial<IExperience> | null>(null);

  // Local helper states for multiline responsibilities log & tech string
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');

  const loadExperiences = async () => {
    try {
      const data = await fetchExperiences();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const openCreateModal = () => {
    setEditingExp({
      jobTitle: '',
      company: '',
      location: 'San Francisco, CA',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      isCurrent: true,
      employmentType: 'Full-Time',
      description: '',
      responsibilities: [],
      technologies: [],
    });
    setResponsibilitiesText('');
    setTechnologiesText('');
    setIsModalOpen(true);
  };

  const openEditModal = (exp: IExperience) => {
    setEditingExp(exp);
    setResponsibilitiesText(exp.responsibilities?.join('\n') || '');
    setTechnologiesText(exp.technologies?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    // Parse responsibilities line by line
    const parsedResponsibilities = responsibilitiesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Parse technologies by comma
    const parsedTechnologies = technologiesText
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    const payload: Partial<IExperience> = {
      ...editingExp,
      responsibilities: parsedResponsibilities,
      technologies: parsedTechnologies,
    };

    try {
      if (editingExp._id) {
        await updateExperienceApi(editingExp._id, payload);
      } else {
        await createExperienceApi(payload);
      }
      setIsModalOpen(false);
      setEditingExp(null);
      loadExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await deleteExperienceApi(id);
      loadExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Experience Timeline Manager</h2>
          <p className="text-xs text-muted-foreground">Manage career history, key achievements & experience logs</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="w-4 h-4" /> Add Experience Log
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp._id} className="p-6 space-y-4 hover:border-primary/50 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/50 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="font-bold text-base text-foreground">{exp.jobTitle}</span>
                  <span className="text-xs font-semibold text-primary">@ {exp.company}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(exp.startDate)} — {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={exp.isCurrent ? 'success' : 'secondary'}>
                  {exp.employmentType || 'Full-Time'}
                </Badge>
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted"
                  title="Edit Experience"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-muted"
                  title="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {exp.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
            )}

            {/* Experience Logs / Responsibilities */}
            {exp.responsibilities && exp.responsibilities.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-foreground flex items-center gap-1">
                  <ListChecks className="w-3.5 h-3.5 text-primary" /> Key Responsibilities & Achievements:
                </span>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 pl-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Logs */}
            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-primary" /> Stack:
                </span>
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp?._id ? 'Edit Experience Log' : 'Add Experience Log'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Job Title</label>
              <input
                type="text"
                required
                value={editingExp?.jobTitle || ''}
                onChange={(e) => setEditingExp({ ...editingExp, jobTitle: e.target.value })}
                placeholder="Senior Full-Stack Developer"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Company Name</label>
              <input
                type="text"
                required
                value={editingExp?.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                placeholder="Apex Tech Solutions"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Location</label>
              <input
                type="text"
                value={editingExp?.location || ''}
                onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                placeholder="San Francisco, CA / Remote"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Employment Type</label>
              <select
                value={editingExp?.employmentType || 'Full-Time'}
                onChange={(e) => setEditingExp({ ...editingExp, employmentType: e.target.value })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Start Date</label>
              <input
                type="date"
                required
                value={editingExp?.startDate ? new Date(editingExp.startDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">End Date</label>
              <input
                type="date"
                disabled={editingExp?.isCurrent}
                value={editingExp?.endDate ? new Date(editingExp.endDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCurrent"
              checked={editingExp?.isCurrent || false}
              onChange={(e) => setEditingExp({ ...editingExp, isCurrent: e.target.checked })}
              className="rounded border-border"
            />
            <label htmlFor="isCurrent" className="text-xs font-semibold">
              Currently working in this role
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Summary / Description</label>
            <textarea
              rows={2}
              value={editingExp?.description || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              placeholder="Leading full-stack engineering team for cloud SaaS applications..."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Responsibilities & Achievement Logs (One per line)</label>
            <textarea
              rows={4}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder="Architected Node.js microservices handling 1M+ daily API requests.&#10;Designed React TypeScript dashboards.&#10;Reduced database latency by 40%."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Technologies Used (Comma separated)</label>
            <input
              type="text"
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              placeholder="React, Node.js, TypeScript, MongoDB, Docker, AWS"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <Button type="submit" className="w-full mt-4 justify-center">
            Save Experience Log
          </Button>
        </form>
      </Modal>
    </div>
  );
};
