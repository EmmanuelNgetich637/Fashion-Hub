import api from '././api';
import { User } from '././types';

export async function register(name: string, email: string, password: string): Promise<User> {
  const response = await api.post<User>('/auth/register', { name, email, password });
  return response.data;
}

export async function login(email: string, password: string): Promise<User> {
  const response = await api.post<User>('/auth/login', { email, password });
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post('/auth/forgot-password', { email });
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await api.post('/auth/reset-password', { token, newPassword });
}

