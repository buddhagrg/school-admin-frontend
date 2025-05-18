import { useCallback, useEffect } from 'react';
import { Box, Grid2 } from '@mui/material';

import type { ExtendedPermission } from './types';
import type { PermissionProps } from '../permissions/types';
import { useGetRolesQuery } from './roles-api';
import { useGetPermissionsQuery } from '../permissions/permission-api';
import { RoleProvider, useRolePermission } from './context/role-provider';
import { AddRoleBtn, ListRoles, RoleDetail, RoleNotSelected } from './components';
import { Loader, PageContentHeader } from '@/shared/components';

const ViewRoles = () => {
  const { data: rolesData, isLoading } = useGetRolesQuery();
  const { data: permissionsData } = useGetPermissionsQuery();
  const {
    state: { roleDetail },
    dispatch
  } = useRolePermission();

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
        type: 'SET_SYSTEM_PERMISSIONS',
        payload: initializePermissions(permissionsData.permissions)
      });
    }
  }, [permissionsData?.permissions, dispatch, initializePermissions]);
  useEffect(() => {
    if (rolesData) {
      dispatch({
        type: 'SET_ROLES',
        payload: rolesData?.roles
      });
      dispatch({ type: 'SET_ROLE_DETAIL', payload: null });
    }
  }, [rolesData, dispatch]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <PageContentHeader
          title='Roles & Permissions'
          subtitle='Manage user roles and their access permissions'
        />
        <AddRoleBtn />
      </Box>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, lg: 4 }}>{isLoading ? <Loader /> : <ListRoles />}</Grid2>
        <Grid2 size={{ xs: 12, lg: 8 }}>{roleDetail ? <RoleDetail /> : <RoleNotSelected />}</Grid2>
      </Grid2>
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
