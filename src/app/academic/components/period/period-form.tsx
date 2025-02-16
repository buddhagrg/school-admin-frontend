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
import { AcademicPeriodFormProps } from '../../types';
import { useGetAcademicLevelsQuery } from '../../api';

type PeriodFormProps = {
  methods: UseFormReturn<AcademicPeriodFormProps>;
  action: 'add' | 'update';
};

export const PeriodForm: FC<PeriodFormProps> = ({ methods, action }) => {
  const {
    register,
    formState: { errors },
    control
  } = methods;
  const { data } = useGetAcademicLevelsQuery(undefined, { skip: action === 'update' });

  return (
    <>
      <TextField
        size='small'
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
        label='Period Name'
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
