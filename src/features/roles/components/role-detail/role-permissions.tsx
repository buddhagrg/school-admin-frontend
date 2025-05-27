import { useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';

import { useRolePermission } from '../../context/role-provider';
import { PermissionItem } from './permission-item';
import { SavePermission } from './save-permission';
import { useGetRolePermissionsQuery } from '../../roles-api';
import { ApiResponseAlert } from '@/shared/components';
import { getErrorMsg } from '@/utils/helpers/get-error-message';

export const RolePermissions = () => {
  const {
    dispatch,
    state: { permissions, roleDetail }
  } = useRolePermission();
  const { data, isLoading, isFetching, isError, error } = useGetRolePermissionsQuery(
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

  const errorMsg =
    getErrorMsg(error).httpStatusCode === 404
      ? 'No any permissions assigned to this role.'
      : getErrorMsg(error).message;
  return (
    <>
      {isError && (
        <Box mb={2}>
          <ApiResponseAlert
            severity='error'
            open={true}
            messages={[errorMsg]}
            shouldShowCloseIcon={false}
          />
        </Box>
      )}

      {isFetching && <LinearProgress />}
      {permissions.length > 0
        ? permissions?.map((item) => <PermissionItem key={item.id} item={item} />)
        : null}
      {roleDetail && <SavePermission />}
    </>
  );
};
