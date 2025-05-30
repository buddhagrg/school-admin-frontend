import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getUserScreens, isUserAuthenticated } from '@/features/auth/auth-slice';

export const usePermission = () => {
  const routes = useSelector(getUserScreens);
  const user = useSelector(isUserAuthenticated);

  const doesRouteExist = useCallback(
    (route: string) => {
      return routes?.some((r) => r.path === route || route === '');
    },
    [routes]
  );

  const permissionState = useMemo(() => {
    return {
      hasData: user,
      doesRouteExist
    };
  }, [user, doesRouteExist]);

  return permissionState;
};
