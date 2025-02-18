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
import { studentFormInitialState } from '../reducer';
import {
  AcademicInformation,
  AddressInformation,
  BasicInformation,
  OtherInformation,
  ParentsAndGuardianInformation
} from '../components/forms';
import { getAppBase } from '@/app/auth/slice';
import { useAddStudentMutation } from '../api';

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
      const { dob, admissionDate, ...rest } = data;

      const payload = {
        ...rest,
        dob: getFormattedDate(dob, API_DATE_FORMAT),
        admissionDate: getFormattedDate(admissionDate, API_DATE_FORMAT)
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
      <PageContentHeader icon={AddCircleOutline} heading='Add Student' />
      <Paper sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <BasicInformation />

          <hr />
          <AcademicInformation />

          <hr />
          <ParentsAndGuardianInformation />

          <hr />
          <AddressInformation />

          <hr />
          <OtherInformation action='add' />

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
