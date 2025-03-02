import { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ClassFormProps } from '../../types';
import { useGetAcademicLevelsQuery } from '@/app/levels-periods/levels-periods-api';

type ClassFormType = {
  methods: UseFormReturn<ClassFormProps>;
  action: 'add' | 'update';
};
export const ClassForm: FC<ClassFormType> = ({ methods, action }) => {
  const {
    control,
    register,
    formState: { errors }
  } = methods;
  const { data } = useGetAcademicLevelsQuery(undefined, { skip: action === 'update' });

  return (
    <>
      <TextField
        size='small'
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        label='Class Name'
        variant='standard'
        {...register('name')}
        helperText={errors?.name?.message}
        error={Boolean(errors?.name)}
      />
      {action === 'add' && (
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
      )}
    </>
  );
};
