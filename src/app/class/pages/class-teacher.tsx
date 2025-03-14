import { Info } from '@mui/icons-material';
import { Box, Grid2 } from '@mui/material';
import { PageContentHeader } from '@/components/page-content-header';
import { ListClassTeachers } from '../components/list-class-teachers';
import { AddClassTeacher } from '../components/class/add-class-teacher';

export const ClassTeacher = () => {
  return (
    <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
      <PageContentHeader title='Class Teachers' icon={Info} />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 8 }}>
          <ListClassTeachers />
        </Grid2>
        <Grid2 size={{ xs: 10, lg: 4 }}>
          <AddClassTeacher />
        </Grid2>
      </Grid2>
    </Box>
  );
};
