import { api, Tag } from '@/api';
import { DepartmentData, DepartmentForm, DepartmentFormWithId } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const departmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<DepartmentData, void>({
      query: () => `/departments`,
      providesTags: (result) =>
        result?.departments?.map(({ id }) => {
          return { type: Tag.DEPARTMENTS, id };
        }) || [{ type: Tag.DEPARTMENTS }]
    }),
    addNewDepartment: builder.mutation<ApiResponseSuccessMessage, DepartmentForm>({
      query: ({ name }) => ({
        url: `/departments`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.DEPARTMENTS])
    }),
    getDepartment: builder.query<DepartmentFormWithId, number>({
      query: (id) => `departments/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.DEPARTMENTS, id: result.id }] : [])
    }),
    updateDepartment: builder.mutation<ApiResponseSuccessMessage, DepartmentFormWithId>({
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
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useAddNewDepartmentMutation
} = departmentApi;
