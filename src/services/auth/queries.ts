import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/auth/profile');
      return data;
    },
    enabled: !!localStorage.getItem('authToken')
  });
}; 