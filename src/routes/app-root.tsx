import { useMemo } from 'react';
import { matchRoutes, Outlet, useLocation } from 'react-router-dom';

import { usePermission } from '@/shared/hooks';
import { routes } from './router';
import { MainLayout, PageNotFound, PermissionErrorLayout } from '@/shared/components';

export const AppRoot = () => {
  const { hasData, doesRouteExist } = usePermission();

  const location = useLocation();
  const matchedRoute = matchRoutes(routes, location?.pathname);
  const currentPath = useMemo(() => {
    if (matchedRoute && matchedRoute.length > 1) {
      const routePath = matchedRoute[1].route?.path;
      if (routePath) return routePath;
    }
    return '';
  }, [matchedRoute]);

  if (!hasData) return <PermissionErrorLayout error='No permission data available' />;

  const isRouteAvailable = doesRouteExist(currentPath);
  return <MainLayout>{isRouteAvailable ? <Outlet /> : <PageNotFound />}</MainLayout>;
};
