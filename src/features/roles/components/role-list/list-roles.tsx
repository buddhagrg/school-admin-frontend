import { useMemo, useState } from 'react';
import { Box, Paper } from '@mui/material';

import { RoleItem } from './role-item';
import { useRolePermission } from '../../context/role-provider';
import type { RoleWithUsersAssociated } from '../../types';
import { UpdateRole } from './update-role';
import { RoleInfo } from './role-info';
import { SearchText } from '@/shared/components';

export const ListRoles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleWithUsersAssociated | null>(null);
  const {
    state: { roles }
  } = useRolePermission();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = useMemo(
    () => roles?.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [roles, searchTerm]
  );
  const handleEdit = (data: RoleWithUsersAssociated) => {
    setSelectedRole(data);
  };
  const closeModal = () => {
    setSelectedRole(null);
  };

  return (
    <>
      <Box component={Paper} sx={{ p: 2, maxHeight: '70vh', overflowY: 'auto' }}>
        <SearchText
          titleText='User Roles'
          subtitleText='Define roles for different users'
          searchTerm={searchTerm}
          handleChange={handleChange}
          placeholder='Search roles...'
        />
        <Box mt={3} />
        <RoleInfo />
        <Box mt={2} />
        {filteredRoles?.map((role) => (
          <RoleItem key={role.id} data={role} handleEdit={handleEdit} />
        ))}
      </Box>

      {selectedRole?.id && <UpdateRole role={selectedRole} closeModal={closeModal} />}
    </>
  );
};
