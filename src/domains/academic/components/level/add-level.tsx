import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { AcademicLevelFormProps, AcademicLevelFormSchema } from '../../types';
import { useAddAcademicLevelMutation } from '../../api';
import { LevelForm } from './level-form';

export const AddLevel = () => {
  const methods = useForm<AcademicLevelFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(AcademicLevelFormSchema)
  });
  const [addLevel, { isLoading: isAdding }] = useAddAcademicLevelMutation();

  useEffect(() => {
    methods.setValue('name', '');
  }, [methods]);

  const handleClear = () => {
    methods.reset({ name: '' });
  };
  const handleSave = async (data: AcademicLevelFormProps) => {
    try {
      const result = await addLevel(data).unwrap();
      toast(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <LevelForm methods={methods} />
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
