import { useState } from 'react';
import { Box, Paper } from '@mui/material';

import { Permission } from '@/components/permission.tsx';
import { DeletePermission } from '../components/delete-permission.tsx';
import { AddEditPermission } from '../components/add-edit-permission.tsx';
import { useGetPermissionsQuery } from '../api/permission-api.ts';

export type PermissionFormProps = {
  action: string;
  id: number;
  name: string;
  path: string;
  type: string;
  method: string;
  directAllowedRoleId: string;
};
export const permissionFormState = {
  action: '',
  id: 0,
  name: '',
  path: '',
  type: '',
  method: '',
  directAllowedRoleId: ''
};

export const PermissionPage = () => {
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
      <Permission
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
