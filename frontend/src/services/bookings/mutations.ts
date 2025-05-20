import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

interface BookingData {
  serviceId: string;
  date: Date;
  time: string;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingData) => {
      const { data } = await api.post('/bookings', bookingData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'confirmed' | 'cancelled' | 'completed' }) => {
      const { data } = await api.patch(`/bookings/${id}/status`, { status });
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings', id] });
    }
  });
};

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, paymentStatus }: { id: string; paymentStatus: 'paid' | 'failed' }) => {
      const { data } = await api.patch(`/bookings/${id}/payment`, { paymentStatus });
      return data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings', id] });
    }
  });
}; 