import React from 'react';
import { Avatar, Box } from '@mui/material';
import { HeadingText, TitleText } from '@/shared/components';

type AccountMiniProfileProps = {
  name?: string;
  role?: string;
};
export const AccountMiniProfile: React.FC<AccountMiniProfileProps> = ({ name, role }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ mt: 1 }}>
          <Avatar sx={{ width: '60px', height: '60px' }}>U</Avatar>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TitleText text={name!} />
          <HeadingText text={role!} />
        </Box>
      </Box>
    </>
  );
};
