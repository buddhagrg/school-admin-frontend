import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { ClassForm } from './class-form';
import { ClassFormProps, ClassFormSchema } from '../../types';
import { useAddClassMutation } from '../../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

const initialState: ClassFormProps = {
  name: '',
  academicLevelId: ''
};
export const AddClass = () => {
  const methods = useForm<ClassFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassFormSchema)
  });
  const [addClass, { isLoading: isAdding }] = useAddClassMutation();

  useEffect(() => {
    methods.setValue('name', '');
  }, [methods]);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const handleSave = async (data: ClassFormProps) => {
    try {
      const result = await addClass(data).unwrap();
      toast(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <ClassForm methods={methods} action='add' />
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
