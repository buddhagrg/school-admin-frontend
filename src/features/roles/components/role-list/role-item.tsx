import React from 'react';
import { EditNote } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';

import { COLORS } from '@/theme/custom-colors';
import type { RoleWithUsersAssociated } from '../../types';
import { useRolePermission } from '../../context/role-provider';
import { HeadingText, SubSoftText } from '@/shared/components';

type RoleItemProps = {
  data: RoleWithUsersAssociated;
  handleEdit: (data: RoleWithUsersAssociated) => void;
};
export const RoleItem: React.FC<RoleItemProps> = ({ data, handleEdit }) => {
  const {
    dispatch,
    state: { roleDetail }
  } = useRolePermission();
  const isRoleSelected = roleDetail?.id === data.id;
  const { name, status, usersAssociated, isEditable } = data;

  const handleRoleChange = () => {
    dispatch({ type: 'SET_ROLE_DETAIL', payload: data });
  };

  return (
    <Box
      component='div'
      onClick={handleRoleChange}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${isRoleSelected ? blue[600] : COLORS.border}`,
        bgcolor: `${isRoleSelected ? blue[50] : 'white'}`,
        mb: 2,
        p: 2,
        borderRadius: '5px',
        '&:hover': {
          borderColor: isRoleSelected ? blue[600] : '#d2d2d2',
          cursor: 'pointer'
        }
      }}
    >
      <Box>
        <Stack direction='row' columnGap={1}>
          <HeadingText text={name} />
          <Chip
            size='small'
            label={status ? 'Active' : 'Inactive'}
            color={status ? 'success' : 'default'}
            variant='filled'
          />
          <Chip size='small' label={isEditable ? 'Custom' : 'System'} variant='filled' />
        </Stack>
        <SubSoftText text={`${usersAssociated} users associated`} />
      </Box>
      <Box sx={{ ml: 'auto' }}>
        <IconButton
          title='Edit Role'
          size='small'
          onClick={() => handleEdit(data)}
          disabled={!isEditable}
        >
          <EditNote />
        </IconButton>
      </Box>
    </Box>
  );
};
