import { useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { type AcademicLevelFormProps, AcademicLevelFormSchema } from '../../types';
import { useAddAcademicLevelMutation } from '../../levels-periods-api';
import { LevelForm } from './level-form';
import { SubSoftText, TitleText } from '@/shared/components';

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
    <Card>
      <CardHeader
        title={<TitleText text='Add Academic Level' />}
        subheader={<SubSoftText text='Create a new academic level for your institution' />}
      />
      <CardContent>
        <LevelForm methods={methods} />
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
