import React, { useEffect, useState } from 'react';
import { fetchSkills, createSkillApi, updateSkillApi, deleteSkillApi } from '../../services/api';
import { ISkill, SkillCategory } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Plus, Edit2, Trash2, Code } from 'lucide-react';

const categories: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Database',
  'Mobile',
  'DevOps & Tools',
];

export const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<ISkill> | null>(null);

  const loadSkills = async () => {
    try {
      const data = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    try {
      if (editingSkill._id) {
        await updateSkillApi(editingSkill._id, editingSkill);
      } else {
        await createSkillApi(editingSkill);
      }
      setIsModalOpen(false);
      setEditingSkill(null);
      loadSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteSkillApi(id);
      loadSkills();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills Manager</h2>
          <p className="text-xs text-muted-foreground">Add, edit, or reorder technical skills</p>
        </div>
        <Button
          onClick={() => {
            setEditingSkill({ category: 'Frontend', percentage: 80, years: 1, displayOrder: 0 });
            setIsModalOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <Card key={skill._id} className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                <span className="font-bold text-sm">{skill.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {skill.category} • {skill.percentage}% • {skill.years} Yrs
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setEditingSkill(skill);
                  setIsModalOpen(true);
                }}
                className="p-1.5 text-muted-foreground hover:text-primary rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="p-1.5 text-muted-foreground hover:text-destructive rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill?._id ? 'Edit Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Skill Name</label>
            <input
              type="text"
              required
              value={editingSkill?.name || ''}
              onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Category</label>
            <select
              value={editingSkill?.category || 'Frontend'}
              onChange={(e) =>
                setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })
              }
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Proficiency (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={editingSkill?.percentage || 80}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, percentage: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Years of Experience</label>
              <input
                type="number"
                min="0"
                value={editingSkill?.years || 1}
                onChange={(e) => setEditingSkill({ ...editingSkill, years: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4 justify-center">
            Save Skill
          </Button>
        </form>
      </Modal>
    </div>
  );
};
