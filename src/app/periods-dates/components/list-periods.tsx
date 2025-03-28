import React, { useEffect } from 'react';
import { Box, Button, FormControl, Grid2, Paper, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import {
  useGetAcademicLevelPeriodsWithDatesQuery,
  useUpdatePeriodsDatesMutation
} from '../periods-dates-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '@/components/errors';
import { API_DATE_FORMAT, DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { PageContentHeader } from '@/components/page-content-header';
import { PeriodDateFormProps, PeriodsDatesFormSchema } from '../types';
import { NameIdType } from '@/types';

type ListPeriodsProps = {
  levelDetail: NameIdType;
};
export const ListPeriods: React.FC<ListPeriodsProps> = ({ levelDetail }) => {
  const { data, isLoading, isError, error } = useGetAcademicLevelPeriodsWithDatesQuery(
    levelDetail.id,
    {
      skip: Number(levelDetail.id) === 0
    }
  );
  const [updatePeriodsDates, { isLoading: isUpdating }] = useUpdatePeriodsDatesMutation();
  const { control, reset, trigger, handleSubmit } = useForm<PeriodDateFormProps>({
    defaultValues: [],
    resolver: zodResolver(PeriodsDatesFormSchema)
  });

  useEffect(() => {
    if (data?.periodsWithDates) {
      reset(data.periodsWithDates);
    }
  }, [data?.periodsWithDates, reset]);

  if (isLoading) {
    return <>loading...</>;
  }
  if (isError) {
    return <>{getErrorMsg(error).message}</>;
  }
  if (!data || data?.periodsWithDates?.length <= 0) {
    return <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
  }

  const DatePickerField = ({
    name,
    label
  }: {
    name: `${number}.startDate` | `${number}.endDate`;
    label: string;
  }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            format={DATE_FORMAT}
            value={value ? (typeof value === 'string' ? parseISO(value) : value) : null}
            onChange={async (newValue) => {
              onChange(newValue);
              await trigger();
            }}
            slotProps={{
              textField: {
                size: 'small',
                error: Boolean(error),
                helperText: error?.message,
                InputLabelProps: { shrink: true }
              }
            }}
          />
        )}
      />
    );
  };
  const onSave = async (data: PeriodDateFormProps) => {
    try {
      const periodsDates = data.map(({ id, startDate, endDate }) => ({
        id,
        startDate: getFormattedDate(startDate, API_DATE_FORMAT),
        endDate: getFormattedDate(endDate, API_DATE_FORMAT)
      }));
      const payload = { periodsDates, academicLevelId: levelDetail.id };
      const result = await updatePeriodsDates(payload).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader title={`Periods with dates of "${levelDetail.name}"`} />
      <Box component={'hr'} sx={{ mb: 1 }} />
      <Box sx={{ p: 2 }} component={Paper}>
        {data.periodsWithDates.map(({ id, name }, index) => (
          <Box key={id}>
            <Typography variant='body2' sx={{ mb: 1 }}>
              {name}
            </Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }} sx={{ mb: 2 }}>
                <FormControl fullWidth size='small'>
                  <DatePickerField
                    name={`${index}.startDate` as `${number}.startDate`}
                    label='Start Date'
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth size='small'>
                  <DatePickerField
                    name={`${index}.endDate` as `${number}.endDate`}
                    label='End Date'
                  />
                </FormControl>
              </Grid2>
            </Grid2>
          </Box>
        ))}
        <Box sx={{ display: 'flex' }}>
          <Button
            size='small'
            variant='contained'
            color='primary'
            onClick={handleSubmit(onSave)}
            sx={{ mt: 3, ml: 'auto' }}
            loading={isUpdating}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};
