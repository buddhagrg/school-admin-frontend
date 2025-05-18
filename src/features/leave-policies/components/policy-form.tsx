import React from 'react';
import { Box, FormControl, FormLabel, Switch, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { SubHardText } from '@/shared/components';
import type { PolicyFormProps } from '../types';

type PolicyFormType = {
  methods: UseFormReturn<PolicyFormProps>;
};
export const PolicyForm: React.FC<PolicyFormType> = ({ methods }) => {
  const {
    register,
    formState: { errors },
    control
  } = methods;

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>Policy Name</FormLabel>
        <TextField
          {...register('name')}
          size='small'
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </FormControl>

      <FormControl fullWidth>
        <Box sx={{ display: 'flex', mt: 2, alignItems: 'center' }}>
          <FormLabel>Status</FormLabel>
          <Controller
            name='isActive'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Switch
                  value={value}
                  checked={value === true}
                  onChange={(e) => onChange(e.target.checked)}
                />
                <SubHardText text={value ? 'Active' : 'Inactive'} />
              </>
            )}
          />
        </Box>
      </FormControl>
    </>
  );
};
