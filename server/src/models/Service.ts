import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  icon: string;
  shortDescription: string;
  features: string[];
  priceRange?: string;
  ctaText: string;
  displayOrder: number;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, default: 'layers' },
    shortDescription: { type: String, required: true },
    features: [{ type: String }],
    priceRange: { type: String, default: '' },
    ctaText: { type: String, default: 'Get in Touch' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
