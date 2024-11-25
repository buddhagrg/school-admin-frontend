import * as React from 'react';
import { useSelector } from 'react-redux';
import { getUserScreens, isUserAuthenticated } from '@/domains/auth/slice';

export const usePermission = () => {
  const routes = useSelector(getUserScreens);
  const user = useSelector(isUserAuthenticated);

  const doesRouteExist = React.useCallback(
    (route: string) => {
      return routes?.some((r) => r.path === route);
    },
    [routes]
  );

  const permissionState = React.useMemo(() => {
    return {
      hasData: user,
      doesRouteExist
    };
  }, [user, doesRouteExist]);

  return permissionState;
};
