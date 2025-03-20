import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

const apiClient: AxiosInstance = axios.create({
  baseURL: config.copperxApiBaseUrl,
  headers: {
    // Authorization: `Bearer ${config.copperxApiToken}`,
    'Content-Type': 'application/json',
  },
});

export default apiClient;