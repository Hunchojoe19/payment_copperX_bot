import apiClient from './index';
import { TransferResponse } from '../types/api';

export async function sendToEmail(email: string, amount: number): Promise<TransferResponse> {
  const response = await apiClient.post('/transfers/send', { email, amount });
  return response.data;
}

export async function withdrawToWallet(address: string, amount: number): Promise<TransferResponse> {
  const response = await apiClient.post('/transfers/wallet-withdraw', { address, amount });
  return response.data;
}

export async function withdrawToBank(accountId: string, amount: number): Promise<TransferResponse> {
  const response = await apiClient.post('/transfers/offramp', { accountId, amount });
  return response.data;
}