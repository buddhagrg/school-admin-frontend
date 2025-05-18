import React from 'react';
import { EditNote } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';

import { COLORS } from '@/theme/custom-colors';
import type { LeavePolicy } from '../../types';
import { usePolicyDetail } from '../../leave-policy-context-provider';
import { HeadingText, SubSoftText } from '@/shared/components';

type PolicyItemProps = {
  data: LeavePolicy;
  handleEdit: (data: LeavePolicy) => void;
};
export const PolicyItem: React.FC<PolicyItemProps> = ({ data, handleEdit }) => {
  const { state, setState } = usePolicyDetail();
  const { id, name, isActive, totalUsersAssociated } = data;
  const isPolicySelected = id === state?.id;

  const handlePolicyChange = () => {
    setState(data);
  };

  return (
    <Box
      component='div'
      onClick={handlePolicyChange}
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${isPolicySelected ? blue[600] : COLORS.border}`,
        bgcolor: `${isPolicySelected ? blue[50] : 'white'}`,
        mb: 2,
        p: 2,
        borderRadius: '5px',
        '&:hover': {
          borderColor: isPolicySelected ? blue[600] : '#d2d2d2',
          cursor: 'pointer'
        }
      }}
    >
      <Box>
        <Stack direction='row' columnGap={1}>
          <HeadingText text={name} />
          <Chip
            size='small'
            label={isActive ? 'Active' : 'Inactive'}
            color={isActive ? 'success' : 'default'}
            variant='filled'
          />
        </Stack>
        <SubSoftText text={`${totalUsersAssociated} users associated`} />
      </Box>
      <Box sx={{ ml: 'auto' }}>
        <IconButton title='Edit Policy' size='small' onClick={() => handleEdit(data)}>
          <EditNote />
        </IconButton>
      </Box>
    </Box>
  );
};
