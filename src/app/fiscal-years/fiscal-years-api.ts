import { api, Tag } from '@/api';
import { FiscalYearData, FiscalYearFormProps, FiscalYearFormPropsWithId } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const fiscalYearApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFiscalYears: builder.query<FiscalYearData, void>({
      query: () => `/fiscal-years`,
      providesTags: (result, error) =>
        error
          ? []
          : result?.fiscalYears?.map(({ id }) => ({
              type: Tag.FISCAL_YEARS,
              id
            })) || [Tag.FISCAL_YEARS]
    }),
    addFiscalYear: builder.mutation<ApiResponseSuccessMessage, FiscalYearFormProps>({
      query: (payload) => ({
        url: `/fiscal-years`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.FISCAL_YEARS])
    }),
    updateFiscalYear: builder.mutation<ApiResponseSuccessMessage, FiscalYearFormPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/fiscal-years/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.FISCAL_YEARS, id }])
    }),
    activateFiscalYear: builder.mutation<ApiResponseSuccessMessage, number>({
      query: (id) => ({
        url: `/fiscal-years/${id}/activate`,
        method: 'PATCH'
      }),
      invalidatesTags: (_result, error, id) => (error ? [] : [{ type: Tag.FISCAL_YEARS, id }])
    })
  })
});

export const {
  useGetFiscalYearsQuery,
  useAddFiscalYearMutation,
  useUpdateFiscalYearMutation,
  useActivateFiscalYearMutation
} = fiscalYearApi;
