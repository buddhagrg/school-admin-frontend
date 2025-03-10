import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { DepartmentForm, DepartmentSchema } from '../types';
import { ListDepartments, ManageDepartment } from '../components';

export const Departments = () => {
  const methods = useForm<DepartmentForm>({
    defaultValues: { name: '' },
    resolver: zodResolver(DepartmentSchema)
  });

  return (
    <>
      <PageContentHeader icon={Info} title='Department Information' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ListDepartments />
        </Grid2>
        <Grid2 size={{ xs: 10, md: 4 }}>
          <ManageDepartment operation='Add' methods={methods} />
        </Grid2>
      </Grid2>
    </>
  );
};
