import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserRoleId, isUserAuthenticated } from '@/app/auth/auth-slice';

export const ProtectedSuperAdminRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(isUserAuthenticated);
  const userRoleId = useSelector(getUserRoleId);

  if (!isAuthenticated) {
    return <Navigate to={`/login`} replace />;
  }

  if (userRoleId !== 1) {
    return <Navigate to='/' replace />;
  }

  return children;
};
