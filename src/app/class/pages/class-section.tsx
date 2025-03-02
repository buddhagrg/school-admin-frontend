import { PageContentHeader } from '@/components/page-content-header';
import { Info } from '@mui/icons-material';
import { Box, Grid2 } from '@mui/material';
import { ListClassSection } from '../components/list-class-section';
import { ManageClassSectionTab } from '../components/manage-class-section-tab';

export const ClassSection = () => {
  return (
    <Box sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      <PageContentHeader icon={Info} title='Classes and Sections' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <ListClassSection />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageClassSectionTab />
        </Grid2>
      </Grid2>
    </Box>
  );
};
