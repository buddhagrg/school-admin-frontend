import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { AcademicYearFormProps, AcademicYearFormSchema } from '../types';
import { AcademicYearForm } from '../components/academic-year-form';
import { useAddAcademicYearMutation } from '../academic-years-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { academicYearInitialState } from './academi-year-initial-state';

export const AddAcademicYear = () => {
  const methods = useForm<AcademicYearFormProps>({
    defaultValues: academicYearInitialState,
    resolver: zodResolver(AcademicYearFormSchema)
  });
  const [addAademicYear, { isLoading: isAdding }] = useAddAcademicYearMutation();

  const handleClear = () => {
    methods.reset(academicYearInitialState);
  };
  const handleSave = async (data: AcademicYearFormProps) => {
    try {
      const result = await addAademicYear(data).unwrap();
      toast.info(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography>Add Academic Year</Typography>
      <Box component='hr' sx={{ mb: 3 }} />
      <AcademicYearForm methods={methods} />
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
          <Button
            loading={isAdding}
            loadingPosition='start'
            type='button'
            size='small'
            variant='contained'
            onClick={methods.handleSubmit(handleSave)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
