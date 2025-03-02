import { useState } from 'react';
import { Box, Paper } from '@mui/material';

import { useGetPermissionsQuery } from './permission-api.ts';
import {
  AddEditPermission,
  DeletePermission,
  ListPermissions,
  permissionFormState
} from './components';
import { PermissionFormProps } from './types';

export const Permissions = () => {
  const [formState, setFormState] = useState<PermissionFormProps>(permissionFormState);
  const { data, isLoading } = useGetPermissionsQuery();

  const handleAction = (rowData: PermissionFormProps) => {
    setFormState(rowData);
  };
  const closeModal = () => {
    setFormState(permissionFormState);
  };

  const { action, id } = formState;
  return (
    <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      <ListPermissions
        rowSelection={{}}
        isLoading={isLoading}
        permissions={data?.permissions ?? []}
        handleAction={handleAction}
      />
      {action === 'delete' && <DeletePermission permissionId={id} closeModal={closeModal} />}
      {(action === 'add' || action === 'edit') && (
        <AddEditPermission closeModal={closeModal} formData={formState} />
      )}
    </Box>
  );
};
