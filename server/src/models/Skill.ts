import mongoose, { Schema, Document } from 'mongoose';

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'DevOps & Tools';

export interface ISkill extends Document {
  name: string;
  icon: string;
  category: SkillCategory;
  percentage: number;
  years: number;
  displayOrder: number;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: 'code' },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Mobile', 'DevOps & Tools'],
      required: true,
    },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    years: { type: Number, default: 1 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>('Skill', SkillSchema);
