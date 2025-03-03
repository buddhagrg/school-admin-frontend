import { Info } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { PageContentHeader } from '@/components/page-content-header';
import { ResponsiveBox } from '@/components/responsive-box';
import { AddFiscalYear, ListFiscalYears } from './components';

export const FiscalYears = () => {
  return (
    <>
      <PageContentHeader title='Manage Fiscal Years' icon={Info} />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ResponsiveBox>
            <ListFiscalYears />
          </ResponsiveBox>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <AddFiscalYear />
        </Grid2>
      </Grid2>
    </>
  );
};
