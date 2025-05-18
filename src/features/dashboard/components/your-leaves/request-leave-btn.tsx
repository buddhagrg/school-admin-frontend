import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

export const RequestLeaveBtn = () => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        size='small'
        variant='contained'
        startIcon={<Add fontSize='small' />}
        onClick={toggleModal}
      >
        Request Leave
      </Button>
    </>
  );
};
