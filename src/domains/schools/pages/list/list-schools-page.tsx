import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { SchoolProps, SchoolSchema } from '../../types';
import { ManageSchool } from '../../components/manage-school';
import { DisplaySchools } from './display-schools';

const initialState = {
  name: '',
  phone: '',
  email: ''
};

export const ListSchoolsPage = () => {
  const methods = useForm<SchoolProps>({
    defaultValues: initialState,
    resolver: zodResolver(SchoolSchema)
  });

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Schools' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageSchool operation='Add' methods={methods} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <DisplaySchools />
        </Grid2>
      </Grid2>
    </>
  );
};
