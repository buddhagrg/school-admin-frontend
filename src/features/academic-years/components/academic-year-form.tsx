import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { parseISO } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

import type { AcademicYearFormProps } from '../types';
import { DATE_FORMAT } from '@/utils/helpers/date';
import { useGetAcademicLevelsQuery } from '@/features/levels-periods/levels-periods-api';
import { STATUS_LIST } from '@/utils/constants';

type AcademicYearFormType = {
  methods: UseFormReturn<AcademicYearFormProps>;
};
export const AcademicYearForm: React.FC<AcademicYearFormType> = ({ methods }) => {
  const {
    register,
    control,
    formState: { errors }
  } = methods;
  const { data } = useGetAcademicLevelsQuery();

  const dateFields: Array<{ name: 'startDate' | 'endDate'; label: string }> = [
    { name: 'startDate', label: 'Start Date' },
    { name: 'endDate', label: 'End Date' }
  ];
  return (
    <>
      <FormControl fullWidth>
        <FormLabel>Academic Year</FormLabel>
        <TextField
          size='small'
          {...register('name')}
          helperText={errors?.name?.message}
          error={Boolean(errors?.name)}
        />
      </FormControl>

      {dateFields.map(({ name, label }) => (
        <FormControl fullWidth sx={{ mt: 1 }} key={name}>
          <FormLabel>{label}</FormLabel>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                slotProps={{
                  textField: {
                    size: 'small',
                    error: Boolean(error),
                    helperText: error?.message,
                    placeholder: 'Select date'
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

      <FormControl fullWidth sx={{ mt: 1 }} size='small'>
        <FormLabel>Academic Level</FormLabel>
        <Controller
          name='academicLevelId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                onChange={onChange}
                value={value}
                error={Boolean(error?.message)}
                displayEmpty
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
      <FormControl sx={{ mt: 1 }}>
        <FormLabel>Status</FormLabel>
        <Controller
          name='isActive'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <RadioGroup row value={value} onChange={(e) => onChange(e.target.value === 'true')}>
                {STATUS_LIST.map(({ id, name }) => (
                  <FormControlLabel
                    label={name}
                    value={id}
                    key={name}
                    control={<Radio size='small' />}
                  />
                ))}
              </RadioGroup>
              <FormHelperText error>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
    </>
  );
};
