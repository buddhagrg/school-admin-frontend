import { baseApi, Tag } from '@/api';
import type { AcademicYearData, AcademicYearFormProps, AcademicYearFormPropsWithId } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const DEFAULT_TAG = { type: Tag.ACADEMIC_YEARS, id: Tag.LIST };
const academicYearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicYears: builder.query<AcademicYearData, void>({
      query: () => `/academic/years`,
      providesTags: (result) => providesListTags(result?.academicYears, Tag.ACADEMIC_YEARS)
    }),
    addAcademicYear: builder.mutation<ApiResponseSuccessMessage, AcademicYearFormProps>({
      query: (payload) => ({
        url: `/academic/years`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [DEFAULT_TAG]
    }),
    updateAcademicYear: builder.mutation<ApiResponseSuccessMessage, AcademicYearFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/academic/years/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.ACADEMIC_YEARS, id }, DEFAULT_TAG]
    })
  })
});

export const {
  useGetAcademicYearsQuery,
  useAddAcademicYearMutation,
  useUpdateAcademicYearMutation
} = academicYearApi;
