import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getAllBookedDates = async () => {
    try {
        const response = await axios.get(`${API_URL}/bookings/dates`);
        return response.data;
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        throw error;
    }
};

export const getAvailableSlots = async (date: string) => {
    try {
        const response = await axios.get(`${API_URL}/bookings/slots/${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching available slots:', error);
        throw error;
    }
};

export const createBooking = async (bookingData: {
    date: string;
    time: string;
    service: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/bookings`, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getUserBookings = async () => {
    try {
        const response = await axios.get(`${API_URL}/bookings/user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
    }
};