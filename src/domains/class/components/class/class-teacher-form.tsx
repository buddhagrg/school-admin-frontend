import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ClassTeacherFormProps } from '../../types';
import { useGetClassesQuery, useGetTeachersQuery } from '../../api';

type ClassTeacherFormType = {
  methods: UseFormReturn<ClassTeacherFormProps>;
  action: 'add' | 'update';
};
export const ClassTeacherForm: React.FC<ClassTeacherFormType> = ({ methods, action }) => {
  const {
    control,
    register,
    formState: { errors }
  } = methods;
  const { data: classData } = useGetClassesQuery(undefined, { skip: action === 'update' });
  const { data: teacherData } = useGetTeachersQuery();

  return (
    <>
      {action === 'update' && (
        <TextField
          size='small'
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          label='Class Name'
          variant='standard'
          {...register('className')}
          disabled
        />
      )}
      {action === 'add' && (
        <FormControl fullWidth size='small' error={Boolean(errors.classId)}>
          <InputLabel id='class-label' shrink>
            Class
          </InputLabel>
          <Controller
            name='classId'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Class'
                  labelId='class-label'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {classData?.classes.map(({ id, name }) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      )}
      <FormControl fullWidth size='small' error={Boolean(errors.teacherId)} sx={{ marginTop: 3 }}>
        <InputLabel id='teacher-label' shrink>
          Teacher
        </InputLabel>
        <Controller
          name='teacherId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                label='Teacher'
                labelId='teacher-label'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                notched
              >
                {teacherData?.teachers.map(({ id, name }) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
    </>
  );
};
