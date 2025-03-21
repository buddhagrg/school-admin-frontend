import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { getAppBase } from '@/app/auth/auth-slice';
import {
  AcademicInformationForm,
  AddressInformationForm,
  BasicInformationForm,
  OtherInformationForm,
  ParentsAndGuardianInformationForm,
  studentFormInitialState
} from '../components';
import { useGetStudentDetailQuery, useUpdateStudentMutation } from '../student-api';
import { StudentProps, StudentSchema } from '../types';

type StudentDetailValue<T> = T extends { [key: string]: infer U } ? U : never;
export const EditStudent = () => {
  const { id } = useParams();
  const appBase = useSelector(getAppBase);
  const redirectPath = `${appBase}/students/${id}`;

  const methods = useForm<StudentProps>({
    defaultValues: studentFormInitialState,
    resolver: zodResolver(StudentSchema)
  });
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();
  const navigate = useNavigate();

  const { data: studentDetail } = useGetStudentDetailQuery(id);

  useEffect(() => {
    if (studentDetail) {
      const { setValue } = methods;
      for (const [key, value] of Object.entries(studentDetail) as [
        keyof StudentProps,
        StudentDetailValue<StudentProps>
      ][]) {
        if (['joinDate', 'dob'].includes(key)) {
          setValue(key, typeof value === 'string' ? parseISO(value) : value);
        } else {
          setValue(key, value);
        }
      }
    }
  }, [studentDetail, methods]);

  const onUpdate = async (data: StudentProps) => {
    try {
      const result = await updateStudent({ id: Number(id!), ...data }).unwrap();
      toast.info(result.message);
      navigate(redirectPath);
    } catch (error) {
      const { message } = getErrorMsg(error as FetchBaseQueryError | SerializedError);
      toast.error(message);
    }
  };

  return (
    <>
      <PageContentHeader icon={Edit} title='Edit Student Account' />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformationForm />

          <hr />
          <AcademicInformationForm />

          <hr />
          <ParentsAndGuardianInformationForm />

          <hr />
          <AddressInformationForm />

          <hr />
          <OtherInformationForm action='edit' />
        </FormProvider>
        <hr />
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
          <Button
            loading={isLoading}
            loadingPosition='start'
            size='small'
            variant='contained'
            color='primary'
            onClick={methods.handleSubmit(onUpdate)}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </>
  );
};
