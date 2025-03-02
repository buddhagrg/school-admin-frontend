import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { BasicInfoSchema, StaffFormProps, StaffFormSchema } from '../types';
import { getAppBase } from '@/app/auth/auth-slice';
import { useAddStaffMutation } from '../staff-api';
import {
  AddressForm,
  BasicInformationForm,
  OtherInformationForm,
  ParentsInformationForm,
  staffInitialState
} from '../components';

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
      navigate(`${appBase}/users/manage`);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader icon={AddCircleOutline} title='Add Staff' />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformationForm schema={BasicInfoSchema} />

          <hr />
          <AddressForm />

          <hr />
          <ParentsInformationForm />

          <hr />
          <OtherInformationForm action='add' />
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
          <Button
            loading={isAddingStaff}
            loadingPosition='start'
            size='small'
            variant='contained'
            color='primary'
            onClick={methods.handleSubmit(onSave)}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </>
  );
};
