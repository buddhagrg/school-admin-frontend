import * as React from 'react';
import { AccessControl } from '@/components/access-control';
import { DeleteAccessControl } from '../components/delete-access-control';
import { AddEditAccessControl } from '../components/add-edit-access-control';
import { useGetPermissionsQuery } from '@/domains/role-and-permission/api';
import { Box, Paper } from '@mui/material';

export type AccessControlFormProps = {
  action: string;
  id: number;
  name: string;
  path: string;
  type: string;
  method: string;
  directAllowedRoleId: string;
};
export const accessControlFormState = {
  action: '',
  id: 0,
  name: '',
  path: '',
  type: '',
  method: '',
  directAllowedRoleId: ''
};

export const ManageAccessControl = () => {
  const [formState, setFormState] = React.useState<AccessControlFormProps>(accessControlFormState);
  const { data, isLoading } = useGetPermissionsQuery();

  const handleAction = (rowData: AccessControlFormProps) => {
    setFormState(rowData);
  };
  const closeModal = () => {
    setFormState(accessControlFormState);
  };

  const { action, id } = formState;
  return (
    <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      <AccessControl
        rowSelection={{}}
        isLoading={isLoading}
        permissions={data?.accessControls ?? []}
        handleAction={handleAction}
      />
      {action === 'delete' && <DeleteAccessControl permissionId={id} closeModal={closeModal} />}
      {(action === 'add' || action === 'edit') && (
        <AddEditAccessControl closeModal={closeModal} formData={formState} />
      )}
    </Box>
  );
};
