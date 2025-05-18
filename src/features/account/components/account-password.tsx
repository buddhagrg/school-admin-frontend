import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { ChangePassword } from './change-password';
import { HeadingText, SubSoftText, TitleText } from '@/shared/components';

export const AccountPassword = ({ pwdLastChanged }: { pwdLastChanged: string }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <TitleText text='Security Settings' />
      <SubSoftText text='Manage your account security' />
      <Box mt={2} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <LockOutlined />
        <HeadingText text='Password' />
      </Box>
      <SubSoftText text={pwdLastChanged} />
      <Box mt={2} />
      <Button size='small' variant='contained' onClick={toggleModal}>
        Change Password
      </Button>

      {modal && <ChangePassword closeModal={toggleModal} />}
    </>
  );
};
