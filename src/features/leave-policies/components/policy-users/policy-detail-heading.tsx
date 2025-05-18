import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { EditNote } from '@mui/icons-material';

import { usePolicyDetail } from '../../leave-policy-context-provider';
import { UpdatePolicy } from '../policy-list/update-policy';
import { TitleText } from '@/shared/components';

export const PolicyDetailHeading = () => {
  const { state } = usePolicyDetail();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TitleText text={state?.name || ''} />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Button
            color='inherit'
            size='small'
            startIcon={<EditNote fontSize='small' />}
            variant='outlined'
            onClick={toggleModal}
          >
            Edit Policy Detail
          </Button>{' '}
        </Box>
      </Box>

      {isOpen && <UpdatePolicy closeModal={toggleModal} />}
    </>
  );
};
