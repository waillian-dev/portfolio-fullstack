import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { api } from '../../services/api';
import { Button } from './Button';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedUrl = res.data.data.url;
      onChange(uploadedUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to upload image to Cloudflare R2');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-semibold text-foreground block">{label}</label>}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-border bg-card max-w-sm">
          <img src={value} alt="Uploaded preview" className="w-full h-44 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-full bg-destructive text-destructive-foreground shadow hover:scale-110 transition-transform"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/60 transition-colors p-4 text-center">
          <div className="flex flex-col items-center justify-center space-y-2">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : (
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Upload className="w-5 h-5" />
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              {uploading ? (
                <span className="font-semibold text-primary">Uploading to Cloudflare R2...</span>
              ) : (
                <>
                  <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
                  <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, WebP, GIF (Max 5MB)</p>
                </>
              )}
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};
