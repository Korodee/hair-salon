import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

interface NewsData {
  title: string;
  content: string;
  imageUrl?: string;
  published: boolean;
}

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newsData: NewsData) => {
      const { data } = await api.post('/news', newsData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    }
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newsData }: { id: string; newsData: Partial<NewsData> }) => {
      const { data } = await api.put(`/news/${id}`, newsData);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['news', id] });
    }
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/news/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    }
  });
};

export const useToggleNewsPublish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { data } = await api.patch(`/news/${id}/publish`, { published });
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['news', id] });
      queryClient.invalidateQueries({ queryKey: ['news', 'published'] });
    }
  });
}; 