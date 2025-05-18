import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import {
  useAddUserToPolicyMutation,
  useGetEligibleLeavePolicyUsersQuery
} from '../../leave-policy-api';
import { type PolicyUsersProps, PolicyUsersSchema } from '../../types';
import { usePolicyDetail } from '../../leave-policy-context-provider';
import { DialogModal } from '@/shared/components';

type AssignUsersProps = {
  closeModal: () => void;
};

export const AssignUsers: React.FC<AssignUsersProps> = ({ closeModal }) => {
  const { state } = usePolicyDetail();
  const { data } = useGetEligibleLeavePolicyUsersQuery();
  const [assignUsers, { isLoading: isAddingUsersToPolicy }] = useAddUserToPolicyMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm<PolicyUsersProps>({
    defaultValues: { users: [] },
    resolver: zodResolver(PolicyUsersSchema)
  });
  const [searchText, setSearchText] = useState<string>('');

  const filteredUsers = useMemo(() => {
    const searchTextLow = searchText.toLowerCase();
    return data?.users.filter(({ name }) => name.toLowerCase().includes(searchTextLow));
  }, [searchText, data?.users]);

  useEffect(() => {
    setValue('users', []);
  }, [setValue]);

  const onSave = async (data: PolicyUsersProps) => {
    try {
      if (!state?.id) return;

      const { users: userList } = data;
      const users = userList.length > 0 ? userList.join(',') : '';
      const result = await assignUsers({ users, id: state.id }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <DialogModal
      isSaving={isAddingUsersToPolicy}
      isModalClosedOnOutClick={false}
      isOpen={true}
      titleText='Add People'
      contextText={
        <Alert severity='info'>
          One Person can be added to only one policy. If a person is already part of another policy
          and is being assigned to new one, then the person will only be part of the policy being
          assigned to.
        </Alert>
      }
      closeModal={closeModal}
      handleSave={handleSubmit(onSave)}
    >
      <FormControl fullWidth size='small' sx={{ my: 3 }} error={!!errors.users}>
        <FormLabel>Users</FormLabel>
        <Controller
          name='users'
          control={control}
          render={({ field: { onChange, value: users } }) => (
            <Select
              MenuProps={{ autoFocus: false }}
              multiple
              value={users}
              onChange={(event) => {
                const {
                  target: { value }
                } = event;
                onChange(typeof value === 'string' ? value.split(',').map(Number) : value);
              }}
              renderValue={(selected) =>
                selected
                  .map((id) => {
                    const user = data?.users.find((u) => u.id === Number(id));
                    return user ? user.name : '';
                  })
                  .join(',')
              }
              onClose={() => setSearchText('')}
            >
              <ListSubheader>
                <TextField
                  size='small'
                  autoFocus
                  placeholder='Type to search...'
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Search />
                        </InputAdornment>
                      )
                    }
                  }}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== 'Escape') {
                      e.stopPropagation();
                    }
                  }}
                />
              </ListSubheader>
              {filteredUsers &&
                filteredUsers.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <Checkbox checked={users.includes(id)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
            </Select>
          )}
        />
        <FormHelperText error>{errors.users?.message}</FormHelperText>
      </FormControl>
    </DialogModal>
  );
};
