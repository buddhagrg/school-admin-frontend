import { Box } from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';

import { StaffActionBtn, StaffTable } from './components';
import type { SetupItems } from '@/shared/types';
import { PageContentHeader, SetupInfo } from '@/shared/components';

export const Staff = () => {
  const items: SetupItems[] = [
    { route: '/class-management/classes-sections', name: 'Classes and sections' },
    { route: '/academic-structure/department', name: 'Departments' },
    { route: '/user-management/roles-permissions', name: 'Roles' }
  ];
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PageContentHeader title='Staff' subtitle='Manage all staff members' />
        <StaffActionBtn mode='Add' icon={PersonAddAlt} />
      </Box>
      <SetupInfo screen='staff' items={items} />
      <StaffTable />
    </>
  );
};
