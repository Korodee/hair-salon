export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image?: string;
  category: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  service?: Service;
}

export interface News {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
} 