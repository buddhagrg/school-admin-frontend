import { baseApi, Tag } from '@/api';
import type {
  AcademicLevelFormProps,
  AcademicLevelFormWithId,
  AcademicLevelsData,
  AcademicPeriodFormProps,
  AcademicPeriodFormWithId,
  AcademicPeriodsData,
  LevelPeriodProps,
  ManagePeriodOrder
} from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';

const levelsPeriodsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicLevels: builder.query<AcademicLevelsData, void>({
      query: () => `/academic/levels`,
      providesTags: (result) =>
        result?.academicLevels.map(({ id }) => ({ type: Tag.ACADEMIC_LEVELS, id })) || [
          Tag.ACADEMIC_LEVELS
        ]
    }),
    addAcademicLevel: builder.mutation<ApiResponseSuccessMessage, AcademicLevelFormProps>({
      query: ({ name }) => ({
        url: '/academic/levels',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS])
    }),
    updateAcademicLevel: builder.mutation<ApiResponseSuccessMessage, AcademicLevelFormWithId>({
      query: ({ id, name }) => ({
        url: `/academic/levels/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: Tag.ACADEMIC_LEVELS, id }]
    }),
    deleteAcademicLevel: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/academic/levels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS])
    }),
    getAcademicPeriods: builder.query<AcademicPeriodsData, number>({
      query: (id) => `/academic/levels/${id}/periods`,
      providesTags: (_result, error, id) => (error ? [] : [{ type: Tag.ACADEMIC_PERIODS, id }])
    }),
    addAcademicPeriod: builder.mutation<ApiResponseSuccessMessage, AcademicPeriodFormProps>({
      query: ({ academicLevelId, ...payload }) => ({
        url: `/academic/levels/${academicLevelId}/periods`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error, { academicLevelId: id }) =>
        error ? [] : [{ type: Tag.ACADEMIC_PERIODS, id }]
    }),
    updateAcademicPeriod: builder.mutation<ApiResponseSuccessMessage, AcademicPeriodFormWithId>({
      query: ({ id, academicLevelId, ...payload }) => ({
        url: `/academic/levels/${academicLevelId}/periods/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { academicLevelId: id }) =>
        error ? [] : [{ type: Tag.ACADEMIC_PERIODS, id }]
    }),
    deleteAcademicPeriod: builder.mutation<ApiResponseSuccessMessage, LevelPeriodProps>({
      query: ({ id, academicLevelId }) => ({
        url: `/academic/levels/${academicLevelId}/periods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.ACADEMIC_PERIODS, Tag.ACADEMIC_LEVELS]
    }),
    reorderPeriods: builder.mutation<ApiResponseSuccessMessage, ManagePeriodOrder>({
      query: ({ academicLevelId, periods }) => ({
        url: `/academic/levels/${academicLevelId}/periods/reorder`,
        method: 'POST',
        body: { periods }
      }),
      invalidatesTags: (_result, error, { academicLevelId: id }) =>
        error ? [] : [{ type: Tag.ACADEMIC_PERIODS, id }]
    })
  })
});

export const {
  useAddAcademicLevelMutation,
  useAddAcademicPeriodMutation,
  useGetAcademicLevelsQuery,
  useUpdateAcademicLevelMutation,
  useUpdateAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
  useReorderPeriodsMutation,
  useDeleteAcademicLevelMutation,
  useGetAcademicPeriodsQuery
} = levelsPeriodsApi;
