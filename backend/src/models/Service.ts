import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image?: string;
}

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 15 // minimum 15 minutes
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

export const Service = mongoose.model<IService>('Service', serviceSchema); 