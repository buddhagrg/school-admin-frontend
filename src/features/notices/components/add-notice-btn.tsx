import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddNotice } from './add-notice';

export const AddNoticeBtn = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Box sx={{ ml: ' auto' }}>
        <Button size='small' variant='contained' startIcon={<Add />} onClick={toggleModal}>
          Add Notice
        </Button>
      </Box>

      {modal && <AddNotice closeModal={toggleModal} />}
    </>
  );
};
