export interface AuthResponse {
  token: string;
  expiresAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
}

export interface KycStatus {
  status: 'pending' | 'approved' | 'rejected';
  details?: string;
}

export interface Wallet {
  id: string;
  network: string;
  address: string;
  isDefault: boolean;
}

export interface WalletBalance {
  network: string;
  amount: number;
}

export interface TransferResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  fee: number;
}