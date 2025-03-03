import { api, Tag } from '@/api';
import { PeriodDateFormPropsWithLevelId, PeriodsWithDatesData } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const periodsDatesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicLevelPeriodsWithDates: builder.query<PeriodsWithDatesData, number>({
      query: (id) => `/academic/levels/${id}/periods/dates`,
      providesTags: (result, error) =>
        error
          ? []
          : result?.periodsWithDates?.map(({ id }) => ({
              type: Tag.ACADEMIC_PERIODS_WITH_DATES,
              id
            })) || [Tag.ACADEMIC_PERIODS_WITH_DATES]
    }),
    updatePeriodsDates: builder.mutation<ApiResponseSuccessMessage, PeriodDateFormPropsWithLevelId>(
      {
        query: ({ academicLevelId, periodsDates }) => ({
          url: `/academic/levels/${academicLevelId}/periods/dates`,
          method: 'PUT',
          body: { periodsDates }
        }),
        invalidatesTags: (_result, error) => (error ? [] : [Tag.ACADEMIC_PERIODS_WITH_DATES])
      }
    )
  })
});

export const { useGetAcademicLevelPeriodsWithDatesQuery, useUpdatePeriodsDatesMutation } =
  periodsDatesApi;
