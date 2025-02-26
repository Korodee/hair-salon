import api from "./api";
import { ErrorResponse } from "./authService";

export const createBooking = async (data: { date: string; time: string }) => {
  try {
    const response = await api.post("/bookings/create", data);
    return response.data;
  } catch (error) {
    throw error as ErrorResponse;
  }
};

export const getAvailableSlots = async (date: string) => {
    try {
        const response = await api.get(`/bookings/available-slots?date=${date}`);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const getAllBookedDates = async () => {
    try {
        const response = await api.get('/bookings/all-dates');
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}