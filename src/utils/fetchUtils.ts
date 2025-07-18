export class FetchError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, message?: string) {
    super(message || `HTTP Error ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.name = 'FetchError';
  }
}

export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new FetchError(
        response.status,
        response.statusText,
        `Data loading error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new Error('Network error: please check your internet connection');
    }

    if (error instanceof SyntaxError) {
      throw new Error('Data processing error: invalid server response format');
    }

    throw new Error('Unknown error occurred while loading data');
  }
}

import {API_ENDPOINTS} from '../constants/api';
import type {User} from '../types/user';

export async function fetchUsers(): Promise<User[]> {
  const data = await fetchWithErrorHandling<{users: User[]}>(
    API_ENDPOINTS.USERS,
  );
  return data.users;
}
