import { Box, FormControl, FormLabel, Switch, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import type { RoleFormProps } from '../../types';
import { SubHardText } from '@/shared/components';

export const RoleForm = ({ methods }: { methods: UseFormReturn<RoleFormProps> }) => {
  const {
    register,
    control,
    formState: { errors }
  } = methods;

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>Role Name</FormLabel>
        <TextField
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          size='small'
          placeholder='e.g., Accountant, HR Manager'
        />
      </FormControl>
      <FormControl fullWidth>
        <Box sx={{ display: 'flex', mt: 2, alignItems: 'center' }}>
          <FormLabel>Status</FormLabel>
          <Controller
            name='status'
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
