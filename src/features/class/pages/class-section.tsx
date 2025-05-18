import { useState } from 'react';
import { Box, Grid2, SelectChangeEvent } from '@mui/material';

import { ListClassSection } from '../components/list-class-section';
import { AddBtn } from '../components/add-class-and-section-btn';
import { FilterClass } from '../components/class/filter-class';
import type { SetupItems } from '@/shared/types';
import { PageContentHeader, ResponsiveBox, SetupInfo } from '@/shared/components';

const items: SetupItems[] = [
  { route: '/academic-structure/levels-periods', name: 'Academic Levels' }
];
export const ClassSection = () => {
  const [level, setLevel] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PageContentHeader title='Class Management' subtitle='Manage classes and sections' />
        <AddBtn />
      </Box>
      <Box sx={{ my: 2 }}>
        <SetupInfo screen='classes-sections' items={items} />
      </Box>
      <FilterClass levelId={level} handleChange={handleChange} />
      <Box mt={3} />
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>
          <ResponsiveBox>
            <ListClassSection level={level} />
          </ResponsiveBox>
        </Grid2>
      </Grid2>
    </>
  );
};
