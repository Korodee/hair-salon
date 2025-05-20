export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  _id: string;
  userId: string;
  serviceId: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Gallery {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface News {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 