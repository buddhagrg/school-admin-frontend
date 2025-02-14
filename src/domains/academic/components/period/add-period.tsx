import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AcademicPeriodFormProps, AcademicPeriodFormSchema } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddAcademicPeriodMutation } from '../../api';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { PeriodForm } from './period-form';

const initialState = {
  name: '',
  academicLevelId: ''
};

export const AddPeriod = () => {
  const methods = useForm<AcademicPeriodFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(AcademicPeriodFormSchema)
  });
  const [addPeriod, { isLoading: isAdding }] = useAddAcademicPeriodMutation();

  useEffect(() => {
    methods.setValue('academicLevelId', '');
    methods.setValue('name', '');
  }, [methods]);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const handleSave = async (data: AcademicPeriodFormProps) => {
    try {
      const result = await addPeriod(data).unwrap();
      toast(result?.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PeriodForm action='add' methods={methods} />
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
    </>
  );
};
