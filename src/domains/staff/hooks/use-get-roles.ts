import * as React from 'react';
import { Role } from '@/domains/role-and-permission/types';
import { useLazyGetRolesQuery } from '@/domains/role-and-permission/api';

export const useGetRoles = () => {
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [getRoles] = useLazyGetRolesQuery();

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const result = await getRoles().unwrap();
        setRoles(result.roles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoles();
  }, [getRoles]);

  return roles;
};
