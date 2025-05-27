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
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const levelsPeriodsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicLevels: builder.query<AcademicLevelsData, void>({
      query: () => `/academic/levels`,
      providesTags: (result) => providesListTags(result?.academicLevels, Tag.ACADEMIC_LEVELS)
    }),
    addAcademicLevel: builder.mutation<ApiResponseSuccessMessage, AcademicLevelFormProps>({
      query: ({ name }) => ({
        url: '/academic/levels',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS }]
    }),
    updateAcademicLevel: builder.mutation<ApiResponseSuccessMessage, AcademicLevelFormWithId>({
      query: ({ id, name }) => ({
        url: `/academic/levels/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.ACADEMIC_LEVELS, id },
        { type: Tag.ACADEMIC_LEVELS, id: Tag.LIST }
      ]
    }),
    deleteAcademicLevel: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/academic/levels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: Tag.ACADEMIC_LEVELS, id },
        { type: Tag.ACADEMIC_LEVELS, id: Tag.LIST }
      ]
    }),
    getAcademicPeriods: builder.query<AcademicPeriodsData, number>({
      query: (levelId) => `/academic/levels/${levelId}/periods`,
      providesTags: (result, _error, levelId) => [
        ...(result?.academicPeriods?.map(({ id }) => ({
          type: Tag.ACADEMIC_PERIODS,
          id
        })) || []),
        { type: Tag.ACADEMIC_PERIODS, id: `LIST-${levelId}` }
      ]
    }),
    addAcademicPeriod: builder.mutation<ApiResponseSuccessMessage, AcademicPeriodFormProps>({
      query: ({ academicLevelId, ...payload }) => ({
        url: `/academic/levels/${academicLevelId}/periods`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, _error, { academicLevelId }) => [
        { type: Tag.ACADEMIC_PERIODS, id: `LIST-${academicLevelId}` }
      ]
    }),
    updateAcademicPeriod: builder.mutation<ApiResponseSuccessMessage, AcademicPeriodFormWithId>({
      query: ({ id, academicLevelId, ...payload }) => ({
        url: `/academic/levels/${academicLevelId}/periods/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id: periodId, academicLevelId }) => [
        { type: Tag.ACADEMIC_PERIODS, id: periodId },
        { type: Tag.ACADEMIC_PERIODS, id: `LIST-${academicLevelId}` }
      ]
    }),
    deleteAcademicPeriod: builder.mutation<ApiResponseSuccessMessage, LevelPeriodProps>({
      query: ({ id, academicLevelId }) => ({
        url: `/academic/levels/${academicLevelId}/periods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, { id: periodId, academicLevelId }) => [
        { type: Tag.ACADEMIC_PERIODS, id: periodId },
        { type: Tag.ACADEMIC_PERIODS, id: `LIST-${academicLevelId}` }
      ]
    }),
    reorderPeriods: builder.mutation<ApiResponseSuccessMessage, ManagePeriodOrder>({
      query: ({ academicLevelId, periods }) => ({
        url: `/academic/levels/${academicLevelId}/periods/reorder`,
        method: 'POST',
        body: { periods }
      }),
      invalidatesTags: (_result, _error, { academicLevelId }) => [
        { type: Tag.ACADEMIC_PERIODS, id: `LIST-${academicLevelId}` }
      ]
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
