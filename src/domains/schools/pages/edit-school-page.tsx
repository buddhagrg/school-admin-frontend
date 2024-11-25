import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetSchoolQuery } from '../api';
import { SchoolProps, SchoolSchema } from '../types';
import { ManageSchool } from '../components/manage-school';

const initialState = {
  name: '',
  email: '',
  phone: ''
};

export const EditSchool = () => {
  const { id } = useParams();
  const { data: schoolDetail, isLoading, isError, error } = useGetSchoolQuery(Number(id));

  const methods = useForm<SchoolProps>({
    defaultValues: initialState,
    resolver: zodResolver(SchoolSchema)
  });

  React.useEffect(() => {
    if (schoolDetail) {
      const { name, email, phone } = schoolDetail;
      methods.reset({ name, email, phone });
    }
  }, [schoolDetail, methods]);

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{getErrorMsg(error)}</>;
  } else if (!schoolDetail) {
    content = <>Record not found</>;
  } else {
    content = <ManageSchool operation='Edit' id={Number(id)} methods={methods} />;
  }

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 4 }}>{content}</Grid2>
    </Grid2>
  );
};
