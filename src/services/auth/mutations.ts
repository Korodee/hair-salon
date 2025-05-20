import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.data.token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/dashboard');
    }
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const { data } = await api.post('/auth/register', userData);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.data.token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/dashboard');
    }
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('authToken');
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    }
  });
}; 