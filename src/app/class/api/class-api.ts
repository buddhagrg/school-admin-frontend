import { api, Tag } from '@/api';
import {
  ClassFormProps,
  ClassFormWithId,
  ClassesWithSections,
  ClassTeacherFormProps,
  ClassTeachers,
  GetClassList,
  SectionFormProps,
  SectionFormWithId,
  Teachers,
  ClassStatusProps,
  SectionStatusProps
} from '../types';

export const classApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClassesWithSections: builder.query<ClassesWithSections, void>({
      query: () => `/classes/sections`,
      providesTags: (result) =>
        result?.classesWithSections?.map(({ id }) => ({
          type: Tag.CLASSES_WITH_SECTIONS,
          id
        })) || [Tag.CLASSES_WITH_SECTIONS]
    }),
    addClass: builder.mutation<{ message: string }, ClassFormProps>({
      query: (payload) => ({
        url: `/classes`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS])
    }),
    updateClass: builder.mutation<{ message: string }, ClassFormWithId>({
      query: ({ id, name }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS])
    }),
    updateClassStatus: builder.mutation<{ message: string }, ClassStatusProps>({
      query: ({ id, status }) => ({
        url: `/classes/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.CLASSES_WITH_SECTIONS, Tag.CLASSES, Tag.ACADEMIC_LEVELS_WITH_CLASSES]
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
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS, Tag.CLASSES])
    }),
    updateSection: builder.mutation<{ message: string }, SectionFormWithId>({
      query: ({ classId, id, name }) => ({
        url: `/classes/${classId}/sections/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS, Tag.CLASSES])
    }),
    updateSectionStatus: builder.mutation<{ message: string }, SectionStatusProps>({
      query: ({ classId, status, id }) => ({
        url: `/classes/${classId}/sections/${id}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS])
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
        method: 'PUT'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASS_TEACHERS])
    }),
    deleteClassTeacher: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/classes/teachers/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASS_TEACHERS])
    })
  })
});

export const {
  useAddClassMutation,
  useGetClassesQuery,
  useAddSectionMutation,
  useGetClassesWithSectionsQuery,
  useUpdateSectionMutation,
  useUpdateClassMutation,
  useUpdateSectionStatusMutation,
  useUpdateClassStatusMutation,
  useGetClassTeachersQuery,
  useGetTeachersQuery,
  useAssignClassTeacherMutation,
  useDeleteClassTeacherMutation
} = classApi;
