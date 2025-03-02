import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Edit } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { BasicInfoSchema, StaffFormProps, StaffFormSchema } from '../types';
import { getAppBase } from '@/app/auth/auth-slice';
import { useGetStaffDetailQuery, useUpdateStaffMutation } from '../staff-api';
import {
  AddressForm,
  BasicInformationForm,
  OtherInformationForm,
  ParentsInformationForm,
  staffInitialState
} from '../components';

type StaffDetailValue<T> = T extends { [key: string]: infer U } ? U : never;

export const EditStaff = () => {
  const { id } = useParams();
  const appBase = useSelector(getAppBase);
  const redirectPath = `${appBase}/staff/${id}`;

  const { data: staffDetail } = useGetStaffDetailQuery(id);
  const [updateStaff, { isLoading: isUpdatingStaff }] = useUpdateStaffMutation();
  const navigate = useNavigate();

  const methods = useForm<StaffFormProps>({
    defaultValues: staffInitialState,
    resolver: zodResolver(StaffFormSchema)
  });

  useEffect(() => {
    if (staffDetail) {
      const { setValue } = methods;
      for (const [key, value] of Object.entries(staffDetail) as [
        keyof StaffFormProps,
        StaffDetailValue<StaffFormProps>
      ][]) {
        if (['dob', 'joinDate'].includes(key)) {
          setValue(key, typeof value === 'string' ? parseISO(value) : value);
        } else {
          setValue(key, value);
        }
      }
    }
  }, [staffDetail, methods]);

  const onUpdateStaff = async (data: StaffFormProps) => {
    try {
      const result = await updateStaff({ id: Number(id)!, ...data }).unwrap();
      toast.info(result.message);
      navigate(redirectPath);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader icon={Edit} title='Edit Staff Account' />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformationForm schema={BasicInfoSchema} />

          <hr />
          <AddressForm />

          <hr />
          <ParentsInformationForm />

          <hr />
          <OtherInformationForm action='edit' />
        </FormProvider>
        <hr />
        <Stack alignItems='center' justifyContent='center'>
          <Button
            loading={isUpdatingStaff}
            loadingPosition='start'
            size='small'
            variant='contained'
            color='primary'
            onClick={methods.handleSubmit(onUpdateStaff)}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </>
  );
};
