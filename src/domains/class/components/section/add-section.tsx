import { useForm } from 'react-hook-form';
import { SectionForm } from './section-form';
import { SectionFormProps, SectionFormSchema } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useAddSectionMutation } from '../../api';

const initialState: SectionFormProps = {
  name: '',
  classId: ''
};
export const AddSection = () => {
  const methods = useForm<SectionFormProps>({
    defaultValues: initialState,
    resolver: zodResolver(SectionFormSchema)
  });
  const [addSection, { isLoading: isAdding }] = useAddSectionMutation();

  React.useEffect(() => {
    methods.reset(initialState);
  }, []);

  const handleClear = () => {
    methods.reset(initialState);
  };
  const handleSave = async (data: SectionFormProps) => {
    try {
      const result = await addSection(data).unwrap();
      toast(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <SectionForm methods={methods} action='add' />
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
            loading={isAdding}
            type='button'
            size='small'
            variant='contained'
            onClick={methods.handleSubmit(handleSave)}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};
