import { baseApi, Tag } from '@/api';
import type {
  ClassFormProps,
  ClassesWithSections,
  ClassTeacherFormProps,
  ClassTeachers,
  SectionFormProps,
  SectionFormWithId,
  Teachers,
  ClassFormWithId,
  ClassTeacherUpdateRequest
} from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { getQueryString } from '@/utils/helpers/get-query-string';

const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassesWithSections: builder.query<ClassesWithSections, void | number | string>({
      query: (academicLevelId) => {
        const query = getQueryString({ academicLevelId });
        return `/classes/sections${query}`;
      },
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
      query: ({ id, ...payload }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : [{ type: Tag.CLASSES_WITH_SECTIONS, id }]
    }),
    addSection: builder.mutation<ApiResponseSuccessMessage, SectionFormProps>({
      query: ({ classId, ...payload }) => ({
        url: `/classes/${classId}/sections`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASSES_WITH_SECTIONS])
    }),
    updateSection: builder.mutation<ApiResponseSuccessMessage, SectionFormWithId>({
      query: ({ classId, id, ...payload }) => ({
        url: `/classes/${classId}/sections/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { classId }) =>
        error ? [] : [{ type: Tag.CLASSES_WITH_SECTIONS, id: classId }]
    }),
    getTeachers: builder.query<Teachers, void>({
      query: () => `/teachers`,
      providesTags: (result) =>
        result?.teachers?.map(({ id }) => ({
          type: Tag.TEACHERS,
          id
        })) || [Tag.TEACHERS]
    }),
    getClassTeachers: builder.query<ClassTeachers, void>({
      query: () => `/class-teachers`,
      providesTags: (result) =>
        result?.classTeachers?.map(({ id }) => ({
          type: Tag.CLASS_TEACHERS,
          id
        })) || [Tag.CLASS_TEACHERS]
    }),
    assignClassTeacher: builder.mutation<
      ApiResponseSuccessMessage,
      Omit<ClassTeacherFormProps, 'className'>
    >({
      query: (payload) => ({
        url: `/class-teachers/assign`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.CLASS_TEACHERS])
    }),
    updateClassTeacher: builder.mutation<ApiResponseSuccessMessage, ClassTeacherUpdateRequest>({
      query: ({ id, ...payload }) => ({
        url: `/class-teachers/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.CLASS_TEACHERS, id }])
    })
  })
});

export const {
  useAddClassMutation,
  useAddSectionMutation,
  useGetClassesWithSectionsQuery,
  useUpdateSectionMutation,
  useUpdateClassMutation,
  useGetClassTeachersQuery,
  useGetTeachersQuery,
  useAssignClassTeacherMutation,
  useUpdateClassTeacherMutation
} = classApi;
