import React, { useEffect, useState } from 'react';
import { fetchProfile, updateProfileApi } from '../../services/api';
import { IProfile } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { CheckCircle2, Save, MapPin, Mail, Phone, FileText, Sparkles } from 'lucide-react';
import { ImageUpload } from '../../components/ui/ImageUpload';

export const ProfileManager: React.FC = () => {
  const [profile, setProfile] = useState<Partial<IProfile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile()
      .then((data) => setProfile(data || {}))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const updated = await updateProfileApi(profile);
      setProfile(updated);
      setMessage('Profile & biography updated successfully!');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile & Biography Manager</h2>
        <p className="text-xs text-muted-foreground">
          Manage personal bio, avatar photo, contact details, and public statistics
        </p>
      </div>

      {/* Live Preview Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 via-card to-card border-primary/20 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-extrabold text-primary flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Live Bio Preview
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
            {profile.availabilityStatus || 'Available for Freelance / Full-Time'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src={
              profile.avatarUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'
            }
            alt="Avatar preview"
            className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/30 shadow"
          />
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold text-foreground">{profile.fullName || 'Alex Vance'}</h3>
            <p className="text-xs font-semibold text-primary">
              {profile.headline || 'Senior Full-Stack Developer & Software Architect'}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1 max-w-2xl">
              {profile.bio || 'Passionate software engineer crafting robust digital applications.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground font-medium">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {profile.location}
                </span>
              )}
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-primary" /> {profile.email}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-primary" /> {profile.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Edit Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Full Name</label>
              <input
                type="text"
                required
                value={profile.fullName || ''}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                placeholder="Alex Vance"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Email Address</label>
              <input
                type="email"
                required
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="alex.vance@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Professional Headline</label>
              <input
                type="text"
                required
                value={profile.headline || ''}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                placeholder="Senior Full-Stack Developer & Software Architect"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold">Phone Number</label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="+1 (555) 234-5678"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Full Biography</label>
            <textarea
              rows={5}
              required
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Passionate software engineer with 5+ years of experience building high-performance web applications..."
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <ImageUpload
                label="Avatar Photo (Upload to Cloudflare R2)"
                value={profile.avatarUrl || ''}
                onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Location</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="San Francisco, CA"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold">Availability Status</label>
                <input
                  type="text"
                  value={profile.availabilityStatus || ''}
                  onChange={(e) => setProfile({ ...profile, availabilityStatus: e.target.value })}
                  placeholder="Available for Freelance / Full-Time Opportunities"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-primary" /> Resume PDF / Link
                </label>
                <input
                  type="text"
                  value={profile.resumeUrl || ''}
                  onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                  placeholder="/sample_resume.pdf or https://..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-bold text-primary">Configurable Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Years Experience</label>
                <input
                  type="number"
                  min="0"
                  value={profile.stats?.yearsExperience || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats!, yearsExperience: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Projects Done</label>
                <input
                  type="number"
                  min="0"
                  value={profile.stats?.completedProjects || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats!, completedProjects: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Total Clients</label>
                <input
                  type="number"
                  min="0"
                  value={profile.stats?.totalClients || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats!, totalClients: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">Technologies</label>
                <input
                  type="number"
                  min="0"
                  value={profile.stats?.technologiesMastered || 0}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      stats: { ...profile.stats!, technologiesMastered: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {message}
            </div>
          )}

          <Button type="submit" disabled={saving} size="lg" className="gap-2">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Biography Changes'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
