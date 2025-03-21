import { ApiError, ApiResponse } from '../types';

/**
 * Generic fetch API wrapper with error handling and typing
 * @param url The URL to fetch from
 * @param options Optional fetch options
 * @returns Promise with typed data or error
 */
export async function fetchData<T>(
  url: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.message || `Error: ${response.status} ${response.statusText}`,
        code: errorData.code || String(response.status),
        details: errorData.details,
      };
      
      return {
        data: null,
        status: 'failed',
        error,
      };
    }

    const data = await response.json();
    return {
      data,
      status: 'succeeded',
      error: null,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
    
    return {
      data: null,
      status: 'failed',
      error: apiError,
    };
  }
} 