import { Service, IService } from '../models/Service';
import { ApiResponse } from '../types';

export class ServiceService {
  static async createService(serviceData: Partial<IService>): Promise<ApiResponse<IService>> {
    try {
      const service = new Service(serviceData);
      await service.save();
      return {
        success: true,
        data: service
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getAllServices(): Promise<ApiResponse<IService[]>> {
    try {
      const services = await Service.find().sort({ category: 1, name: 1 });
      return {
        success: true,
        data: services
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async getServiceById(id: string): Promise<ApiResponse<IService>> {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return {
          success: false,
          error: 'Service not found'
        };
      }
      return {
        success: true,
        data: service
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async updateService(id: string, serviceData: Partial<IService>): Promise<ApiResponse<IService>> {
    try {
      const service = await Service.findByIdAndUpdate(
        id,
        { $set: serviceData },
        { new: true, runValidators: true }
      );
      if (!service) {
        return {
          success: false,
          error: 'Service not found'
        };
      }
      return {
        success: true,
        data: service
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  static async deleteService(id: string): Promise<ApiResponse<null>> {
    try {
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return {
          success: false,
          error: 'Service not found'
        };
      }
      return {
        success: true,
        message: 'Service deleted successfully'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
} 