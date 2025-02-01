import { api, Tag } from '@/api';
import {
  AcademicLevelData,
  AcademicLevelFormProps,
  AcademicLevelFormWithId,
  AcademicLevelsWithPeriods,
  AcademicPeriodFormProps,
  AcademicPeriodFormWithId,
  ManagePeriodOrder
} from '../types';

export const academicLevelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicLevelsWithPeriods: builder.query<AcademicLevelsWithPeriods, void>({
      query: () => `academic-levels/periods`,
      providesTags: (result) =>
        result?.academicLevelsWithPeriods.map(({ id }) => ({
          type: Tag.ACADEMIC_LEVELS_WITH_PERIODS,
          id
        })) || [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    }),
    addAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormProps>({
      query: ({ name }) => ({
        url: '/academic-levels',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    }),
    updateAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormWithId>({
      query: ({ id, name }) => ({
        url: `/academic-levels/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    }),
    getAcademicLevels: builder.query<AcademicLevelData, void>({
      query: () => `/academic-levels`,
      providesTags: (result) =>
        result?.academicLevels.map(({ id }) => ({ type: Tag.ACADEMIC_LEVELS, id })) || [
          { type: Tag.ACADEMIC_LEVELS }
        ]
    }),
    addAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormProps>({
      query: (payload) => ({
        url: '/academic-periods',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    }),
    updatedAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormWithId>({
      query: ({ id, ...payload }) => ({
        url: `/academic-periods/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    }),
    deleteAcademicPeriod: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic-periods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    }),
    updatePeriodOrder: builder.mutation<{ message: string }, ManagePeriodOrder>({
      query: ({ academicLevelId, periods }) => ({
        url: `/academic-periods/${academicLevelId}/manage-order`,
        method: 'POST',
        body: [...periods]
      }),
      invalidatesTags: [{ type: Tag.ACADEMIC_LEVELS_WITH_PERIODS }]
    })
  })
});

export const {
  useAddAcademicLevelMutation,
  useAddAcademicPeriodMutation,
  useGetAcademicLevelsQuery,
  useGetAcademicLevelsWithPeriodsQuery,
  useUpdateAcademicLevelMutation,
  useUpdatedAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
  useUpdatePeriodOrderMutation
} = academicLevelApi;
