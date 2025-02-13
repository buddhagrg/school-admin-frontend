import { useForm } from 'react-hook-form';
import { ClassTeacherForm } from './class-teacher-form';
import { ClassTeacherFormProps, ClassTeacherFormSchema } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useAssignClassTeacherMutation } from '../../api';

const initialState = {
  classId: '',
  teacherId: ''
};
export const AddClassTeacher = () => {
  const methods = useForm<ClassTeacherFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassTeacherFormSchema)
  });
  const [assignClassTeacher, { isLoading: isAssigning }] = useAssignClassTeacherMutation();

  useEffect(() => {
    methods.reset(initialState);
  }, [methods]);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const handleSave = async (data: ClassTeacherFormProps) => {
    try {
      const result = await assignClassTeacher(data).unwrap();
      toast(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography>Assign Class Teacher</Typography>
      <Box component='hr' sx={{ mb: 3 }} />
      <ClassTeacherForm methods={methods} action='add' />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ ml: 'auto', marginTop: '10px' }}>
          <Button
            sx={{ marginRight: ' 10px' }}
            type='button'
            size='small'
            variant='contained'
            onClick={handleClear}
            color='error'
          >
            Clear
          </Button>
          <LoadingButton
            loading={isAssigning}
            type='button'
            size='small'
            variant='contained'
            onClick={methods.handleSubmit(handleSave)}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </Paper>
  );
};
