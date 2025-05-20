import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { ApiResponse } from '../types';

export class AuthService {
  private static generateToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  }

  static async register(userData: { email: string; password: string; name: string }): Promise<ApiResponse<{ user: IUser; token: string }>> {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return {
          success: false,
          error: 'Email already registered'
        };
      }

      const user = new User(userData);
      await user.save();

      const token = this.generateToken(user);

      return {
        success: true,
        data: {
          user,
          token
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async login(email: string, password: string): Promise<ApiResponse<{ user: IUser; token: string }>> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return {
          success: false,
          error: 'Invalid credentials'
        };
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Invalid credentials'
        };
      }

      const token = this.generateToken(user);

      return {
        success: true,
        data: {
          user,
          token
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getProfile(userId: string): Promise<ApiResponse<IUser>> {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return {
          success: false,
          error: 'User not found'
        };
      }

      return {
        success: true,
        data: user
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
} 