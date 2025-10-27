import { baseQueryWithReauth } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const matchApi = createApi({
  reducerPath: 'matchApi',
  baseQuery: baseQueryWithReauth, 
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
        },
      }),
    }),
    getMatch: builder.query<any, string>({
      query: (matchId) => ({
        url: `matches/${matchId}`,
        method: 'GET',
        params: {
          'populate[team_a][populate][image]': true,
          'populate[team_a][populate][players][populate][image]': true,
          'populate[team_b][populate][image]': true,
          'populate[team_b][populate][players][populate][image]': true,
          // 'populate[toss]': true,
          'populate[toss][populate][team]': true,
          // 'populate[owner]': true,

          // 'populate[batting_inning][populate][current_non_striker]': true,
          // 'populate[batting_inning][populate][current_bowler]': true,

          // 'populate[bowling_inning][populate][current_non_striker]': true,
          // 'populate[bowling_inning][populate][current_bowler]': true,
        },
      }),
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
