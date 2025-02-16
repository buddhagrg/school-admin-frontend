import { api, Tag } from '@/api';
import {
  ClassFormProps,
  ClassFormWithId,
  ClassSectionStructure,
  ClassTeacherFormProps,
  ClassTeachers,
  GetClassList,
  SectionFormProps,
  SectionFormWithId,
  Teachers
} from '../types';

export const classApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClassSectionStructure: builder.query<ClassSectionStructure, void>({
      query: () => `/classes/structure`,
      providesTags: [Tag.CLASS_SECTION_STRUCTURE]
    }),
    addClass: builder.mutation<{ message: string }, ClassFormProps>({
      query: (payload) => ({
        url: `/classes`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE]
    }),
    updateClass: builder.mutation<{ message: string }, ClassFormWithId>({
      query: ({ id, name }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE]
    }),
    deactivateClass: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/classes/${id}/deactivate`,
        method: 'POST'
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE, Tag.CLASSES, Tag.ACADEMIC_LEVELS_WITH_CLASSES]
    }),
    activateClass: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/classes/${id}/activate`,
        method: 'POST'
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE, Tag.CLASSES, Tag.ACADEMIC_LEVELS_WITH_CLASSES]
    }),
    getClasses: builder.query<GetClassList, void>({
      query: () => `/classes`,
      providesTags: (result) =>
        result?.classes?.map(({ id }) => {
          return { type: Tag.CLASSES, id };
        }) || [Tag.CLASSES]
    }),
    addSection: builder.mutation<{ message: string }, SectionFormProps>({
      query: ({ classId, name }) => ({
        url: `/classes/${classId}/sections`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE, Tag.CLASSES]
    }),
    updateSection: builder.mutation<{ message: string }, SectionFormWithId>({
      query: ({ classId, id, name }) => ({
        url: `/classes/${classId}/sections/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE, Tag.CLASSES]
    }),
    deactivateSection: builder.mutation<{ message: string }, Omit<SectionFormWithId, 'name'>>({
      query: ({ classId, id }) => ({
        url: `/classes/${classId}/sections/${id}/deactivate`,
        method: 'POST'
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE]
    }),
    activateSection: builder.mutation<{ message: string }, Omit<SectionFormWithId, 'name'>>({
      query: ({ classId, id }) => ({
        url: `/classes/${classId}/sections/${id}/activate`,
        method: 'POST'
      }),
      invalidatesTags: [Tag.CLASS_SECTION_STRUCTURE]
    }),
    getClassTeachers: builder.query<ClassTeachers, void>({
      query: () => `/classes/teachers`,
      providesTags: (result) =>
        result?.classTeachers?.map(({ classId }) => ({
          type: Tag.CLASS_TEACHERS,
          id: classId
        })) || [Tag.CLASS_TEACHERS]
    }),
    getTeachers: builder.query<Teachers, void>({
      query: () => `/teachers`,
      providesTags: (result) =>
        result?.teachers?.map(({ id }) => ({
          type: Tag.TEACHERS,
          id
        })) || [Tag.TEACHERS]
    }),
    assignClassTeacher: builder.mutation<
      { message: string },
      Omit<ClassTeacherFormProps, 'className'>
    >({
      query: ({ classId, teacherId }) => ({
        url: `/classes/${classId}/teachers/${teacherId}`,
        method: 'POST'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASS_TEACHERS])
    }),
    deleteClassTeacher: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/classes/teachers`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASS_TEACHERS])
    })
  })
});

export const {
  useAddClassMutation,
  useGetClassesQuery,
  useAddSectionMutation,
  useGetClassSectionStructureQuery,
  useUpdateSectionMutation,
  useUpdateClassMutation,
  useDeactivateSectionMutation,
  useActivateClassMutation,
  useDeactivateClassMutation,
  useActivateSectionMutation,
  useGetClassTeachersQuery,
  useGetTeachersQuery,
  useAssignClassTeacherMutation,
  useDeleteClassTeacherMutation
} = classApi;
