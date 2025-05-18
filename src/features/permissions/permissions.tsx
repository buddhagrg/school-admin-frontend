import { useState } from 'react';
import { useGetPermissionsQuery } from './permission-api.ts';
import {
  AddEditPermission,
  DeletePermission,
  ListPermissions,
  permissionFormState
} from './components/index.ts';
import type { PermissionFormProps } from './types/index.ts';
import { ResponsiveBox } from '@/shared/components';

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
    <ResponsiveBox>
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
    </ResponsiveBox>
  );
};
