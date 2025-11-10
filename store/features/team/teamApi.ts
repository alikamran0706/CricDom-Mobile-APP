import { baseQueryWithReauth } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Teams'], 

  endpoints: (builder) => ({
    // 🧩 Get all teams
    getTeams: builder.query<
      any,
      { page?: number; pageSize?: number; ownerId?: string }
    >({
      query: ({ page = 1, pageSize = 10, ownerId }) => ({
        url: `teams`,
        params: {
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'populate[image]': true,
          // 'populate[players]': true,
          'populate[players][populate][image]': true,
          ...(ownerId && {
            'filters[owner][documentId][$eq]': ownerId,
          }),
        },
      }),
      providesTags: ['Teams'], // ✅ Cache tag for list
    }),

    // 🧩 Get single team
    getTeam: builder.query<any, string>({
      query: (id) => ({
        url: `teams/${id}`,
        method: 'GET',
        params: {
          'populate[image]': true,
          'populate[players][populate][image]': true,
          'populate[owner]': true,
        },
      }),
      providesTags: (result, error, id) => [{ type: 'Teams', id }], // ✅ Cache tag for this team
    }),

    // 🧩 Create team
    createTeam: builder.mutation<any, { data: any }>({
      query: (newTeam) => ({
        url: 'teams',
        method: 'POST',
        body: newTeam,
      }),
      invalidatesTags: ['Teams'], // ✅ Refresh team list automatically
    }),

    // 🧩 Update team
    updateTeam: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `teams/${id}`,
        method: 'PUT',
        body: { data },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Teams', id },
        'Teams',
      ], 
    }),

    // 🧩 Delete team
    deleteTeam: builder.mutation<any, string>({
      query: (id) => ({
        url: `teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teams'], 
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
