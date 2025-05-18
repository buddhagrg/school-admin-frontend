import React from 'react';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import type { ClassTeacherFormProps } from '../../types';
import { useGetClassesWithSectionsQuery, useGetTeachersQuery } from '../../class-api';

type ClassTeacherFormType = {
  methods: UseFormReturn<ClassTeacherFormProps>;
  action: 'add' | 'update';
};
export const ClassTeacherForm: React.FC<ClassTeacherFormType> = ({ methods, action }) => {
  const {
    control,
    formState: { errors }
  } = methods;
  const { data: classData } = useGetClassesWithSectionsQuery();
  const { data: teacherData } = useGetTeachersQuery();

  return (
    <>
      <FormControl fullWidth size='small' error={Boolean(errors.classId)}>
        <FormLabel id='class-label'>Class</FormLabel>
        <Controller
          name='classId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                disabled={action === 'update'}
                labelId='class-label'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                displayEmpty
              >
                <MenuItem value='' disabled>
                  Select Class
                </MenuItem>
                {classData?.classesWithSections.map(({ id, name }) => (
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
      <FormControl fullWidth size='small' error={Boolean(errors.teacherId)} sx={{ mt: 2 }}>
        <FormLabel id='teacher-label'>Teacher</FormLabel>
        <Controller
          name='teacherId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                labelId='teacher-label'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                displayEmpty
              >
                <MenuItem value='' disabled>
                  Select Teacher
                </MenuItem>
                {teacherData?.teachers.map(({ id, name }) => (
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
    </>
  );
};
