import { Button, Paper, Stack } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { StudentProps, StudentSchema } from '../types';
import { useAddStudentMutation } from '../student-api';
import {
  AcademicInformationForm,
  AddressInformationForm,
  BasicInformationForm,
  OtherInformationForm,
  ParentsAndGuardianInformationForm,
  studentFormInitialState
} from '../components';
import { getAppBase } from '@/app/auth/auth-slice';

export const AddStudent = () => {
  const [addStudent, { isLoading }] = useAddStudentMutation();
  const appBase = useSelector(getAppBase);

  const navigate = useNavigate();

  const methods = useForm<StudentProps>({
    defaultValues: studentFormInitialState,
    resolver: zodResolver(StudentSchema)
  });

  const onReset = () => {
    methods.reset();
  };

  const onSave = async (data: StudentProps) => {
    try {
      const { dob, joinDate, ...rest } = data;

      const payload = {
        ...rest,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        joinDate: getFormattedDate(joinDate, API_DATE_FORMAT)
      };

      const result = await addStudent(payload).unwrap();
      toast.info(result.message);
      navigate(`${appBase}/users/manage`);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <PageContentHeader icon={AddCircleOutline} title='Add Student' />
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
          <OtherInformationForm action='add' />

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
              loading={isLoading}
              loadingPosition='start'
              size='small'
              variant='contained'
              color='primary'
              onClick={methods.handleSubmit(onSave)}
            >
              Save
            </Button>
          </Stack>
        </FormProvider>
      </Paper>
    </>
  );
};
