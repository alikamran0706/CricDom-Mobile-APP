import { baseQuery } from '@/app/services/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const communityApi = createApi({
    reducerPath: 'communityApi',
    baseQuery,
    endpoints: (builder) => ({
        getCommunities: builder.query<any, { page?: number; pageSize?: number; creatorId?: string }>({
            query: ({ page = 1, pageSize = 10, creatorId  }) => ({
                url: `communities`,
                params: {
                    'pagination[page]': page,
                    'pagination[pageSize]': pageSize,
                    ...(creatorId && { 'filters[creator][[documentId]][$eq]': creatorId }),
                },
            }),
        }),
        getCommunity: builder.query<any, string>({
            query: (id) => ({
                url: `communities/${id}`,
                method: 'GET',
                headers: {},
                params: {
                    populate: '*',
                },
            }),
        }),
        createCommunity: builder.mutation<any, { data: any }>({
            query: (newCommunity) => ({
                url: 'communities',
                method: 'POST',
                body: newCommunity,
            }),
        }),
         updateCommunity: builder.mutation<any, { id: string; data: any }>({
            query: ({ id, data }) => ({
                url: `communities/${id}`,
                method: 'PUT',
                body: { data },
            }),
        }),
    }),
});

export const {
    useGetCommunitiesQuery,
    useGetCommunityQuery,
    useLazyGetCommunityQuery,
    useCreateCommunityMutation,
    useUpdateCommunityMutation,
} = communityApi;
