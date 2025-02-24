import { api, Tag } from '@/api';
import {
  AcademicLevelData,
  AcademicLevelFormProps,
  AcademicLevelFormWithId,
  AcademicLevelsWithClasses,
  AcademicPeriodFormProps,
  AcademicPeriodFormWithId,
  AcademicLevelsWithPeriods,
  AddClassToAcademicLevel,
  ManagePeriodOrder
} from '../types';

export const academicStructureApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicLevelsWithPeriods: builder.query<AcademicLevelsWithPeriods, void>({
      query: () => `/academic/levels/periods`,
      providesTags: (result) =>
        result?.levelsWithPeriods.map(({ id }) => ({
          type: Tag.ACADEMIC_LEVELS_WITH_PERIODS,
          id
        })) || [Tag.ACADEMIC_LEVELS_WITH_PERIODS]
    }),
    addAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormProps>({
      query: ({ name }) => ({
        url: '/academic/levels',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (_result, error) =>
        error
          ? []
          : [
              Tag.ACADEMIC_LEVELS_WITH_PERIODS,
              Tag.ACADEMIC_LEVELS,
              Tag.ACADEMIC_LEVELS_WITH_CLASSES
            ]
    }),
    updateAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormWithId>({
      query: ({ id, name }) => ({
        url: `/academic/levels/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.ACADEMIC_LEVELS_WITH_PERIODS, Tag.ACADEMIC_LEVELS]
    }),
    getAcademicLevels: builder.query<AcademicLevelData, void>({
      query: () => `/academic/levels`,
      providesTags: (result) =>
        result?.academicLevels.map(({ id }) => ({ type: Tag.ACADEMIC_LEVELS, id })) || [
          Tag.ACADEMIC_LEVELS
        ]
    }),
    deleteAcademicLevel: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic/levels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) =>
        error
          ? []
          : [
              Tag.ACADEMIC_LEVELS_WITH_PERIODS,
              Tag.ACADEMIC_LEVELS,
              Tag.ACADEMIC_LEVELS_WITH_CLASSES
            ]
    }),
    getAcademicLevelsWithClasses: builder.query<AcademicLevelsWithClasses, void>({
      query: () => `/academic/levels/classes`,
      providesTags: (result) =>
        result?.levelsWithClasses.map(({ id }) => {
          return { type: Tag.ACADEMIC_LEVELS_WITH_CLASSES, id };
        }) || [Tag.ACADEMIC_LEVELS_WITH_CLASSES]
    }),
    deleteLevelFromClass: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic/levels/classes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS_WITH_CLASSES])
    }),
    addClassToAcademicLevel: builder.mutation<{ message: string }, AddClassToAcademicLevel>({
      query: ({ classId, academicLevelId }) => ({
        url: `/academic/levels/${academicLevelId}/classes`,
        method: 'PUT',
        body: { classId }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS_WITH_CLASSES])
    }),
    addAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormProps>({
      query: (payload) => ({
        url: `/academic/periods`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.ACADEMIC_LEVELS_WITH_PERIODS, Tag.ACADEMIC_PERIODS]
    }),
    updateAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormWithId>({
      query: ({ id, name, academicLevelId }) => ({
        url: `/academic/periods/${id}`,
        method: 'PUT',
        body: { name, academicLevelId }
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.ACADEMIC_LEVELS_WITH_PERIODS, Tag.ACADEMIC_PERIODS]
    }),
    deleteAcademicPeriod: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic/periods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.ACADEMIC_LEVELS_WITH_PERIODS, Tag.ACADEMIC_PERIODS]
    }),
    reorderPeriods: builder.mutation<{ message: string }, ManagePeriodOrder>({
      query: ({ academicLevelId, periods }) => ({
        url: `/academic/periods/${academicLevelId}/reorder`,
        method: 'POST',
        body: [...periods]
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_LEVELS_WITH_PERIODS])
    })
    //academic/levels/:id/periods/dates
  })
});

export const {
  useAddAcademicLevelMutation,
  useAddAcademicPeriodMutation,
  useGetAcademicLevelsQuery,
  useGetAcademicLevelsWithPeriodsQuery,
  useUpdateAcademicLevelMutation,
  useUpdateAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
  useReorderPeriodsMutation,
  useDeleteAcademicLevelMutation,
  useGetAcademicLevelsWithClassesQuery,
  useDeleteLevelFromClassMutation,
  useAddClassToAcademicLevelMutation
} = academicStructureApi;
