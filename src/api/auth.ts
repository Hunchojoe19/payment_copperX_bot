import apiClient from './index';
import { AuthResponse, UserProfile, KycStatus } from '../types/api';

export async function requestEmailOtp(email: string): Promise<AuthResponse> {
  const response = await apiClient.post('/auth/email-otp/request', { email });
  return response.data;
}

export async function authenticateWithOtp(email: string, otp: string): Promise<AuthResponse> {
  const response = await apiClient.post('/auth/email-otp/authenticate', { email, otp });
  return response.data;
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await apiClient.get('/auth/me');
  return response.data;
}

export async function getKycStatus(): Promise<KycStatus> {
  const response = await apiClient.get('/kycs');
  return response.data;
}