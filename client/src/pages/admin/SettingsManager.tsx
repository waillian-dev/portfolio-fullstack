import React, { useEffect, useState } from 'react';
import { fetchSettings, updateSettingsApi } from '../../services/api';
import { ISiteSetting } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { CheckCircle2, Save } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<Partial<ISiteSetting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings()
      .then((data) => setSettings(data || {}))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const updated = await updateSettingsApi(settings);
      setSettings(updated);
      setMessage('Site settings saved successfully!');
    } catch (err: any) {
      setMessage('Error updating site settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Site Settings & Configuration</h2>
        <p className="text-xs text-muted-foreground">Manage global site metadata & social media links</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Site Title</label>
            <input
              type="text"
              value={settings.siteTitle || ''}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold">Site Description (SEO)</label>
            <textarea
              rows={3}
              value={settings.siteDescription || ''}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-sm resize-none"
            />
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase tracking-wider font-bold text-primary">Social Links</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">GitHub URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.github || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded border border-border bg-background text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-muted-foreground">LinkedIn URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded border border-border bg-background text-sm"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className="p-3 rounded bg-primary/10 text-primary text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {message}
            </div>
          )}

          <Button type="submit" disabled={saving} className="gap-2">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
