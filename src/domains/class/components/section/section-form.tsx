import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { SectionFormProps } from '../../types';
import React from 'react';
import { useGetClassesQuery } from '../../api';

type SectionFormType = {
  action: 'add' | 'update';
  methods: UseFormReturn<SectionFormProps>;
};
export const SectionForm: React.FC<SectionFormType> = ({ methods, action }) => {
  const {
    register,
    control,
    formState: { errors }
  } = methods;
  const { data } = useGetClassesQuery(undefined, { skip: action === 'update' });

  return (
    <>
      <TextField
        size='small'
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        label='Section Name'
        variant='standard'
        {...register('name')}
        helperText={errors?.name?.message}
        error={Boolean(errors?.name)}
      />
      {action === 'add' && (
        <FormControl fullWidth sx={{ mt: 2 }} size='small'>
          <InputLabel shrink>Class</InputLabel>
          <Controller
            name='classId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Class'
                  onChange={onChange}
                  value={value}
                  notched
                  error={Boolean(error?.message)}
                >
                  {data?.classes?.map((item) => (
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
      )}
    </>
  );
};
