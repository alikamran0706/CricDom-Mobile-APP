import { baseQueryWithReauth } from '@/services/api';
import { BaseQueryFn, createApi, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, 
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { identifier: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Additional user API endpoints
    register: builder.mutation<{ user: any }, { email: string; password: string; username: string }>({
      query: (credentials) => ({
        url: 'auth/local/register',
        method: 'POST',
        body: credentials,
      }),
    }),

    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: 'users/me',
        method: 'GET',
        params: {
          'populate[player][populate][image]': true,
          'populate[player][populate][batting_performances]': true,
          'populate[player][populate][bowling_performances]': true,
          'populate[player][populate][teams]': true,
          'populate[player][populate][fall_of_wickets]': true,
          'populate[innings]': true,
          'populate[leagues]': true,
        },
      }),
    }),

    updateUserById: builder.mutation<any, { id: number; data: Partial<{ username: string; email: string }> }>({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useGetCurrentUserQuery, useLoginMutation, useRegisterMutation, useUpdateUserByIdMutation, } = userApi;
