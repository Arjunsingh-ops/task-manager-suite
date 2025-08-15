import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData: { username: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getCurrentUser: () => api.get('/auth/me'),
};

// Tasks API
export const tasksAPI = {
  getTasks: (params?: { status?: string; priority?: string; sort?: string }) =>
    api.get('/tasks', { params }),
  
  getTask: (id: string) => api.get(`/tasks/${id}`),
  
  createTask: (taskData: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }) => api.post('/tasks', taskData),
  
  updateTask: (id: string, taskData: any) => api.put(`/tasks/${id}`, taskData),
  
  deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};

export default api;