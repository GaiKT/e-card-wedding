"use client";

import { useState } from 'react';

export interface GooglePhoto {
  id: string;
  baseUrl: string;
  filename: string;
  mimeType: string;
  mediaMetadata: {
    width: string;
    height: string;
    creationTime: string;
  };
}

export interface GooglePhotosAlbum {
  id: string;
  title: string;
  productUrl: string;
  mediaItemsCount: string;
  coverPhotoBaseUrl?: string;
}

interface UseGooglePhotosReturn {
  photos: GooglePhoto[];
  albums: GooglePhotosAlbum[];
  loading: boolean;
  error: string | null;
  fetchAlbumPhotos: (albumId: string) => Promise<void>;
  fetchAlbums: () => Promise<void>;
}

// This hook manages Google Photos API integration
export const useGooglePhotos = (): UseGooglePhotosReturn => {
  const [photos, setPhotos] = useState<GooglePhoto[]>([]);
  const [albums, setAlbums] = useState<GooglePhotosAlbum[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Photos API configuration
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_PHOTOS_CLIENT_ID || '';

  // Initialize Google API
  const initializeGoogleAPI = async () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.gapi) {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: CLIENT_ID,
          });
          resolve(true);
        });
      }
    });
  };

  // Authenticate user
  const authenticateUser = async () => {
    if (typeof window !== 'undefined' && window.gapi) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }
      return authInstance.currentUser.get().getAuthResponse().access_token;
    }
    return null;
  };

  // Fetch albums from Google Photos
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await initializeGoogleAPI();
      const accessToken = await authenticateUser();
      
      if (!accessToken) {
        throw new Error('Authentication failed');
      }

      const response = await fetch(
        'https://photoslibrary.googleapis.com/v1/albums',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();
      setAlbums(data.albums || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch photos from specific album
  const fetchAlbumPhotos = async (albumId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await initializeGoogleAPI();
      const accessToken = await authenticateUser();
      
      if (!accessToken) {
        throw new Error('Authentication failed');
      }

      const response = await fetch(
        'https://photoslibrary.googleapis.com/v1/mediaItems:search',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            albumId: albumId,
            pageSize: 50,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }

      const data = await response.json();
      setPhotos(data.mediaItems || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    photos,
    albums,
    loading,
    error,
    fetchAlbumPhotos,
    fetchAlbums,
  };
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (baseUrl: string, width: number, height: number) => {
  return `${baseUrl}=w${width}-h${height}-c`;
};

// Helper function to get thumbnail URL
export const getThumbnailUrl = (baseUrl: string) => {
  return getOptimizedImageUrl(baseUrl, 400, 400);
};

// Helper function to get full-size URL
export const getFullSizeUrl = (baseUrl: string) => {
  return `${baseUrl}=d`;
};