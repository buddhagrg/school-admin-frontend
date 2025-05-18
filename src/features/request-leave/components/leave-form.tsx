import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid2,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';

import { DATE_FORMAT } from '@/utils/helpers/date';
import type { LeaveFormProps } from '../types';
import { useGetMyLeavePoliciesQuery } from '@/features/leave-policies/leave-policy-api';

type LeaveFormType = {
  methods: UseFormReturn<LeaveFormProps>;
};
export const LeaveForm: React.FC<LeaveFormType> = ({ methods }) => {
  const { control, register } = methods;
  const { data } = useGetMyLeavePoliciesQuery();

  const dateFields: Array<{ name: 'fromDate' | 'toDate'; label: string }> = [
    { name: 'fromDate', label: 'From Date' },
    { name: 'toDate', label: 'To Date' }
  ];

  return (
    <>
      <FormControl fullWidth size='small' sx={{ mb: 1 }} required>
        <FormLabel>Leave Type</FormLabel>
        <Controller
          name='policyId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select value={value} onChange={(event) => onChange(event.target.value)} displayEmpty>
                <MenuItem value='' disabled>
                  Select Leave
                </MenuItem>
                {data?.leavePolicies?.map(({ id, name }) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>

      <Grid2 container spacing={2}>
        {dateFields.map(({ name, label }) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={name}>
            <FormControl fullWidth required>
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
          </Grid2>
        ))}
      </Grid2>

      <FormControl fullWidth sx={{ mt: 1 }}>
        <FormLabel>Note</FormLabel>
        <TextField
          {...register('note')}
          size='small'
          placeholder='Please provide details about your request'
        />
      </FormControl>
    </>
  );
};
