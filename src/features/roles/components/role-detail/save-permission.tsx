import { Save } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useSaveRolePermissionsMutation } from '../../roles-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useRolePermission } from '../../context/role-provider';
import type { Permission, RolePermission } from '../../types';

export const SavePermission = () => {
  const [savePermissions, { isLoading }] = useSaveRolePermissionsMutation();
  const {
    state: { permissions, roleDetail }
  } = useRolePermission();

  const getSelectedPermissions = (): Permission[] => {
    return permissions
      .filter((parent) => parent.isPermissionAvailable)
      .map((parent) => ({
        id: parent.id,
        subPermissions: parent.subMenus
          ?.filter((menu) => menu.isPermissionAvailable)
          .map((menu) => menu.id)
      }));
  };

  const onSave = async () => {
    try {
      if (!roleDetail?.id) return;

      const selectedPermissions = getSelectedPermissions();
      const payload: RolePermission = {
        roleId: roleDetail.id,
        permissions: selectedPermissions
      };
      const result = await savePermissions(payload).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const isSaveBtnDisabled =
    roleDetail?.staticRole === 'ADMIN' || getSelectedPermissions().length <= 0;
  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        sx={{ ml: 'auto' }}
        size='small'
        variant='contained'
        color='primary'
        loadingPosition='start'
        startIcon={<Save />}
        loading={isLoading}
        onClick={onSave}
        disabled={isSaveBtnDisabled}
      >
        Save Permissions
      </Button>
    </Box>
  );
};
