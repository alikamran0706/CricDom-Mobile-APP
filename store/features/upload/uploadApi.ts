import { baseQuery } from '@/app/services/api';
import { prepareImageForUpload } from '@/lib/utils/uploadImageToForm';
import { createApi, FetchBaseQueryError, } from '@reduxjs/toolkit/query/react';

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery, 
    endpoints: (builder) => ({
        uploadFile: builder.mutation<any, { image: string }>({
            async queryFn({ image }, _queryApi, _extraOptions, baseQuery) {
                try {
                    const formData = prepareImageForUpload(image);

                    const result = await baseQuery({
                        url: 'upload',
                        method: 'POST',
                        body: formData,
                    });

                    if (result.error) {
                        return { error: result.error as FetchBaseQueryError };
                    }

                    return { data: result.data };
                } catch (err) {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            data: err,
                        } as FetchBaseQueryError,
                    };
                }
            },
        }),
    }),
});

export const { useUploadFileMutation } = uploadApi;
