import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddAcademicYear } from './add-academic-year';

export const AddAcademicYearsBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ ml: 'auto' }}>
      <Button
        startIcon={<Add />}
        size='small'
        color='primary'
        variant='contained'
        onClick={toggleModal}
      >
        Add Academic Year
      </Button>

      {isOpen && <AddAcademicYear closeModal={toggleModal} />}
    </Box>
  );
};
