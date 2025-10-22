import { baseQuery } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const matchApi = createApi({
  reducerPath: 'matchApi',
  baseQuery,
  endpoints: (builder) => ({
    getMatches: builder.query<any, { leagueId?: number; page?: number; pageSize?: number }>({
      query: ({ leagueId, page = 1, pageSize = 10 }) => ({
        url: 'matches',
        method: 'GET',
        headers: {},
        params: {
          ...(leagueId && { 'filters[league][documentId][$eq]': leagueId }),
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'populate[team_a]': true,
          'populate[team_b]': true,
          //   'populate[venue]': true,
          //   'populate[result]': true,
        },
      }),
    }),
    getMatch: builder.query<any, string>({
      query: (matchId) => `matches/${matchId}?populate=*`,
    }),
    createMatch: builder.mutation<any, { data: any }>({
      query: (newMatch) => ({
        url: 'matches',
        method: 'POST',
        body: newMatch,
        params: {
          populate: '*',
        },
      }),
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useLazyGetMatchesQuery,
  useGetMatchQuery,
  useCreateMatchMutation,
} = matchApi;
