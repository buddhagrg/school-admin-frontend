import React from 'react';
import { useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { AdminDashboard, DefaultDashboard } from './components';
import { getUserRoleId } from '@/features/auth/auth-slice';
import { StaticRole } from './dashboard-type';
import { useGetDashboardDataQuery } from './dashboard-api';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { Loader } from '@/shared/components';

export const Dashboard = () => {
  const role = useSelector(getUserRoleId);
  const { data, isLoading, isError, error } = useGetDashboardDataQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <>{getErrorMsg(error).message}</>;
  }
  if (!data) {
    return <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
  }

  const renderDashboard = () => {
    const dataMap: Partial<Record<StaticRole, React.JSX.Element>> = {
      ADMIN: <AdminDashboard />
    };

    return dataMap[role!] ?? <DefaultDashboard />;
  };

  return <>{renderDashboard()}</>;
};
