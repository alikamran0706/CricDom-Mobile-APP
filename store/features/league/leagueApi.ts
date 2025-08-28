import { baseQuery } from '@/app/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const leagueApi = createApi({
    reducerPath: 'leagueApi',
    baseQuery,
    endpoints: (builder) => ({
        getLeagues: builder.query<any, { page?: number; pageSize?: number; creatorId?: string }>({
            query: ({ page = 1, pageSize = 10, creatorId  }) => ({
                url: `leagues`,
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    ...(creatorId && { 'filters[creator][[documentId]][$eq]': creatorId }),
                },
            }),
        }),
        getLeague: builder.query<any, string>({
            query: (id) => ({
                url: `leagues/${id}`,
                method: 'GET',
                headers: {},
                params: {
                    populate: '*',
                },
            }),
        }),
        createLeague: builder.mutation<any, { data: any }>({
            query: (newLeague) => ({
                url: 'leagues',
                method: 'POST',
                body: newLeague,
            }),
        }),
    }),
});

export const {
    useGetLeaguesQuery,
    useGetLeagueQuery,
    useLazyGetLeagueQuery,
    useCreateLeagueMutation,
} = leagueApi;
