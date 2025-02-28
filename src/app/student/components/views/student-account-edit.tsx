import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';

import { PageContentHeader } from '@/components/page-content-header';
import { BasicInformation } from '../forms/basic-information';
import { AcademicInformation } from '../forms/academic-information';
import { ParentsAndGuardianInformation } from '../forms/parents-and-guardian-information';
import { AddressInformation } from '../forms/address-information';
import { OtherInformation } from '../forms/other-information';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { StudentProps } from '../../types';
import { studentFormInitialState } from '../../reducer/student-form-reducer';
import { StudentSchema } from '../../types/student-schema';
import { useGetStudentDetailQuery, useUpdateStudentMutation } from '../../api';

type StudentAccountEditProps = {
  heading: string;
  id?: string;
  redirectPath: string;
};
type StudentDetailValue<T> = T extends { [key: string]: infer U } ? U : never;

export const StudentAccountEdit: FC<StudentAccountEditProps> = ({ id, redirectPath, heading }) => {
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
        if (['admissionDate', 'dob'].includes(key)) {
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
      <PageContentHeader icon={Edit} heading={heading} />
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
          <OtherInformation action='edit' />
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
