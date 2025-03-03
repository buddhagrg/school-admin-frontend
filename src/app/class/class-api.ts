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
} from './types';
import { ApiResponseSuccessMessage } from '@/types';

const classApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClassesWithSections: builder.query<ClassesWithSections, void>({
      query: () => `/classes/sections`,
      providesTags: (result) =>
        result?.classesWithSections?.map(({ id }) => ({
          type: Tag.CLASSES_WITH_SECTIONS,
          id
        })) || [Tag.CLASSES_WITH_SECTIONS]
    }),
    addClass: builder.mutation<ApiResponseSuccessMessage, ClassFormProps>({
      query: (payload) => ({
        url: `/classes`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS])
    }),
    updateClass: builder.mutation<ApiResponseSuccessMessage, ClassFormWithId>({
      query: ({ id, name }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS])
    }),
    updateClassStatus: builder.mutation<ApiResponseSuccessMessage, ClassStatusProps>({
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
    addSection: builder.mutation<ApiResponseSuccessMessage, SectionFormProps>({
      query: ({ classId, name }) => ({
        url: `/classes/${classId}/sections`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS, Tag.CLASSES])
    }),
    updateSection: builder.mutation<ApiResponseSuccessMessage, SectionFormWithId>({
      query: ({ classId, id, name }) => ({
        url: `/classes/${classId}/sections/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS, Tag.CLASSES])
    }),
    updateSectionStatus: builder.mutation<ApiResponseSuccessMessage, SectionStatusProps>({
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
      ApiResponseSuccessMessage,
      Omit<ClassTeacherFormProps, 'className'>
    >({
      query: ({ classId, teacherId }) => ({
        url: `/classes/${classId}/teachers/${teacherId}`,
        method: 'PUT'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASS_TEACHERS])
    }),
    deleteClassTeacher: builder.mutation<ApiResponseSuccessMessage, number>({
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
