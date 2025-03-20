import apiClient from './index';
import { Wallet, WalletBalance } from '../types/api';

export async function getWallets(): Promise<Wallet[]> {
  const response = await apiClient.get('/wallets');
  return response.data;
}

export async function getWalletBalances(): Promise<WalletBalance[]> {
  const response = await apiClient.get('/wallets/balances');
  return response.data;
}

export async function setDefaultWallet(walletId: string): Promise<void> {
  await apiClient.put('/wallets/default', { walletId });
}

export async function getTransactionHistory(page: number = 1, limit: number = 10): Promise<any> {
  const response = await apiClient.get(`/transfers?page=${page}&limit=${limit}`);
  return response.data;
}