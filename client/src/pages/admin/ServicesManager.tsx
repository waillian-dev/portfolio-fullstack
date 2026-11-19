import React, { useEffect, useState } from 'react';
import {
  fetchServices,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
} from '../../services/api';
import { IService } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Plus, Edit2, Trash2, Layers, CheckCircle2, DollarSign, ArrowUpRight } from 'lucide-react';

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<IService> | null>(null);

  // Multiline helper state for service features list
  const [featuresText, setFeaturesText] = useState('');

  const loadServices = async () => {
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreateModal = () => {
    setEditingService({
      title: '',
      shortDescription: '',
      features: [],
      priceRange: 'Custom Quote',
      ctaText: 'Get in Touch',
      displayOrder: 0,
    });
    setFeaturesText('');
    setIsModalOpen(true);
  };

  const openEditModal = (srv: IService) => {
    setEditingService(srv);
    setFeaturesText(srv.features?.join('\n') || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    // Parse features line by line
    const parsedFeatures = featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const payload: Partial<IService> = {
      ...editingService,
      features: parsedFeatures,
    };

    try {
      if (editingService._id) {
        await updateServiceApi(editingService._id, payload);
      } else {
        await createServiceApi(payload);
      }
      setIsModalOpen(false);
      setEditingService(null);
      loadServices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service item?')) return;
    try {
      await deleteServiceApi(id);
      loadServices();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services Manager</h2>
          <p className="text-xs text-muted-foreground">Manage client service offerings, features & pricing packages</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <Card key={srv._id} className="p-6 flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{srv.title}</h3>
                    {srv.priceRange && (
                      <span className="text-[11px] font-semibold text-emerald-500 flex items-center gap-0.5">
                        <DollarSign className="w-3 h-3" /> {srv.priceRange}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(srv)}
                    className="p-1.5 text-muted-foreground hover:text-primary rounded hover:bg-muted"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(srv._id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-muted"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{srv.shortDescription}</p>

              {/* Service Features list */}
              {srv.features && srv.features.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">Features Included:</span>
                  <div className="space-y-1">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <span>CTA: <strong className="text-foreground">{srv.ctaText || 'Get in Touch'}</strong></span>
              <span className="flex items-center gap-0.5 text-primary font-semibold">
                Preview <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService?._id ? 'Edit Service Offering' : 'Add Service Offering'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold">Service Title</label>
            <input
              type="text"
              required
              value={editingService?.title || ''}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              placeholder="Full-Stack Web Development"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Short Description</label>
            <textarea
              rows={3}
              required
              value={editingService?.shortDescription || ''}
              onChange={(e) =>
                setEditingService({ ...editingService, shortDescription: e.target.value })
              }
              placeholder="Building complete modern web applications from frontend UI to backend microservices..."
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">Features & Deliverables List (One per line)</label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="React & Next.js Frontends&#10;Node.js & Express REST APIs&#10;MongoDB / PostgreSQL Database Architecture&#10;Clean Modular Component Design"
              className="w-full px-3 py-2 rounded border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Price / Range (Optional)</label>
              <input
                type="text"
                value={editingService?.priceRange || ''}
                onChange={(e) => setEditingService({ ...editingService, priceRange: e.target.value })}
                placeholder="Custom Quote / $1,500+"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">CTA Button Text</label>
              <input
                type="text"
                value={editingService?.ctaText || ''}
                onChange={(e) => setEditingService({ ...editingService, ctaText: e.target.value })}
                placeholder="Get in Touch / Start a Project"
                className="w-full px-3 py-2 rounded border border-border bg-background text-sm"
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4 justify-center">
            Save Service Package
          </Button>
        </form>
      </Modal>
    </div>
  );
};
