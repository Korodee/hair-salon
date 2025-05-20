import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const gallerySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

export const Gallery = mongoose.model<IGallery>('Gallery', gallerySchema); 