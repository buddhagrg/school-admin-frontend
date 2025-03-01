import { useGetAcademicLevelsQuery } from '@/app/academic/api';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AcademicYearFormProps } from '../types';
import { DatePicker } from '@mui/x-date-pickers';
import { DATE_FORMAT } from '@/utils/helpers/date';
import { parseISO } from 'date-fns';

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
      <TextField
        size='small'
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        label='Academic Year Name'
        variant='standard'
        {...register('name')}
        helperText={errors?.name?.message}
        error={Boolean(errors?.name)}
      />

      {dateFields.map(({ name, label }) => (
        <FormControl fullWidth size='small' sx={{ mt: 2 }} key={name}>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label={label}
                slotProps={{
                  textField: {
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

      <FormControl fullWidth sx={{ mt: 2 }} size='small'>
        <InputLabel shrink>Academic Level</InputLabel>
        <Controller
          name='academicLevelId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                label='Academic Level'
                onChange={onChange}
                value={value}
                notched
                error={Boolean(error?.message)}
              >
                {data?.academicLevels?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
    </>
  );
};
