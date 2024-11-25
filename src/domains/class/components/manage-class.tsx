import * as React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ClassProps } from '../types';
import { useAddClassMutation, useUpdateClassMutation } from '../api/class-api';
import { useGetSectionsQuery } from '@/domains/section/api';
import { useSelector } from 'react-redux';
import { getAppBase } from '@/domains/auth/slice';

type ManageClassProps = {
  id?: number;
  operation: 'Add' | 'Edit';
  methods: UseFormReturn<ClassProps>;
};

export const ManageClass: React.FC<ManageClassProps> = ({ id, operation, methods }) => {
  const { data, isLoading } = useGetSectionsQuery();
  const [addNewClass, { isLoading: isAddingClass }] = useAddClassMutation();
  const [updateClass, { isLoading: isUpdatingClass }] = useUpdateClassMutation();
  const navigate = useNavigate();
  const appBase = useSelector(getAppBase);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset
  } = methods;

  const isSectionPresent = (section: string) => {
    return getValues('sections').includes(section);
  };
  const handleChange = (section: string) => {
    const values = getValues('sections');
    if (values.includes(section)) {
      setValue(
        'sections',
        values.filter((v) => v !== section)
      );
    } else {
      setValue('sections', [...values, section]);
    }
  };

  const handleSave = async (submitData: ClassProps) => {
    try {
      const { name, sections } = submitData;
      const actualSections =
        data?.sections
          .filter((section) => sections.includes(section.name))
          .map((item) => item.name) || [];
      const sectionString = actualSections.length > 0 ? actualSections.join(',') : '';
      const result =
        operation === 'Add'
          ? await addNewClass({ name, sections: sectionString }).unwrap()
          : await updateClass({ id: id!, name, sections: sectionString }).unwrap();

      reset();
      toast.info(result?.message);
      navigate(`${appBase}/classes`);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='subtitle1' sx={{ mb: 3 }}>
        {operation} Class
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <TextField
          {...register('name')}
          label='Class Name'
          fullWidth
          focused
          size='small'
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Sections</FormLabel>
          {isLoading ? (
            <>loading...</>
          ) : (
            data?.sections?.map(({ name }) => (
              <FormGroup key={name}>
                <Controller
                  name='sections'
                  control={control}
                  render={() => (
                    <FormControlLabel
                      label={name}
                      control={
                        <Checkbox
                          size='small'
                          checked={isSectionPresent(name)}
                          icon={<CheckBoxOutlineBlank />}
                          checkedIcon={<CheckBox />}
                          onChange={() => handleChange(name)}
                        />
                      }
                    />
                  )}
                />
              </FormGroup>
            )) || <Typography color='red'>No section data</Typography>
          )}
        </FormControl>

        <Box textAlign='center'>
          <LoadingButton
            type='submit'
            size='small'
            variant='contained'
            sx={{ mt: 4 }}
            loading={isAddingClass || isUpdatingClass}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};
