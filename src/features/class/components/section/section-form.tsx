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
import type { SectionFormProps } from '../../types';
import { useGetClassesWithSectionsQuery } from '../../class-api';

type SectionFormType = {
  methods: UseFormReturn<SectionFormProps>;
};
export const SectionForm: React.FC<SectionFormType> = ({ methods }) => {
  const {
    register,
    control,
    formState: { errors }
  } = methods;
  const { data } = useGetClassesWithSectionsQuery();

  return (
    <>
      <FormControl fullWidth size='small'>
        <FormLabel>Section Name</FormLabel>
        <TextField
          size='small'
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('name')}
          helperText={errors?.name?.message}
          error={Boolean(errors?.name)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }} size='small'>
        <FormLabel>Class</FormLabel>
        <Controller
          name='classId'
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
                  Select Class
                </MenuItem>
                {data?.classesWithSections?.map((item) => (
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
              <RadioGroup row value={value} onChange={(e) => onChange(e.target.value === 'true')}>
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
