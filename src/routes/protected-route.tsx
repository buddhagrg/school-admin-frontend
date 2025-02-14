import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from '@/domains/auth/slice';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useSelector(isUserAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login`} replace />;
  }

  return children;
};
