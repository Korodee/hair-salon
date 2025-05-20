import { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';

export class BookingController {
  static async createBooking(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }
    
    const result = await BookingService.createBooking({
      ...req.body,
      userId
    });
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    return res.status(201).json(result);
  }

  static async getUserBookings(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }
    
    const result = await BookingService.getUserBookings(userId);
    
    if (!result.success) {
      return res.status(500).json(result);
    }
    
    return res.status(200).json(result);
  }

  static async getBookingById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await BookingService.getBookingById(id);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    return res.status(200).json(result);
  }

  static async updateBookingStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const result = await BookingService.updateBookingStatus(id, status);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    return res.status(200).json(result);
  }

  static async updatePaymentStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const result = await BookingService.updatePaymentStatus(id, paymentStatus);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    return res.status(200).json(result);
  }
} 