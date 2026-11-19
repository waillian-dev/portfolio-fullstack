import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  jobTitle: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  employmentType: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  displayOrder: number;
}

const ExperienceSchema: Schema = new Schema(
  {
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    employmentType: { type: String, default: 'Full-Time' },
    description: { type: String, default: '' },
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
