import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InfoOutlined, Settings } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';

import { PageContentHeader } from '@/components/page-content-header';
import { useGetUsersQuery } from './manage-users-api';
import { UserFilterProps, UserFilterSchema } from './types';
import { UserFilter, UserTable } from './components';
import { FilterText } from '@/components/filter-text';

const initialState: UserFilterProps = {
  roleId: '',
  name: '',
  classId: '',
  sectionId: '',
  roll: ''
};
export const ManageUsers = () => {
  const [filterData, setFilterData] = useState<UserFilterProps>(initialState);
  const { data, isLoading, isError, error } = useGetUsersQuery(filterData);
  const methods = useForm<UserFilterProps>({
    defaultValues: initialState,
    resolver: zodResolver(UserFilterSchema)
  });

  const searchUser = (payload: UserFilterProps) => {
    setFilterData(payload);
  };
  const clearFilter = () => {
    methods.reset(initialState);
  };

  return (
    <Box sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      <PageContentHeader title='Manage Users' icon={Settings} subtitle='View and manage users' />
      <Box component={Paper} sx={{ p: 2 }}>
        <FilterText />
        <UserFilter
          searchUser={methods.handleSubmit(searchUser)}
          clearFilter={clearFilter}
          methods={methods}
        />
      </Box>
      <Box sx={{ my: 10 }} />
      <PageContentHeader icon={InfoOutlined} title='User Information' />
      <UserTable
        users={isError ? [] : data?.users || []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </Box>
  );
};
