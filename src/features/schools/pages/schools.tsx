import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type SchoolProps, SchoolSchema } from '../types';
import { ListSchools, ManageSchool } from '../components';
import { PageContentHeader, ResponsiveBox } from '@/shared/components';

const initialState = {
  name: '',
  phone: '',
  email: ''
};

export const Schools = () => {
  const methods = useForm<SchoolProps>({
    defaultValues: initialState,
    resolver: zodResolver(SchoolSchema)
  });

  return (
    <>
      <PageContentHeader icon={Info} title='Schools' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ResponsiveBox>
            <ListSchools />
          </ResponsiveBox>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageSchool operation='Add' methods={methods} />
        </Grid2>
      </Grid2>
    </>
  );
};
