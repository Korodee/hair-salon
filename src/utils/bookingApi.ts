import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Get available time slots for a specific date
export const getAvailableSlots = async (date: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/available-slots`, {
      params: { date },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available slots:', error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData: {
  date: string;
  time: string;
  service: string;
  duration: number;
  style?: string;
  variation?: 'short' | 'long';
}, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/create`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get all booked dates
export const getAllBookedDates = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/all-dates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    throw error;
  }
}; 