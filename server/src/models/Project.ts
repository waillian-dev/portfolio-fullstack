import mongoose, { Schema, Document } from 'mongoose';

export type ProjectCategory = 'Web' | 'Mobile' | 'Backend' | 'Dashboard' | 'UI/UX' | 'Other';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  thumbnailUrl: string;
  gallery: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  completionDate?: Date;
  problemStatement?: string;
  solutionStatement?: string;
  keyFeatures?: string[];
  viewsCount: number;
  displayOrder: number;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: {
      type: String,
      enum: ['Web', 'Mobile', 'Backend', 'Dashboard', 'UI/UX', 'Other'],
      default: 'Web',
    },
    thumbnailUrl: { type: String, required: true },
    gallery: [{ type: String }],
    technologies: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    completionDate: { type: Date },
    problemStatement: { type: String, default: '' },
    solutionStatement: { type: String, default: '' },
    keyFeatures: [{ type: String }],
    viewsCount: { type: Number, default: 0 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
