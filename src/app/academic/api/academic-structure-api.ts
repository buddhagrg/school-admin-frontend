import { api, Tag } from '@/api';
import {
  AcademicLevelData,
  AcademicLevelFormProps,
  AcademicLevelFormWithId,
  AcademicLevelsWithClasses,
  AcademicPeriodFormProps,
  AcademicPeriodFormWithId,
  AcademicStructure,
  AddAcademicLevelToClass,
  ManagePeriodOrder
} from '../types';

export const academicStructureApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicStructure: builder.query<AcademicStructure, void>({
      query: () => `/academic/structure`,
      providesTags: (result) =>
        result?.academicStructure.map(({ id }) => ({
          type: Tag.ACADEMIC_STRUCTURE,
          id
        })) || [Tag.ACADEMIC_STRUCTURE]
    }),
    addAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormProps>({
      query: ({ name }) => ({
        url: '/academic/levels',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: [
        Tag.ACADEMIC_STRUCTURE,
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
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_LEVELS]
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
      invalidatesTags: [
        Tag.ACADEMIC_STRUCTURE,
        Tag.ACADEMIC_LEVELS,
        Tag.ACADEMIC_LEVELS_WITH_CLASSES
      ]
    }),
    getAcademicLevelsWithClasses: builder.query<AcademicLevelsWithClasses, void>({
      query: () => `/academic/levels/classes`,
      providesTags: (result) =>
        result?.levelClass.map(({ id }) => {
          return { type: Tag.ACADEMIC_LEVELS_WITH_CLASSES, id };
        }) || [Tag.ACADEMIC_LEVELS_WITH_CLASSES]
    }),
    deleteLevelFromClass: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic/levels/classes/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [Tag.ACADEMIC_LEVELS_WITH_CLASSES]
    }),
    addAcademicLevelToClass: builder.mutation<{ message: string }, AddAcademicLevelToClass>({
      query: ({ id, academicLevelId }) => ({
        url: `/academic/levels/${academicLevelId}/classes/${id}`,
        method: 'POST'
      }),
      invalidatesTags: (result) => (result ? [Tag.ACADEMIC_LEVELS_WITH_CLASSES] : [])
    }),
    addAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormProps>({
      query: (payload) => ({
        url: `/academic/periods`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_PERIODS]
    }),
    updateAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormWithId>({
      query: ({ id, name, academicLevelId }) => ({
        url: `/academic/periods/${id}`,
        method: 'PUT',
        body: { name, academicLevelId }
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_PERIODS]
    }),
    deleteAcademicPeriod: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic/periods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_PERIODS]
    }),
    updatePeriodOrder: builder.mutation<{ message: string }, ManagePeriodOrder>({
      query: ({ academicLevelId, periods }) => ({
        url: `/academic/periods/${academicLevelId}/manage-order`,
        method: 'POST',
        body: [...periods]
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE]
    })
  })
});

export const {
  useAddAcademicLevelMutation,
  useAddAcademicPeriodMutation,
  useGetAcademicLevelsQuery,
  useGetAcademicStructureQuery,
  useUpdateAcademicLevelMutation,
  useUpdateAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
  useUpdatePeriodOrderMutation,
  useDeleteAcademicLevelMutation,
  useGetAcademicLevelsWithClassesQuery,
  useDeleteLevelFromClassMutation,
  useAddAcademicLevelToClassMutation
} = academicStructureApi;
