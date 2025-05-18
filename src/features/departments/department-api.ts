import { baseApi, Tag } from '@/api';
import type { DepartmentData, DepartmentFormProps, DepartmentFormPropsWithId } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';

const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentData, void>({
      query: () => `/departments`,
      providesTags: (result) =>
        result?.departments?.map(({ id }) => {
          return { type: Tag.DEPARTMENTS, id };
        }) || [{ type: Tag.DEPARTMENTS }]
    }),
    addNewDepartment: builder.mutation<ApiResponseSuccessMessage, DepartmentFormProps>({
      query: ({ name }) => ({
        url: `/departments`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.DEPARTMENTS])
    }),
    updateDepartment: builder.mutation<ApiResponseSuccessMessage, DepartmentFormPropsWithId>({
      query: ({ id, name }) => ({
        url: `/departments/${id}`,
        method: 'PUT',
        body: { name }
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.DEPARTMENTS, id }])
    }),
    deleteDepartment: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.DEPARTMENTS])
    })
  })
});

export const {
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useAddNewDepartmentMutation
} = departmentApi;
