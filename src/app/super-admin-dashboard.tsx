import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserMenus } from './auth/auth-slice';

export const SuperAdminDashboard = () => {
  const menus = useSelector(getUserMenus);
  console.log(menus);

  useEffect(() => {}, []);
  return <>super admin area</>;
};
