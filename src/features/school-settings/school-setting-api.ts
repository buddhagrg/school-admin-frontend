import { baseApi, Tag } from '@/api';
import type { SchoolDataResponse, SchoolFormProps } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySchool: builder.query<SchoolDataResponse, void>({
      query: () => `/schools/my`,
      providesTags: (_result, error) => (error ? [] : [Tag.MY_SCHOOL])
    }),
    updateMySchool: builder.mutation<ApiResponseSuccessMessage, SchoolFormProps>({
      query: (body) => ({
        url: `/schools/my`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.MY_SCHOOL])
    })
  })
});

export const { useGetMySchoolQuery, useUpdateMySchoolMutation } = settingApi;
