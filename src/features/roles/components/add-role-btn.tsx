import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddRole } from './add-role';

export const AddRoleBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ ml: 'auto' }}>
        <Button
          startIcon={<Add />}
          size='small'
          color='primary'
          variant='contained'
          onClick={toggleModal}
        >
          Add New Role
        </Button>
      </Box>
      {isOpen && <AddRole closeModal={toggleModal} />}
    </>
  );
};
