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
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const DEFAULT_TAG = { type: Tag.CLASSES_WITH_SECTIONS, id: Tag.LIST };
const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClassesWithSections: builder.query<ClassesWithSections, void | number | string>({
      query: (academicLevelId) => {
        const query = getQueryString({ academicLevelId });
        return `/classes/sections${query}`;
      },
      providesTags: (result) =>
        providesListTags(result?.classesWithSections, Tag.CLASSES_WITH_SECTIONS)
    }),
    addClass: builder.mutation<ApiResponseSuccessMessage, ClassFormProps>({
      query: (payload) => ({
        url: `/classes`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [DEFAULT_TAG]
    }),
    updateClass: builder.mutation<ApiResponseSuccessMessage, ClassFormWithId>({
      query: ({ id, ...payload }) => ({
        url: `/classes/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.CLASSES_WITH_SECTIONS, id },
        DEFAULT_TAG
      ]
    }),
    addSection: builder.mutation<ApiResponseSuccessMessage, SectionFormProps>({
      query: ({ classId, ...payload }) => ({
        url: `/classes/${classId}/sections`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [DEFAULT_TAG]
    }),
    updateSection: builder.mutation<ApiResponseSuccessMessage, SectionFormWithId>({
      query: ({ classId, id, ...payload }) => ({
        url: `/classes/${classId}/sections/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { classId: id }) => [
        { type: Tag.CLASSES_WITH_SECTIONS, id },
        DEFAULT_TAG
      ]
    }),
    getTeachers: builder.query<Teachers, void>({
      query: () => `/teachers`,
      providesTags: (result) => providesListTags(result?.teachers, Tag.TEACHERS)
    }),
    getClassTeachers: builder.query<ClassTeachers, void>({
      query: () => `/class-teachers`,
      providesTags: (result) => providesListTags(result?.classTeachers, Tag.CLASS_TEACHERS)
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
      invalidatesTags: [{ type: Tag.CLASS_TEACHERS }]
    }),
    updateClassTeacher: builder.mutation<ApiResponseSuccessMessage, ClassTeacherUpdateRequest>({
      query: ({ id, ...payload }) => ({
        url: `/class-teachers/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: Tag.CLASS_TEACHERS, id },
        { type: Tag.CLASS_TEACHERS, id: Tag.LIST }
      ]
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
