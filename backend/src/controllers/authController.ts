import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const result = await AuthService.register({ email, password, name });
    
    if (!result.success) {
      return res.status(400).json(result);
    }
    
    return res.status(201).json(result);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    
    if (!result.success) {
      return res.status(401).json(result);
    }
    
    return res.status(200).json(result);
  }

  static async getProfile(req: Request, res: Response) {
    const userId = req.user?.id; // This will be set by the auth middleware
    const result = await AuthService.getProfile(userId);
    
    if (!result.success) {
      return res.status(404).json(result);
    }
    
    return res.status(200).json(result);
  }
} 