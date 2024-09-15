import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ClassProps, ClassSchema } from '../types';
import { ManageClass } from '../components';
import { useGetClassDetailQuery } from '../api/class-api';

const initialState = {
  name: '',
  sections: []
};

export const EditClass = () => {
  const { id } = useParams();
  const { data: classDetail, isLoading, isError, error } = useGetClassDetailQuery(id);

  const methods = useForm<ClassProps>({
    defaultValues: initialState,
    resolver: zodResolver(ClassSchema)
  });

  React.useEffect(() => {
    if (classDetail) {
      const { name, sections } = classDetail;
      const sectionsArray =
        typeof sections === 'string' ? sections.split(',').map((section) => section.trim()) : [];
      methods.reset({ name, sections: sectionsArray });
    }
  }, [classDetail, methods]);

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{getErrorMsg(error)}</>;
  } else if (!classDetail) {
    content = <>Record not found</>;
  } else {
    content = <ManageClass operation='Edit' id={Number(id)} methods={methods} />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        {content}
      </Grid>
    </Grid>
  );
};
