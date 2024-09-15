import { isUserAuthenticated } from '@/domains/auth/slice';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(isUserAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={`/auth/login`} replace />;
  }

  return children;
};
