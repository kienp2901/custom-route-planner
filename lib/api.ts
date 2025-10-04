import axios from 'axios';
import { RouteRequest, RouteResponse, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const routeApi = {
  calculateRoute: async (data: RouteRequest): Promise<RouteResponse> => {
    try {
      const response = await api.post<ApiResponse<RouteResponse>>('/api/route', data);
      
      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || 'Failed to calculate route');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || error.message;
        throw new Error(message);
      }
      throw error;
    }
  },
};

export default api;
