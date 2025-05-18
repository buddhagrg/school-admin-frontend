import { Grid2 } from '@mui/material';
import { AddPeriod } from './add-period';
import { ListPeriods } from './list-periods';

export const PeriodTabContent = () => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <ListPeriods />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <AddPeriod />
      </Grid2>
    </Grid2>
  );
};
