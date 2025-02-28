import { PageContentHeader } from '@/components/page-content-header';
import { ResponsiveBox } from '@/components/responsive-box';
import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { ListLevels } from '../components/level/list-levels';
import { useState } from 'react';
import { ListPeriods } from '../components/period/list-periods';
import { NameIdType } from '@/utils/type/misc';

const initialState = { id: 0, name: '' };
export const PeriodDatePage = () => {
  const [levelDetail, setLevelDetail] = useState<NameIdType<number>>(initialState);

  return (
    <>
      <PageContentHeader heading='Academic Level with Periods Dates' icon={Info} />
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
