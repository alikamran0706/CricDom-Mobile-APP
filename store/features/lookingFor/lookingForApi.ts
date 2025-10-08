import { baseQuery } from '@/app/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const lookingForApi = createApi({
    reducerPath: 'lookingForApi',
    baseQuery,
    endpoints: (builder) => ({
        getLookingFors: builder.query<any, { page?: number; pageSize?: number; creatorId?: string }>({
            query: ({ page = 1, pageSize = 10, creatorId  }) => ({
                url: `lookingFors`,
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    ...(creatorId && { 'filters[creator][[documentId]][$eq]': creatorId }),
                },
            }),
        }),
        getLookingFor: builder.query<any, string>({
            query: (id) => ({
                url: `lookingFors/${id}`,
                method: 'GET',
                headers: {},
                params: {
                    populate: '*',
                },
            }),
        }),
        createLookingFor: builder.mutation<any, { data: any }>({
            query: (newLookingFor) => ({
                url: 'lookingFors',
                method: 'POST',
                body: newLookingFor,
            }),
        }),
    }),
});

export const {
    useGetLookingForsQuery,
    useGetLookingForQuery,
    useLazyGetLookingForQuery,
    useCreateLookingForMutation,
} = lookingForApi;
