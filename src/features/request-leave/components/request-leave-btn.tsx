import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddLeaveRequest } from './leave-action/add-leave-request';

export const RequestLeaveBtn = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Box sx={{ ml: 'auto' }}>
        <Button
          startIcon={<Add fontSize='small' />}
          size='small'
          color='primary'
          variant='contained'
          onClick={toggleModal}
        >
          Request Leave
        </Button>
      </Box>

      {modal && <AddLeaveRequest closeModal={toggleModal} />}
    </>
  );
};
