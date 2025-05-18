import { Box, Grid2 } from '@mui/material';
import { ListClassTeachers } from '../components/list-class-teachers';
import { AddClassTeacherBtn } from '../components/class/add-class-teacher-btn';
import type { SetupItems } from '@/shared/types';
import { PageContentHeader, ResponsiveBox, SetupInfo } from '@/shared/components';

const items: SetupItems[] = [
  { route: '/class-management/classes-sections', name: 'Class & Sections' },
  { route: '/user-management/staff', name: 'Staff' }
];
export const ClassTeacher = () => {
  return (
    <ResponsiveBox>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PageContentHeader title='Class Teachers' subtitle='Assign teachers to classes' />
        <AddClassTeacherBtn />
      </Box>
      <Box mt={3} />
      <SetupInfo screen='class-teacher' items={items} />
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>
          <ListClassTeachers />
        </Grid2>
      </Grid2>
    </ResponsiveBox>
  );
};
