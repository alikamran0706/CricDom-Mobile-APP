import { buildStrapiFilters } from '@/lib/utils/common';
import { baseQueryWithReauth } from '@/services/api';
import { BaseQueryFn, createApi, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const playerApi = createApi({
    reducerPath: 'playerApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    endpoints: (builder) => ({
        getPlayers: builder.query<any, { page?: number; pageSize?: number; filters?: any }>({
            query: ({ page = 1, pageSize = 10, filters = {} }) => {
                const params: any = {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    'populate[image]': true,
                    'populate[teams]': true,
                    'populate[batting_performances]': true,
                    'populate[bowling_performances]': true,
                    'populate[fall_of_wickets]': true,
                    ...buildStrapiFilters(filters)
                };

                return {
                    url: 'players',
                    params,
                };
            },
        }),
        getCurrentPlayer: builder.query<any, void>({
            query: () => 'players/me',
        }),

        getPlayerById: builder.query<any, string>({
            query: (id) => ({
                url: `players/${id}`,
                params: {
                    'populate[image]': true,
                    'populate[teams]': true,
                    'populate[batting_performances]': true,
                    'populate[bowling_performances]': true,
                    'populate[fall_of_wickets]': true,
                },
            }),
        }),

        createPlayer: builder.mutation<any, { data: any }>({
            query: (newPlayer) => ({
                url: 'players',
                method: 'POST',
                body: newPlayer,
            }),
        }),

        updatePlayer: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `players/${id}`,
                method: 'PUT',
                body: { data },
            }),
        }),
    }),
});

export const { useLazyGetPlayersQuery, useGetCurrentPlayerQuery, useCreatePlayerMutation,
    useGetPlayerByIdQuery, useUpdatePlayerMutation, } = playerApi;
