import { RootState } from '@/store'; // Import RootState to access the Redux state
import { logout } from '@/store/features/user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// Create a reusable base query function
export const baseQuery = fetchBaseQuery({
  baseUrl: apiUrl,  // Set the base API URL here
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    console.log('tokkekekennnnnnnnn', token, 'testttttttttttt')
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
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('profile');
  }

  return result;
};