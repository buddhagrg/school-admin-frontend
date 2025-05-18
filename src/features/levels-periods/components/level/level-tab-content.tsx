import { Grid2 } from '@mui/material';
import { ListLevels } from './list-levels';
import { AddLevel } from './add-level';

export const LevelTabContent = () => {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <ListLevels />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <AddLevel />
      </Grid2>
    </Grid2>
  );
};
