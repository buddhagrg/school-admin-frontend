import { useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { type DepartmentFormProps, DepartmentFormSchema } from '../types';
import { useAddNewDepartmentMutation } from '../department-api';
import { DepartmentForm } from './department-form';
import { SubSoftText, TitleText } from '@/shared/components';

export const AddDepartment = () => {
  const methods = useForm<DepartmentFormProps>({
    defaultValues: { name: '' },
    resolver: zodResolver(DepartmentFormSchema)
  });
  const [addDepartment, { isLoading: isAdding }] = useAddNewDepartmentMutation();

  useEffect(() => {
    methods.setValue('name', '');
  }, [methods]);

  const handleClear = () => {
    methods.reset({ name: '' });
  };
  const handleSave = async (data: DepartmentFormProps) => {
    try {
      const result = await addDepartment(data).unwrap();
      toast(result.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Card>
      <CardHeader
        title={<TitleText text='Add Department' />}
        subheader={<SubSoftText text='Create a new department for your institution' />}
      />
      <CardContent>
        <DepartmentForm methods={methods} />
        <Box sx={{ display: 'flex', mt: 2 }}>
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
      </CardContent>
    </Card>
  );
};
