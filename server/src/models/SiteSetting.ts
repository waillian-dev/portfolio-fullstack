import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface ISiteSetting extends Document {
  siteTitle: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  socialLinks: ISocialLinks;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const SiteSettingSchema: Schema = new Schema(
  {
    siteTitle: { type: String, default: 'Developer Portfolio' },
    siteDescription: { type: String, default: 'Personal portfolio of a Senior Full-Stack Developer' },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    primaryColor: { type: String, default: '#6366f1' },
    socialLinks: {
      github: { type: String, default: 'https://github.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: { type: String, default: 'Site is under scheduled maintenance. Please check back soon.' },
  },
  { timestamps: true }
);

export default mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
