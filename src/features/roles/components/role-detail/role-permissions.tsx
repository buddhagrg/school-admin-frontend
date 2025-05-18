import { useEffect } from 'react';

import { useRolePermission } from '../../context/role-provider';
import { PermissionItem } from './permission-item';
import { SavePermission } from './save-permission';
import { useGetRolePermissionsQuery } from '../../roles-api';
import { skipToken } from '@reduxjs/toolkit/query';

export const RolePermissions = () => {
  const {
    dispatch,
    state: { permissions, roleDetail }
  } = useRolePermission();
  const { data, isLoading, isFetching, isError } = useGetRolePermissionsQuery(
    roleDetail ? roleDetail.id : skipToken
  );

  useEffect(() => {
    if (!roleDetail?.id) {
      dispatch({ type: 'RESET_PERMISSIONS' });
      return;
    }

    if (!isFetching && !isLoading && !isError && data?.permissions?.length) {
      dispatch({ type: 'UPDATE_ROLE_PERMISSIONS', payload: data.permissions });
    } else if (!isFetching && !isLoading && (isError || !data?.permissions?.length)) {
      dispatch({ type: 'RESET_PERMISSIONS' });
    }
  }, [roleDetail?.id, data, isLoading, isError, isFetching, dispatch]);

  return (
    <>
      {permissions.length > 0
        ? permissions?.map((item) => <PermissionItem key={item.id} item={item} />)
        : null}
      {roleDetail && <SavePermission />}
    </>
  );
};
