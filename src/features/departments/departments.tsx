import { Box, Grid2 } from '@mui/material';

import { AddDepartment, ListDepartments } from './components';
import { PageContentHeader, ResponsiveBox } from '@/shared/components';

export const Departments = () => {
  return (
    <>
      <PageContentHeader title='Departments' subtitle='Manage academic departments' />
      <Box mt={3} />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ResponsiveBox>
            <ListDepartments />
          </ResponsiveBox>
        </Grid2>
        <Grid2 size={{ xs: 10, md: 4 }}>
          <AddDepartment />
        </Grid2>
      </Grid2>
    </>
  );
};
