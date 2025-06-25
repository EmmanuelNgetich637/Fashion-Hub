import api from '././api';
import { CartItem } from '././types';

export async function fetchCart(): Promise<CartItem[]> {
  const response = await api.get<CartItem[]>('/cart');
  return response.data;
}

export async function addToCart(productId: string, quantity: number): Promise<void> {
  await api.post('/cart', { productId, quantity });
}

export async function removeFromCart(productId: string): Promise<void> {
  await api.delete(`/cart/${productId}`);
}

export async function updateCart(productId: string, quantity: number): Promise<void> {
  await api.put(`/cart/${productId}`, { quantity });
}
