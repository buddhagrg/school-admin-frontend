import { PageContentHeader } from '@/components/page-content-header';
import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { DisplayAcademicYears } from './display-academic-years';
import { AddAcademicYear } from './add-academic-year';
import { ResponsiveBox } from '@/components/responsive-box';

export const AcademicYearsPage = () => {
  return (
    <>
      <PageContentHeader heading='Manage Academic Years' icon={Info} />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ResponsiveBox>
            <DisplayAcademicYears />
          </ResponsiveBox>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <AddAcademicYear />
        </Grid2>
      </Grid2>
    </>
  );
};
