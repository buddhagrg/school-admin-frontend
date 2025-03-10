import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ManageDepartment } from '../components';
import { useGetDepartmentQuery } from '../department-api';
import { DepartmentForm, DepartmentSchema } from '../types';
import { ERROR_MESSAGE } from '@/components/errors';

export const EditDepartment = () => {
  const { id } = useParams();
  const { data: departmentDetail, isLoading, isError, error } = useGetDepartmentQuery(Number(id));

  const methods = useForm<DepartmentForm>({
    defaultValues: { name: '' },
    resolver: zodResolver(DepartmentSchema)
  });

  useEffect(() => {
    if (departmentDetail) {
      const { name } = departmentDetail;
      methods.setValue('name', name);
    }
  }, [departmentDetail, methods]);

  let content: ReactNode | null = null;
  if (isLoading) {
    content = <>loading...</>;
  } else if (isError) {
    content = <>{getErrorMsg(error)}</>;
  } else if (!departmentDetail) {
    content = <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
  } else {
    content = <ManageDepartment operation='Edit' id={Number(id)} methods={methods} />;
  }

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 4 }}>{content}</Grid2>
    </Grid2>
  );
};
