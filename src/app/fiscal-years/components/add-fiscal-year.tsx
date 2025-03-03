import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Box, Button, Paper, Typography } from '@mui/material';

import { useAddFiscalYearMutation } from '../fiscal-years-api';
import { FiscalYearFormProps, FiscalYearFormSchema } from '../types';
import { fiscalYearInitialState } from './fiscal-year-initial-state';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FiscalYearForm } from './fiscal-year-form';

export const AddFiscalYear = () => {
  const methods = useForm<FiscalYearFormProps>({
    defaultValues: fiscalYearInitialState,
    resolver: zodResolver(FiscalYearFormSchema)
  });
  const [addFiscalYear, { isLoading: isAdding }] = useAddFiscalYearMutation();

  const handleClear = () => {
    methods.reset(fiscalYearInitialState);
  };
  const handleSave = async (data: FiscalYearFormProps) => {
    try {
      const result = await addFiscalYear(data).unwrap();
      toast.info(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography>Add Fiscal Year</Typography>
      <Box component='hr' sx={{ mb: 3 }} />
      <FiscalYearForm methods={methods} />
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
