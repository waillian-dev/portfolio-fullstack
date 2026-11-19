import React, { useEffect, useState } from 'react';
import {
  fetchTestimonials,
  createTestimonialApi,
  updateTestimonialApi,
  deleteTestimonialApi,
} from '../../services/api';
import { ITestimonial } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Plus, Edit2, Trash2, MessageSquare, Star } from 'lucide-react';

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ITestimonial> | null>(null);

  const loadTestimonials = async () => {
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      if (editingItem._id) {
        await updateTestimonialApi(editingItem._id, editingItem);
      } else {
        await createTestimonialApi(editingItem);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      loadTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await deleteTestimonialApi(id);
      loadTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials Manager</h2>
          <p className="text-xs text-muted-foreground">Manage client endorsements & ratings</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem({
              clientName: '',
              jobTitle: '',
              company: '',
              rating: 5,
              content: '',
              isApproved: true,
            });
            setIsModalOpen(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((item) => (
          <Card key={item._id} className="p-4 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="font-bold text-sm">{item.clientName}</span>
                <span className="flex items-center text-xs text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-500 mr-0.5" /> {item.rating}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">"{item.content}"</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setEditingItem(item);
                  setIsModalOpen(true);
                }}
                className="p-1.5 text-muted-foreground hover:text-primary rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
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
        title={editingItem?._id ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Client Name</label>
              <input
                type="text"
                required
                value={editingItem?.clientName || ''}
                onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Company</label>
              <input
                type="text"
                value={editingItem?.company || ''}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Testimonial Content</label>
            <textarea
              rows={4}
              required
              value={editingItem?.content || ''}
              onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
            />
          </div>

          <Button type="submit" className="w-full mt-4 justify-center">
            Save Testimonial
          </Button>
        </form>
      </Modal>
    </div>
  );
};
