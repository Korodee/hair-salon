import { Booking, IBooking } from '../models/Booking';
import { Service } from '../models/Service';
import { ApiResponse } from '../types';

export class BookingService {
  static async createBooking(bookingData: Partial<IBooking>): Promise<ApiResponse<IBooking>> {
    try {
      // Check if the service exists
      const service = await Service.findById(bookingData.serviceId);
      if (!service) {
        return {
          success: false,
          error: 'Service not found'
        };
      }

      // Check if the time slot is available
      const existingBooking = await Booking.findOne({
        date: bookingData.date,
        time: bookingData.time,
        status: { $in: ['pending', 'confirmed'] }
      });

      if (existingBooking) {
        return {
          success: false,
          error: 'Time slot is already booked'
        };
      }

      const booking = new Booking({
        ...bookingData,
        totalAmount: service.price
      });
      await booking.save();

      return {
        success: true,
        data: booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getUserBookings(userId: string): Promise<ApiResponse<IBooking[]>> {
    try {
      const bookings = await Booking.find({ userId })
        .populate('serviceId')
        .sort({ date: -1, time: -1 });
      return {
        success: true,
        data: bookings
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getBookingById(id: string): Promise<ApiResponse<IBooking>> {
    try {
      const booking = await Booking.findById(id).populate('serviceId');
      if (!booking) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }
      return {
        success: true,
        data: booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async updateBookingStatus(id: string, status: IBooking['status']): Promise<ApiResponse<IBooking>> {
    try {
      const booking = await Booking.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true, runValidators: true }
      ).populate('serviceId');

      if (!booking) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      return {
        success: true,
        data: booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async updatePaymentStatus(id: string, paymentStatus: IBooking['paymentStatus']): Promise<ApiResponse<IBooking>> {
    try {
      const booking = await Booking.findByIdAndUpdate(
        id,
        { $set: { paymentStatus } },
        { new: true, runValidators: true }
      ).populate('serviceId');

      if (!booking) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      return {
        success: true,
        data: booking
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
} 