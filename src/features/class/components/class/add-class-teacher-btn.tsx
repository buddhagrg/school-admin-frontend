import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddClassTeacher } from './add-class-teacher';

export const AddClassTeacherBtn = () => {
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
          Assign Class Teacher
        </Button>
      </Box>

      {isOpen && <AddClassTeacher closeModal={toggleModal} />}
    </>
  );
};
