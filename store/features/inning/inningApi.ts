import { baseQuery } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const inningApi = createApi({
    reducerPath: 'inningApi',
    baseQuery,
    tagTypes: ['Innings', 'PlayerScore', 'BowlerStats'],
    endpoints: (builder) => ({
        // ✅ Get All Innings
        getInnings: builder.query<any, { page?: number; pageSize?: number; filters?: any }>({
            query: ({ page = 1, pageSize = 10, filters }) => ({
                url: `innings`,
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    ...(filters && filters),
                    'sort': 'createdAt:desc',
                    populate: '*',
                },
            }),
            providesTags: ['Innings'],
        }),

        // ✅ Get Single Inning
        getInning: builder.query<any, string>({
            query: (id) => ({
                url: `innings/${id}`,
                method: 'GET',
                params: { populate: '*' },
            }),
            providesTags: ['Innings'],
        }),

        // ✅ Create Inning
        createInning: builder.mutation<any, { data: any }>({
            query: (newInning) => ({
                url: 'innings',
                method: 'POST',
                body: newInning,
                params: { populate: '*' },
            }),
            invalidatesTags: ['Innings'],
        }),

        // ✅ Update Inning
        updateInning: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `innings/${id}`,
                method: 'PUT',
                body: { data },
                params: { populate: '*' },
            }),
            invalidatesTags: ['Innings'],
        }),

        // ✅ Player Score CRUD
        createPlayerScore: builder.mutation<any, { data: any }>({
            query: (body) => ({
                url: 'player-scores',
                method: 'POST',
                body,
                params: { populate: '*' },
            }),
            invalidatesTags: ['PlayerScore'],
        }),

        updatePlayerScore: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `player-scores/${id}`,
                method: 'PUT',
                body: { data },
            }),
            invalidatesTags: ['PlayerScore'],
        }),

        // ✅ Bowler Stats CRUD
        createBowlerStats: builder.mutation<any, { data: any }>({
            query: (body) => ({
                url: 'bowler-stats',
                method: 'POST',
                body,
                params: { populate: '*' },
            }),
            invalidatesTags: ['BowlerStats'],
        }),

        updateBowlerStats: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `bowler-stats/${id}`,
                method: 'PUT',
                body: { data },
                params: { populate: '*' },
            }),
            invalidatesTags: ['BowlerStats'],
        }),

        getBowlerStat: builder.query<any, string>({
            query: (bowlertatId) => ({
                url: `bowler-stats/${bowlertatId}`,
                method: 'GET',
                params: {
                    populate: '*'

                },
            }),
        }),

        getBowlerStatByBowlerAndInning: builder.query<any, { bowlerId: string; inningId: string }>({
            query: ({ bowlerId, inningId }) => ({
                url: 'bowler-stats',
                method: 'GET',
                params: {
                    populate: '*',
                    'filters[bowler][documentId][$eq]': bowlerId,
                    'filters[inning][documentId][$eq]': inningId,
                },
            }),
        }),

        // ✅ Add this inside your endpoints definition
        getOvers: builder.query<any, { inningId?: string } | void>({
            query: (params) => ({
                url: 'overs',
                method: 'GET',
                params: {
                    populate: '*',
                    ...(params?.inningId ? { 'filters[inning][documentId][$eq]': params.inningId } : {}),
                    sort: 'over_number:asc',
                },
            }),
        }),

        getOver: builder.query<any, string>({
            query: (id) => ({
                url: `overs/${id}`,
                method: 'GET',
                params: { populate: '*' },
            }),
        }),

        createOver: builder.mutation<any, { data: any }>({
            query: (body) => ({
                url: 'overs',
                method: 'POST',
                body,
                params: { populate: '*' },
            }),
            invalidatesTags: ['Innings'],
        }),

        updateOver: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `overs/${id}`,
                method: 'PUT',
                body: { data },
            }),
            invalidatesTags: ['Innings'],
        }),

    }),
});

export const {
    useGetInningsQuery,
    useGetInningQuery,
    useCreateInningMutation,
    useUpdateInningMutation,
    useCreatePlayerScoreMutation,
    useUpdatePlayerScoreMutation,
    useCreateBowlerStatsMutation,
    useUpdateBowlerStatsMutation,
    useGetBowlerStatQuery,
    useGetBowlerStatByBowlerAndInningQuery, 
    useLazyGetBowlerStatByBowlerAndInningQuery,

    useGetOversQuery,
    useGetOverQuery,
    useCreateOverMutation,
    useUpdateOverMutation,
} = inningApi;
