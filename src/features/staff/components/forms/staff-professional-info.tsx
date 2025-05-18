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
import { Controller, useFormContext } from 'react-hook-form';

import type { ContactFormProps, StaffFormProps } from '../../types';
import { useGetDepartmentsQuery } from '@/features/departments/department-api';

const fields: Array<{
  id: keyof ContactFormProps;
  name: string;
}> = [
  { name: 'Qualification', id: 'qualification' },
  { name: 'Experience', id: 'experience' }
];
type StaffProfessionalFormProps = {
  departmentFieldVisibility?: boolean;
};
export const StaffProfessionalForm: React.FC<StaffProfessionalFormProps> = ({
  departmentFieldVisibility = true
}) => {
  const {
    register,
    formState: { errors },
    control
  } = useFormContext<StaffFormProps>();

  const { data: departmentData } = useGetDepartmentsQuery();

  return (
    <>
      <Grid2 container spacing={3} sx={{ mt: 1 }}>
        {fields.map(({ id, name }) => (
          <Grid2 size={{ xs: 12 }} key={id}>
            <FormControl fullWidth>
              <FormLabel>{name}</FormLabel>
            </FormControl>
            <TextField
              {...register(`${id}`)}
              error={Boolean(errors?.[id])}
              helperText={errors?.[id]?.message}
              fullWidth
              size='small'
            />
          </Grid2>
        ))}
        <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: departmentFieldVisibility ? '' : 'none' }}>
          <FormControl fullWidth size='small'>
            <FormLabel>Department</FormLabel>
            <Controller
              name='departmentId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    value={value}
                    displayEmpty
                    onChange={(event) => onChange(event.target.value)}
                  >
                    <MenuItem value='' disabled>
                      Select Department
                    </MenuItem>
                    {departmentData?.departments?.map(({ id, name }) => (
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
        </Grid2>
      </Grid2>
    </>
  );
};
