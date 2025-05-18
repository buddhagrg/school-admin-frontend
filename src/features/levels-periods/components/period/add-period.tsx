import { useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { type AcademicPeriodFormProps, AcademicPeriodFormSchema } from '../../types';
import { useAddAcademicPeriodMutation } from '../../levels-periods-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { PeriodForm } from './period-form';
import { SubSoftText, TitleText } from '@/shared/components';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

const initialState: AcademicPeriodFormProps = {
  name: '',
  academicLevelId: '',
  startDate: null,
  endDate: null
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
      const payload = {
        ...data,
        startDate: getFormattedDate(data.startDate, API_DATE_FORMAT),
        endDate: getFormattedDate(data.endDate, API_DATE_FORMAT)
      };
      const result = await addPeriod(payload).unwrap();
      toast(result?.message);
      handleClear();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Card>
      <CardHeader
        title={<TitleText text='Add Academic Period' />}
        subheader={<SubSoftText text='Create a new period for the selected academic level' />}
      />
      <CardContent>
        <PeriodForm action='add' methods={methods} />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ ml: 'auto', mt: 3 }}>
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
