import { useState } from 'react';
import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';

import { PageContentHeader } from '@/components/page-content-header';
import { ResponsiveBox } from '@/components/responsive-box';
import { ListLevels, ListPeriods } from './components';
import { NameIdType } from '@/types';

const initialState = { id: 0, name: '' };
export const PeriodsDates = () => {
  const [levelDetail, setLevelDetail] = useState<NameIdType>(initialState);

  return (
    <>
      <PageContentHeader title='Academic Level with Periods Dates' icon={Info} />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <ResponsiveBox>
            <ListLevels setSelectedLevelDetail={setLevelDetail} />
          </ResponsiveBox>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <ListPeriods levelDetail={levelDetail} />
        </Grid2>
      </Grid2>
    </>
  );
};
