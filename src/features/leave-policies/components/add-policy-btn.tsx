import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddPolicy } from './add-policy';

export const AddPolicyBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ ml: { xs: 'left', md: 'auto' } }}>
        <Button
          startIcon={<Add />}
          size='small'
          color='primary'
          variant='contained'
          onClick={toggleModal}
        >
          Add New Policy
        </Button>
      </Box>
      {isOpen && <AddPolicy closeModal={toggleModal} />}
    </>
  );
};
