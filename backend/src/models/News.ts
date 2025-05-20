import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  content: string;
  imageUrl?: string;
  published: boolean;
}

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const News = mongoose.model<INews>('News', newsSchema); 