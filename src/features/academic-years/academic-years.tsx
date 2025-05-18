import { Box, Grid2 } from '@mui/material';
import { DisplayAcademicYears } from './components';
import { AddAcademicYearsBtn } from './components/add-academic-year-btn';
import { PageContentHeader, ResponsiveBox } from '@/shared/components';

export const AcademicYears = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <PageContentHeader title='Manage Academic Years' subtitle='Manage academic years' />
        <AddAcademicYearsBtn />
      </Box>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <ResponsiveBox>
            <DisplayAcademicYears />
          </ResponsiveBox>
        </Grid2>
      </Grid2>
    </>
  );
};
