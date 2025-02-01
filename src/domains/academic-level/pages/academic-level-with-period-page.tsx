import { PageContentHeader } from '@/components/page-content-header';
import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { ListLevelWithPeriod } from './list-level-with-period';
import { ManageLevelPeriodTab } from '../components/manage-level-period-tab';

export const AcademicLevelWithPeriodPage = () => {
  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Academic Levels and Periods' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <ListLevelWithPeriod />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ManageLevelPeriodTab />
        </Grid2>
      </Grid2>
    </>
  );
};
