import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

interface GalleryData {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (galleryData: GalleryData) => {
      const { data } = await api.post('/gallery', galleryData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    }
  });
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, galleryData }: { id: string; galleryData: Partial<GalleryData> }) => {
      const { data } = await api.put(`/gallery/${id}`, galleryData);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      queryClient.invalidateQueries({ queryKey: ['gallery', id] });
    }
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/gallery/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    }
  });
}; 