import { Box } from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';

import { StudentActionBtn, StudentTable } from './components';
import type { SetupItems } from '@/shared/types';
import { PageContentHeader, SetupInfo } from '@/shared/components';

export const Students = () => {
  const items: SetupItems[] = [
    { route: '/class-management/classes-sections', name: 'Classes and sections' },
    { route: '/academic-structure/academic-years', name: 'Academic Years' }
  ];
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PageContentHeader title='Students' subtitle='Manage student records and enrollment' />
        <StudentActionBtn mode='Add' icon={PersonAddAlt} />
      </Box>
      <Box sx={{ my: 2 }}>
        <SetupInfo screen='students' items={items} />
      </Box>
      <StudentTable />
    </>
  );
};
