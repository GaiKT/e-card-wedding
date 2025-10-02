// API Types for Wedding Blessings

export type Blessing = {
  id: string;
  name: string;
  email: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBlessingData = {
  name: string;
  email?: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
};