import { baseQueryWithReauth } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const teamApi = createApi({
  reducerPath: 'teamApi',
   baseQuery: baseQueryWithReauth, 
  endpoints: (builder) => ({
    getTeams: builder.query<any, { page?: number; pageSize?: number; ownerId?: string }>({
      query: ({ page = 1, pageSize = 10, ownerId }) => ({
        url: `teams`,
        params: {
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'populate[image]': true,
          'populate[players]': true,
          ...(ownerId && {
            'filters[owner][documentId][$eq]': ownerId,
          }),
        },
      }),
    }),
    getTeam: builder.query<any, string>({
      query: (id) => ({
        url: `teams/${id}`,
        method: 'GET',
        headers: {},
        params: {
          'populate[image]': true,
          // 'populate[players]': true,
          'populate[players][populate][image]': true,
          'populate[owner]': true,
        },
      }),
    }),
    createTeam: builder.mutation<any, { data: any }>({
      query: (newTeam) => ({
        url: 'teams',
        method: 'POST',
        body: newTeam,
      }),
    }),
    updateTeam: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `teams/${id}`,
        method: 'PUT',
        body: {data: data},
      }),
    }),
    deleteTeam: builder.mutation<any, string>({
      query: (id) => ({
        url: `teams/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useLazyGetTeamQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
