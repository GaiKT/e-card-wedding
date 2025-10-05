// API Types for Wedding Blessings

export type Blessing = {
  id: string;
  name: string;
  email: string | null;
  message: string;
  willAttend: boolean | null; // เพิ่ม field สำหรับการเข้าร่วมงาน
  hasDonated: boolean | null; // เพิ่ม field สำหรับการบริจาค
  createdAt: string;
  updatedAt: string;
};

export type CreateBlessingData = {
  name: string;
  email?: string;
  message: string;
  willAttend?: boolean | null; // เพิ่ม field สำหรับการเข้าร่วมงาน
  hasDonated?: boolean | null; // เพิ่ม field สำหรับการบริจาค
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
};