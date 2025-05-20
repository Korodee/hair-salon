import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

interface ServiceData {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image?: string;
}

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (serviceData: ServiceData) => {
      const { data } = await api.post('/services', serviceData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, serviceData }: { id: string; serviceData: Partial<ServiceData> }) => {
      const { data } = await api.put(`/services/${id}`, serviceData);
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', id] });
    }
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/services/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  });
}; 