import { PageContentHeader } from '@/components/page-content-header';
import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { ListLevelsWithPeriods } from '../components/list-levels-with-periods';
import { ManageLevelPeriodTab } from '../components/manage-level-period-tab';

export const AcademicPage = () => {
  return (
    <>
      <PageContentHeader icon={Info} heading='Academic Levels and Periods' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <ListLevelsWithPeriods />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ManageLevelPeriodTab />
        </Grid2>
      </Grid2>
    </>
  );
};
