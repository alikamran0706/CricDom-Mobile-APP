import { RootState } from '@/store'; // Import RootState to access the Redux state
import { logout } from '@/store/features/user/userSlice';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// Create a reusable base query function
export const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,  // Set the base API URL here
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
    }
    return headers;
  }
});


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    const error = result.error as FetchBaseQueryError & { originalStatus?: number };
    if (error && (error.status === 401 || error.originalStatus === 401)) {
      api.dispatch(logout());
      return result;
    }

    return result;
  } catch (error) {
    console.error('Unexpected error in baseQueryWithReauth:', error);
    return { error: { status: 'CUSTOM_ERROR', data: error } } as any;
  }
};
