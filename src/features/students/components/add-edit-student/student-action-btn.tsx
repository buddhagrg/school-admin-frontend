import React, { useState } from 'react';
import { Box, Button, SvgIconProps } from '@mui/material';

import { AddStudent } from './add-student';
import { EditStudent } from './edit-student';

type StudentActionBtnProps = {
  id?: number;
  mode: string;
  icon: React.FC<SvgIconProps>;
};
export const StudentActionBtn: React.FC<StudentActionBtnProps> = ({ id, mode, icon: Icon }) => {
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
          {mode} Student
        </Button>
      </Box>

      {action === 'Add' && <AddStudent closeModal={() => toggleModal(mode)} />}
      {action === 'Edit' && <EditStudent id={id!} closeModal={() => toggleModal(mode)} />}
    </>
  );
};
