'use client';
// This directive indicates that this is a Client Component in Next.js

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import apiClient from '@/services/apiClient';

/**
 * Interface defining the shape of API errors we might encounter
 * Helps with TypeScript type safety when handling errors
 */
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

/**
 * Custom hook for handling authentication-related operations
 * Provides authentication functions and loading state
 */
export const useAuth = () => {
  // State to track when authentication operations are in progress
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles user signup by sending data to the backend API
   * @param data - Object containing user registration details:
   *   - username: string
   *   - email: string
   *   - password: string
   *   - phoneNumber: string
   * @returns Promise with the response data from the API
   * @throws Error if the signup fails
   */
  const signup = async (data: {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    setIsLoading(true); // Set loading state when operation begins
    try {
      // Make POST request to signup endpoint with provided data
      const response = await apiClient.post('/auth/signup', data);

      // On success, return the response data
      // Note: You might want to add token storage or redirection logic here
      return response.data;
    } catch (error: unknown) {
      // Comprehensive error handling with different error scenarios:

      let errorMessage = 'Signup failed'; // Default error message

      // Check if it's an API error with response data
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as ApiError;
        errorMessage = apiError.response?.data?.message || 'Signup failed';
      }
      // Check if it's a standard Error object
      else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as Error).message;
      }

      // Display error message to user using toast notifications
      toast.error(errorMessage);

      // Re-throw the error so calling components can handle it if needed
      throw error;
    } finally {
      // Always reset loading state when operation completes (success or failure)
      setIsLoading(false);
    }
  };

  // Expose the signup function and loading state to components using this hook
  return { signup, isLoading };
};
