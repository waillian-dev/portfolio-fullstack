import mongoose, { Schema, Document } from 'mongoose';

export interface IProfileStats {
  yearsExperience: number;
  completedProjects: number;
  totalClients: number;
  technologiesMastered: number;
}

export interface IProfile extends Document {
  fullName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  availabilityStatus: string;
  resumeUrl: string;
  stats: IProfileStats;
}

const ProfileSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    headline: { type: String, required: true },
    bio: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    location: { type: String, default: 'San Francisco, CA' },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    availabilityStatus: { type: String, default: 'Available for Freelance / Full-Time Opportunities' },
    resumeUrl: { type: String, default: '' },
    stats: {
      yearsExperience: { type: Number, default: 5 },
      completedProjects: { type: Number, default: 30 },
      totalClients: { type: Number, default: 15 },
      technologiesMastered: { type: Number, default: 20 },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema);
