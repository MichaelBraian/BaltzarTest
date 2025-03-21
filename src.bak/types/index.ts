/**
 * Common type definitions for the application
 */

// API response status
export type ApiStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// User profile interface
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// API error interface
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T | null;
  status: ApiStatus;
  error: ApiError | null;
} 