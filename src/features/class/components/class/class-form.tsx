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
import type { ClassFormProps } from '../../types';
import { useGetAcademicLevelsQuery } from '@/features/levels-periods/levels-periods-api';

type ClassFormType = {
  methods: UseFormReturn<ClassFormProps>;
};
export const ClassForm: React.FC<ClassFormType> = ({ methods }) => {
  const {
    control,
    register,
    formState: { errors }
  } = methods;
  const { data } = useGetAcademicLevelsQuery();

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>Class Name</FormLabel>
        <TextField
          size='small'
          fullWidth
          placeholder='e.g., Class 1, Grade 5'
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('name')}
          helperText={errors?.name?.message}
          error={Boolean(errors?.name)}
        />
      </FormControl>
      <FormControl fullWidth size='small' sx={{ mt: 2 }}>
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
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Status</FormLabel>
        <Controller
          name='status'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <RadioGroup
                row
                value={value}
                onChange={(e) => onChange(Boolean(e.target.value === 'true'))}
              >
                <FormControlLabel value='true' label='Active' control={<Radio size='small' />} />
                <FormControlLabel value='false' label='Inactive' control={<Radio size='small' />} />
              </RadioGroup>
              <FormHelperText error>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
    </>
  );
};
