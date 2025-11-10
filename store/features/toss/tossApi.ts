import { baseQuery } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const tossApi = createApi({
    reducerPath: 'tossApi',
    baseQuery,
    endpoints: (builder) => ({
        getTosses: builder.query<any, { page?: number; pageSize?: number; filters?: any }>({
            query: ({ page = 1, pageSize = 10, filters }) => ({
                url: `tosses`,
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    ...(filters && filters),
                    'sort': 'createdAt:desc',
                    populate: '*',
                },
            }),
        }),
        getToss: builder.query<any, string>({
            query: (id) => ({
                url: `tosses/${id}`,
                method: 'GET',
                headers: {},
                params: {
                    populate: '*',
                },
            }),
        }),
        createToss: builder.mutation<any, { data: any }>({
            query: (newToss) => ({
                url: 'tosses',
                method: 'POST',
                body: newToss,
                params: {
                    populate: '*',
                },
            }),
        }),
        updateToss: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `tosses/${id}`,
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
    useGetTossesQuery,
    useGetTossQuery,
    useLazyGetTossQuery,
    useCreateTossMutation,
    useUpdateTossMutation,
} = tossApi;
