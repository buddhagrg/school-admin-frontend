import * as React from 'react';
import { Box } from '@mui/material';

import { useRolePermission } from '@/domains/role-and-permission/context/role-permission-provider';
import { AccessControl } from '@/components/access-control';
import {
  useGetRolePermissionsQuery,
  useUpdateRolePermissionMutation
} from '@/domains/role-and-permission/api';
import { LoadingButton } from '@mui/lab';
import { MRT_RowSelectionState } from 'material-react-table';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ExtendedPermission } from '@/domains/role-and-permission/types';
import { Permission } from '@/utils/type/misc';

type PermissionListProps = {
  roleId: number;
};
const updatePermissionsAvailability = (
  permissions: ExtendedPermission[],
  currentRolePermissions: Permission[]
): ExtendedPermission[] => {
  return permissions.map((permission) => {
    const rolePermission = currentRolePermissions.find((p) => p.id === permission.id);
    const updatedSubPermissions =
      permission?.subMenus && permission.subMenus.length > 0
        ? updatePermissionsAvailability(
            permission.subMenus as ExtendedPermission[],
            currentRolePermissions
          )
        : [];

    return {
      ...permission,
      isPermissionAvailable: rolePermission ? true : false,
      subMenus: updatedSubPermissions
    };
  });
};

export const PermissionList: React.FC<PermissionListProps> = ({ roleId }) => {
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>({});
  const [currentRolePermissions, setCurrentRolePermissions] = React.useState<ExtendedPermission[]>(
    []
  );
  const { data, isLoading: isFetchingCurrentRolePermission } = useGetRolePermissionsQuery(roleId);
  const [updatePermissions, { isLoading: isUpdatingPermissions }] =
    useUpdateRolePermissionMutation();
  const {
    state: { permissions }
  } = useRolePermission();

  React.useEffect(() => {
    if (permissions) {
      const updatedPermissions = updatePermissionsAvailability(
        permissions,
        data?.permissions ?? []
      );
      setCurrentRolePermissions(updatedPermissions);
    }
  }, [roleId, permissions, data]);

  React.useEffect(() => {
    if (currentRolePermissions && currentRolePermissions.length > 0) {
      const initialSelected = currentRolePermissions.reduce((acc, menu) => {
        if (menu.isPermissionAvailable) {
          acc[menu.id.toString()] = true;
        }
        menu.subMenus?.forEach((subMenu) => {
          if (subMenu.isPermissionAvailable) {
            acc[subMenu.id.toString()] = true;
          }
        });
        return acc;
      }, {} as MRT_RowSelectionState);

      setRowSelection(initialSelected);
    }
  }, [currentRolePermissions]);

  const handleSave = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const ids = Object.keys(rowSelection);
      const result = await updatePermissions({
        id: roleId!,
        permissions: ids.length > 0 ? ids.join(',') : ''
      }).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        <AccessControl
          rowSelection={rowSelection}
          permissions={currentRolePermissions}
          onRowSelectChange={setRowSelection}
          isLoading={isFetchingCurrentRolePermission}
        />

        <LoadingButton
          loading={isUpdatingPermissions}
          sx={{ marginTop: '20px' }}
          size='medium'
          variant='contained'
          onClick={handleSave}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
};
