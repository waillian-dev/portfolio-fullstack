import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  isPublished: boolean;
  readingTimeMinutes: number;
  viewsCount: number;
  publishedAt?: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    author: { type: String, default: 'Portfolio Owner' },
    isPublished: { type: Boolean, default: true },
    readingTimeMinutes: { type: Number, default: 5 },
    viewsCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
