import React from 'react';
import { Box, SvgIconProps, Typography } from '@mui/material';

type UserDetailInfoProps = {
  icon: React.FC<SvgIconProps>;
  label: string;
  value: string | number;
};
export const UserDetailInfo: React.FC<UserDetailInfoProps> = ({ icon: Icon, label, value }) => {
  return (
    <Box>
      <Typography variant='body2' fontWeight={500}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
        <Icon fontSize='small' color='action' />
        <Typography fontSize='13px'>{value || '-n/a'}</Typography>
      </Box>
    </Box>
  );
};
