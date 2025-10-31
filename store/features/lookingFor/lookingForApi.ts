import { baseQuery } from '@/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const lookingForApi = createApi({
    reducerPath: 'lookingForApi',
    baseQuery,
    endpoints: (builder) => ({
        getLookingFors: builder.query<any, { page?: number; pageSize?: number; filters?: any }>({
            query: ({ page = 1, pageSize = 10, filters  }) => ({
                url: `looking-fors`,
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    ...(filters && filters),
                    populate: '*',
                },
            }),
        }),
        getLookingFor: builder.query<any, string>({
            query: (id) => ({
                url: `looking-fors/${id}`,
                method: 'GET',
                headers: {},
                params: {
                    populate: '*',
                },
            }),
        }),
        createLookingFor: builder.mutation<any, { data: any }>({
            query: (newLookingFor) => ({
                url: 'looking-fors',
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
