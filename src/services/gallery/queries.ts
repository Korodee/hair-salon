import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data } = await api.get('/gallery');
      return data;
    }
  });
};

export const useGalleryByCategory = (category: string) => {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: async () => {
      const { data } = await api.get(`/gallery/category/${category}`);
      return data;
    },
    enabled: !!category
  });
}; 