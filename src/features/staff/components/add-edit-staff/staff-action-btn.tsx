import React, { useState } from 'react';
import { Box, Button, SvgIconProps } from '@mui/material';

import { AddStaff } from './add-staff';
import { EditStaff } from './edit-staff';

type StaffActionBtnProps = {
  id?: number;
  mode: string;
  icon: React.FC<SvgIconProps>;
};
export const StaffActionBtn: React.FC<StaffActionBtnProps> = ({ id, mode, icon: Icon }) => {
  const [action, setAction] = useState<string>('');

  const toggleModal = (newAction: string) => {
    setAction(action ? '' : newAction);
  };

  return (
    <>
      <Box sx={{ ml: 'auto' }}>
        <Button
          size='small'
          variant='contained'
          color='primary'
          startIcon={<Icon fontSize='small' />}
          onClick={() => toggleModal(mode)}
        >
          {mode} Staff
        </Button>
      </Box>

      {action === 'Add' && <AddStaff closeModal={() => toggleModal(mode)} />}
      {action === 'Edit' && <EditStaff id={id!} closeModal={() => toggleModal(mode)} />}
    </>
  );
};
