import { SyntheticEvent, useCallback, useEffect } from 'react';
import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { AdminPanelSettings } from '@mui/icons-material';

import { PageContentHeader } from '@/components/page-content-header';
import { TabPanel } from '@/components/tab-panel';
import { ExtendedPermission } from './types';
import { useGetRolesQuery } from './roles-api';
import { useGetPermissionsQuery } from '../permissions/permission-api';
import { RoleProvider, useRolePermission } from './context/role-provider';
import { OverviewTab, RoleTabs } from './components';
import { PermissionProps } from '../permissions/types';

const ViewRoles = () => {
  const { data: rolesData } = useGetRolesQuery();
  const { data: permissionsData } = useGetPermissionsQuery();
  const { state, dispatch } = useRolePermission();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const initializePermissions = useCallback((menus: PermissionProps[]): ExtendedPermission[] => {
    return menus.map((menu) => ({
      ...menu,
      isPermissionAvailable: false,
      subMenus: menu?.subMenus ? initializePermissions(menu.subMenus) : []
    }));
  }, []);

  useEffect(() => {
    if (permissionsData?.permissions) {
      dispatch({
        type: 'SET_PERMISSIONS',
        payload: initializePermissions(permissionsData.permissions)
      });
    }
  }, [permissionsData?.permissions, dispatch, initializePermissions]);
  useEffect(() => {
    if (rolesData) {
      dispatch({ type: 'SET_ROLES', payload: rolesData.roles ?? [] });
      dispatch({ type: 'SET_ROLE_TAB', payload: 0 });
    }
  }, [rolesData, dispatch]);

  const handleRoleTabChange = (_event: SyntheticEvent, index: number) => {
    dispatch({ type: 'SET_ROLE_TAB', payload: index });
  };

  const { roleTab, roles } = state;
  return (
    <>
      <PageContentHeader icon={AdminPanelSettings} title='Roles & Permissions Setting' />
      <Box
        flexDirection={isSmallScreen ? 'column' : 'row'}
        sx={{ display: 'flex', bgcolor: 'background.paper', flexGrow: 1 }}
      >
        <Tabs
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
          variant='scrollable'
          value={roleTab}
          onChange={handleRoleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label='Overview' sx={{ borderBottom: 1, borderColor: 'divider' }} />
          {roles &&
            roles.map(({ id, name, usersAssociated }) => (
              <Tab key={id} label={`${name} (${usersAssociated})`} />
            ))}
        </Tabs>

        <TabPanel value={roleTab} index={0}>
          <OverviewTab />
        </TabPanel>
        <RoleTabs />
      </Box>
    </>
  );
};

export const Roles = () => {
  return (
    <RoleProvider>
      <ViewRoles />
    </RoleProvider>
  );
};
