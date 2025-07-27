import axios from 'axios';

// Define the User interface
export interface User {
  _id?: string;
  name: string;
  text: string;
  age: number;
  createdAt?: Date;
}

// Add TypeScript interface for import.meta.env
interface ImportMetaEnv {
  VITE_API_URL: string;
}

// Create axios instance
const api = axios.create({
  baseURL: 'https://testbackend-r0ze.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: User): Promise<User> => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: User): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};