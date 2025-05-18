import { useState } from 'react';
import { Box, Button, Chip } from '@mui/material';
import { EditNote, LockOpenOutlined } from '@mui/icons-material';

import { useRolePermission } from '../../context/role-provider';
import { UpdateRole } from '../role-list/update-role';
import { SubSoftText, TitleText } from '@/shared/components';

export const RoleDetailHeading = () => {
  const {
    state: { roleDetail }
  } = useRolePermission();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TitleText text={`Role Details: ${roleDetail?.name}`} />
          <SubSoftText text='View and manage role permissions' />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          {roleDetail?.isEditable ? (
            <Button
              size='small'
              startIcon={<EditNote fontSize='small' />}
              variant='contained'
              onClick={toggleModal}
            >
              Edit Role Detail
            </Button>
          ) : (
            <Chip
              variant='outlined'
              sx={{ p: 1.5 }}
              size='small'
              icon={<LockOpenOutlined color='primary' />}
              label='System'
            />
          )}
        </Box>
      </Box>

      {isOpen && roleDetail && <UpdateRole role={roleDetail} closeModal={toggleModal} />}
    </>
  );
};
