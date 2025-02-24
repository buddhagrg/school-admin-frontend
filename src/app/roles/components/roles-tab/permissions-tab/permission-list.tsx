import { FC, MouseEvent, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { MRT_RowSelectionState } from 'material-react-table';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useRolePermission } from '@/app/roles/context/role-provider';
import { Permission } from '@/components/permission';
import {
  useGetRolePermissionsQuery,
  useAssignRolePermissionsMutation,
  useDeleteRolePermissionsMutation
} from '@/app/roles/api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ExtendedPermission } from '@/app/roles/types';
import { PermissionProps } from '@/utils/type/misc';

type PermissionListProps = {
  roleId: number;
};
const updatePermissionsAvailability = (
  permissions: ExtendedPermission[],
  currentRolePermissions: PermissionProps[]
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

export const PermissionList: FC<PermissionListProps> = ({ roleId }) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [currentRolePermissions, setCurrentRolePermissions] = useState<ExtendedPermission[]>([]);
  const { data, isLoading: isFetchingCurrentRolePermission } = useGetRolePermissionsQuery(roleId);
  const [assignPermissions, { isLoading: isAssigningPermissions }] =
    useAssignRolePermissionsMutation();
  const [deletePermissions, { isLoading: isDeletingPermissions }] =
    useDeleteRolePermissionsMutation();
  const {
    state: { permissions }
  } = useRolePermission();

  useEffect(() => {
    if (permissions) {
      const updatedPermissions = updatePermissionsAvailability(
        permissions,
        data?.permissions ?? []
      );
      setCurrentRolePermissions(updatedPermissions);
    }
  }, [roleId, permissions, data]);

  useEffect(() => {
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

  const handleSave = async (type: string, event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const ids = Object.keys(rowSelection);
      if (ids.length <= 0) {
        return;
      }

      const payload = {
        id: roleId!,
        permissions: ids
      };
      const result =
        type === 'delete'
          ? await deletePermissions(payload).unwrap()
          : await assignPermissions(payload).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        <Permission
          rowSelection={rowSelection}
          permissions={currentRolePermissions}
          onRowSelectChange={setRowSelection}
          isLoading={isFetchingCurrentRolePermission}
        />

        <Box sx={{ marginTop: '20px' }}>
          <Button
            loading={isDeletingPermissions}
            loadingPosition='start'
            size='medium'
            variant='contained'
            color='error'
            sx={{ marginRight: '10px' }}
            onClick={(event) => handleSave('delete', event)}
          >
            Delete
          </Button>
          <Button
            loading={isAssigningPermissions}
            loadingPosition='start'
            size='medium'
            variant='contained'
            onClick={(event) => handleSave('assign', event)}
          >
            Assign
          </Button>
        </Box>
      </Box>
    </>
  );
};
