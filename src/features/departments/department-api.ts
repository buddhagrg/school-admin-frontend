import { baseApi, Tag } from '@/api';
import type { DepartmentData, DepartmentFormProps, DepartmentFormPropsWithId } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const DEFAULT_TAG = { type: Tag.DEPARTMENTS, id: Tag.LIST };
const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentData, void>({
      query: () => `/departments`,
      providesTags: (result) => providesListTags(result?.departments, Tag.DEPARTMENTS)
    }),
    addNewDepartment: builder.mutation<ApiResponseSuccessMessage, DepartmentFormProps>({
      query: ({ name }) => ({
        url: `/departments`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: [DEFAULT_TAG]
    }),
    updateDepartment: builder.mutation<ApiResponseSuccessMessage, DepartmentFormPropsWithId>({
      query: ({ id, name }) => ({
        url: `/departments/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.DEPARTMENTS, id }, DEFAULT_TAG]
    }),
    deleteDepartment: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: Tag.DEPARTMENTS, id }, DEFAULT_TAG]
    })
  })
});

export const {
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useAddNewDepartmentMutation
} = departmentApi;
