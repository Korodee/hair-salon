import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data } = await api.get('/bookings/user');
      return data;
    }
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: async () => {
      const { data } = await api.get(`/bookings/${id}`);
      return data;
    },
    enabled: !!id
  });
}; 