import { FC, useEffect } from 'react';
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
import { BasicInfoSchema, StaffFormProps, StaffFormSchema } from '../../types';
import {
  Address,
  BasicInformation,
  OtherInformation,
  ParentsInformation,
  staffInitialState
} from '../forms';
import { useGetStaffDetailQuery, useUpdateStaffMutation } from '../../api';

type StaffAccountEditProps = {
  id?: string;
  redirectPath: string;
  heading: string;
};
type StaffDetailValue<T> = T extends { [key: string]: infer U } ? U : never;

export const StaffAccountEdit: FC<StaffAccountEditProps> = ({ id, redirectPath, heading }) => {
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
      <PageContentHeader icon={Edit} heading={heading} />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformation schema={BasicInfoSchema} />

          <hr />
          <Address />

          <hr />
          <ParentsInformation />

          <hr />
          <OtherInformation action='edit' />
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
