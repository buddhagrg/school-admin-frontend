import React, { useMemo, useState } from 'react';
import { Box, Paper } from '@mui/material';

import { useGetLeavePoliciesQuery } from '../../leave-policy-api';
import { PolicyItem } from './policy-item';
import type { LeavePolicy } from '../../types';
import { UpdatePolicy } from './update-policy';
import { Loader, SearchText } from '@/shared/components';

export const ListPolicies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetLeavePoliciesQuery();
  const [selectedPolicy, setSelectedPolicy] = useState<LeavePolicy | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPolicies = useMemo(
    () =>
      data?.leavePolicies?.filter((policy) =>
        policy.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [data?.leavePolicies, searchTerm]
  );
  const handleEdit = (data: LeavePolicy) => {
    setSelectedPolicy(data);
  };
  const closeModal = () => {
    setSelectedPolicy(null);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box component={Paper} sx={{ p: 2, maxHeight: '70vh', overflowY: 'auto' }}>
          <SearchText
            titleText='Policy Types'
            subtitleText='Manage different types of leave'
            searchTerm={searchTerm}
            handleChange={handleChange}
            placeholder='Search Policies...'
          />
          <Box mt={3} />
          {filteredPolicies?.map((policy) => (
            <PolicyItem key={policy.id} data={policy} handleEdit={handleEdit} />
          ))}
        </Box>
      )}

      {selectedPolicy?.id && <UpdatePolicy closeModal={closeModal} />}
    </>
  );
};
