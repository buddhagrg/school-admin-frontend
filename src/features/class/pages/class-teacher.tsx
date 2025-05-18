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
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <PageContentHeader title='Class Teachers' subtitle='Assign teachers to classes' />
        <AddClassTeacherBtn />
      </Box>
      <Box sx={{ my: 2 }}>
        <SetupInfo screen='class-teacher' items={items} />
      </Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>
          <ResponsiveBox>
            <ListClassTeachers />
          </ResponsiveBox>
        </Grid2>
      </Grid2>
    </>
  );
};
