import { api, Tag } from '@/api';
import {
  AcademicLevelData,
  AcademicLevelFormProps,
  AcademicLevelFormWithId,
  AcademicPeriodFormProps,
  AcademicPeriodFormWithId,
  AcademicStructure,
  ManagePeriodOrder
} from '../types';

export const academicStructureApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicStructure: builder.query<AcademicStructure, void>({
      query: () => `/academic-structure`,
      providesTags: (result) =>
        result?.academicStructure.map(({ id }) => ({
          type: Tag.ACADEMIC_STRUCTURE,
          id
        })) || [Tag.ACADEMIC_STRUCTURE]
    }),
    addAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormProps>({
      query: ({ name }) => ({
        url: '/academic-levels',
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_LEVELS]
    }),
    updateAcademicLevel: builder.mutation<{ message: string }, AcademicLevelFormWithId>({
      query: ({ id, name }) => ({
        url: `/academic-levels/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_LEVELS]
    }),
    getAcademicLevels: builder.query<AcademicLevelData, void>({
      query: () => `/academic-levels`,
      providesTags: (result) =>
        result?.academicLevels.map(({ id }) => ({ type: Tag.ACADEMIC_LEVELS, id })) || [
          Tag.ACADEMIC_LEVELS
        ]
    }),
    addAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormProps>({
      query: (payload) => ({
        url: '/academic-periods',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_PERIODS]
    }),
    updatedAcademicPeriod: builder.mutation<{ message: string }, AcademicPeriodFormWithId>({
      query: ({ id, ...payload }) => ({
        url: `/academic-periods/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_PERIODS]
    }),
    deleteAcademicPeriod: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic-periods/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_PERIODS]
    }),
    updatePeriodOrder: builder.mutation<{ message: string }, ManagePeriodOrder>({
      query: ({ academicLevelId, periods }) => ({
        url: `/academic-periods/${academicLevelId}/manage-order`,
        method: 'POST',
        body: [...periods]
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE]
    }),
    deleteAcademicLevel: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/academic-levels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [Tag.ACADEMIC_STRUCTURE, Tag.ACADEMIC_LEVELS]
    })
  })
});

export const {
  useAddAcademicLevelMutation,
  useAddAcademicPeriodMutation,
  useGetAcademicLevelsQuery,
  useGetAcademicStructureQuery,
  useUpdateAcademicLevelMutation,
  useUpdatedAcademicPeriodMutation,
  useDeleteAcademicPeriodMutation,
  useUpdatePeriodOrderMutation,
  useDeleteAcademicLevelMutation
} = academicStructureApi;
