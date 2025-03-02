import { PageContentHeader } from '@/components/page-content-header';
import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { ListLevelsWithPeriods, ManageLevelPeriodTab } from './components';
import { ResponsiveBox } from '@/components/responsive-box';

export const LevelsPeriods = () => {
  return (
    <>
      <PageContentHeader icon={Info} title='Academic Levels and Periods' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <ResponsiveBox>
            <ListLevelsWithPeriods />
          </ResponsiveBox>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ManageLevelPeriodTab />
        </Grid2>
      </Grid2>
    </>
  );
};
