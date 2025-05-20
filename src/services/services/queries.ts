import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await api.get('/services');
      return data;
    }
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['services', id],
    queryFn: async () => {
      const { data } = await api.get(`/services/${id}`);
      return data;
    },
    enabled: !!id
  });
}; 