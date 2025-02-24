import { FC } from 'react';
import { PermissionList } from './permission-list';

type PermissionsTabsProps = {
  roleId: number;
};

export const PermissionsTabs: FC<PermissionsTabsProps> = ({ roleId }) => {
  return (
    <>
      <PermissionList roleId={roleId} />
    </>
  );
};
