import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleOutline } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FormProvider, useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useAddStaffMutation } from '../api/staff-api';
import { BasicInfoSchema, StaffFormProps, StaffFormSchema } from '../types';
import {
  Address,
  BasicInformation,
  OtherInformation,
  ParentsInformation,
  staffInitialState
} from '../components/forms';
import { useSelector } from 'react-redux';
import { getAppBase } from '@/domains/auth/slice';

export const AddStaff = () => {
  const navigate = useNavigate();
  const appBase = useSelector(getAppBase);

  const [addNewStaff, { isLoading: isAddingStaff }] = useAddStaffMutation();

  const methods = useForm<StaffFormProps>({
    defaultValues: staffInitialState,
    resolver: zodResolver(StaffFormSchema)
  });

  const onReset = () => {
    methods.reset();
  };
  const onSave = async (data: StaffFormProps) => {
    try {
      const result = await addNewStaff(data).unwrap();
      toast.info(result.message);
      navigate(`${appBase}/staffs`);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader icon={<AddCircleOutline sx={{ mr: 1 }} />} heading='Add Staff' />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformation schema={BasicInfoSchema} />

          <hr />
          <Address />

          <hr />
          <ParentsInformation />

          <hr />
          <OtherInformation action='add' />
        </FormProvider>

        <hr />
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <Button
            size='small'
            variant='contained'
            color='error'
            onClick={methods.handleSubmit(onReset)}
          >
            Reset
          </Button>
          <LoadingButton
            loading={isAddingStaff}
            size='small'
            variant='contained'
            color='primary'
            onClick={methods.handleSubmit(onSave)}
          >
            Save
          </LoadingButton>
        </Stack>
      </Paper>
    </>
  );
};
