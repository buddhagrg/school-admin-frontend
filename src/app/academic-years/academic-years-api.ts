import { api, Tag } from '@/api';
import { AcademicYearData, AcademicYearFormProps, AcademicYearFormPropsWithId } from './types';

const academicYearApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicYears: builder.query<AcademicYearData, void>({
      query: () => `/academic/years`,
      providesTags: (result, error) =>
        error
          ? []
          : result?.academicYears?.map(({ id }) => ({
              type: Tag.ACADEMIC_YEARS,
              id
            })) || [Tag.ACADEMIC_YEARS]
    }),
    addAcademicYear: builder.mutation<{ message: string }, AcademicYearFormProps>({
      query: (payload) => ({
        url: `/academic/years`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_YEARS])
    }),
    updateAcademicYear: builder.mutation<{ message: string }, AcademicYearFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/academic/years/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.ACADEMIC_YEARS, id }])
    }),
    activateAcademicYear: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `academic/years/${id}/activate`,
        method: 'PATCH'
      }),
      invalidatesTags: (_result, error, id) => (error ? [] : [{ type: Tag.ACADEMIC_YEARS, id }])
    })
  })
});

export const {
  useGetAcademicYearsQuery,
  useAddAcademicYearMutation,
  useUpdateAcademicYearMutation,
  useActivateAcademicYearMutation
} = academicYearApi;
