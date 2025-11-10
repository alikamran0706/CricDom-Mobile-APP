import { baseQueryWithReauth } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const matchApi = createApi({
  reducerPath: 'matchApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getMatches: builder.query<any, { leagueId?: number | null; page?: number; pageSize?: number }>({
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

          'populate[innings][populate][bowling_team]': true,
          // 'populate[innings][populate][batting_team]': true,
          'populate[innings][populate][batting_team][populate][players][populate][image]': true,
          'populate[innings][populate][overs][populate][over_balls]': true,
          'populate[toss][populate][team]': true,
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


          'populate[communities]': true,
          // 'populate[innings]': true,

          'populate[innings][populate][current_striker]': true,
          'populate[innings][populate][current_non_striker]': true,
          'populate[innings][populate][current_bowler][populate][image]': true,
          'populate[innings][populate][player_scores][populate][player][populate][image]': true,

          'populate[communities][populate][photo]': true,
          'populate[communities][populate][player]': true,
          

          'populate[innings][populate][bowler_stats][populate][bowler][populate][image]': true,
          'populate[innings][populate][bowler_stats][populate][overs][populate][bowler][populate][image]': true,
          'populate[innings][populate][bowler_stats][populate][wickets]': true,
          
          'populate[innings][populate][bowler_stats][populate][overs][populate][over_balls][populate][batsman][populate][image]': true,

          'populate[innings][populate][bowling_team][populate][players][populate][image]': true,
          'populate[innings][populate][batting_team][populate][image]': true,
          'populate[innings][populate][batting_team][populate][players][populate][image]': true,
          'populate[innings][populate][overs][populate][over_balls]': true,

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

    updateMatch: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `matches/${id}`,
        method: 'PUT',
        body: { data },
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
  useUpdateMatchMutation
} = matchApi;
