import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  jobTitle: string;
  company: string;
  avatarUrl: string;
  rating: number;
  content: string;
  isApproved: boolean;
  displayOrder: number;
}

const TestimonialSchema: Schema = new Schema(
  {
    clientName: { type: String, required: true, trim: true },
    jobTitle: { type: String, default: '' },
    company: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
