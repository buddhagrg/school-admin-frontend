import * as React from 'react';
import { getUserScreens, setUserPermissions } from '@/domains/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetMyPermissionsQuery } from '@/domains/role-and-permission/api';

export const usePermission = () => {
  const dispatch = useDispatch();
  const routes = useSelector(getUserScreens);
  const { data, isLoading, isError, error } = useGetMyPermissionsQuery();

  React.useEffect(() => {
    if (data?.permissions) {
      const { menus, apis, uis } = data.permissions;
      dispatch(
        setUserPermissions({
          menus,
          apis,
          uis
        })
      );
    }
  }, [dispatch, data?.permissions]);

  const doesRouteExist = (route: string) => {
    return routes?.some((r) => r.path === route);
  };

  const permissionState = React.useMemo(() => {
    return {
      isLoading,
      isError,
      errorMessage: isError ? getErrorMsg(error).message : '',
      hasData: Boolean(data),
      doesRouteExist
    };
  }, [isLoading, isError, error, data, routes]);

  return permissionState;
};
