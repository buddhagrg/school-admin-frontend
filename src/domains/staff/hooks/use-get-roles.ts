import * as React from 'react';
import { useGetRolesQuery } from '@/domains/role-and-permission/api';
import { Role } from '@/domains/role-and-permission/types';

export const useGetRoles = () => {
  const [roles, setRoles] = React.useState<Role[]>([]);
  const { data } = useGetRolesQuery();

  React.useEffect(() => {
    if (data?.roles) {
      setRoles(data.roles);
    }
  }, [data]);

  return roles;
};
