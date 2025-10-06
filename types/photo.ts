export interface Photo {
  id: string;
  imageId: number;
  imagePath: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoLike {
  imageId: number;
  likesCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}