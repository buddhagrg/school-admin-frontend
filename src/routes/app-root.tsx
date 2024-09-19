import * as React from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import { MainLayout, PermissionErrorLayout } from '@/components/layout';
import { usePermission } from '@/hooks';
import { NotFound } from '@/components/errors';

export const AppRoot = () => {
  const { isLoading, isError, errorMessage, hasData, doesRouteExist } = usePermission();

  const matches = useMatches();
  const currentPath = React.useMemo(() => {
    return matches.length > 1 ? matches[1].pathname.replace('/app/', '') : '';
  }, [matches]);

  if (isLoading) return <PermissionErrorLayout error='Checking permission...' />;
  if (isError) return <PermissionErrorLayout error={errorMessage} />;
  if (!hasData) return <PermissionErrorLayout error='No permission data available' />;

  const isRouteAvailable = doesRouteExist(currentPath);
  return <MainLayout>{isRouteAvailable ? <Outlet /> : <NotFound />}</MainLayout>;
};
