import React from 'react';
import { FormControl, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { parseISO } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

import { FiscalYearFormProps } from '../types';
import { DATE_FORMAT } from '@/utils/helpers/date';

type FiscalYearFormType = {
  methods: UseFormReturn<FiscalYearFormProps>;
};
export const FiscalYearForm: React.FC<FiscalYearFormType> = ({ methods }) => {
  const {
    register,
    control,
    formState: { errors }
  } = methods;

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
        label='Fiscal Year Name'
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
    </>
  );
};
