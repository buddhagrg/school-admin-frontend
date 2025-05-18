import React from 'react';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';

import type { AcademicPeriodFormProps } from '../../types';
import { useGetAcademicLevelsQuery } from '../../levels-periods-api';
import { DATE_FORMAT } from '@/utils/helpers/date';
import { skipToken } from '@reduxjs/toolkit/query';

type PeriodFormProps = {
  methods: UseFormReturn<AcademicPeriodFormProps>;
  action: 'add' | 'update';
};

const dateFields: Array<{ name: 'startDate' | 'endDate'; label: string }> = [
  { name: 'startDate', label: 'Start Date' },
  { name: 'endDate', label: 'End Date' }
];
export const PeriodForm: React.FC<PeriodFormProps> = ({ methods, action }) => {
  const {
    register,
    formState: { errors },
    control
  } = methods;
  const { data } = useGetAcademicLevelsQuery(action === 'add' ? undefined : skipToken);

  return (
    <>
      {action === 'add' && (
        <FormControl fullWidth size='small'>
          <FormLabel>Academic Level</FormLabel>
          <Controller
            name='academicLevelId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  displayEmpty
                  onChange={onChange}
                  value={value}
                  error={Boolean(error?.message)}
                >
                  <MenuItem value='' disabled>
                    Select Level
                  </MenuItem>
                  {data?.academicLevels?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      )}
      <FormControl fullWidth sx={{ mt: 1 }}>
        <FormLabel>Period Name</FormLabel>
        <TextField
          size='small'
          fullWidth
          placeholder='e.g., January, First Semester'
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('name')}
          helperText={errors?.name?.message}
          error={Boolean(errors?.name)}
        />
      </FormControl>

      {dateFields.map(({ name, label }) => (
        <FormControl fullWidth size='small' key={name} sx={{ mt: 1 }}>
          <FormLabel>{label}</FormLabel>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                slotProps={{
                  textField: {
                    placeholder: 'Select date',
                    size: 'small',
                    error: Boolean(error),
                    helperText: error?.message,
                    InputLabelProps: { shrink: true }
                  }
                }}
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </FormControl>
      ))}
    </>
  );
};
