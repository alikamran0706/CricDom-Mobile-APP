import { RootState } from '@/store'; // Import RootState to access the Redux state
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create a reusable base query function
export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.88.177:1337/api/',  // Set the base API URL here
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).user.token; // Get token from Redux state

    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // Set Authorization header if token exists
    }
    return headers;
  },
});
