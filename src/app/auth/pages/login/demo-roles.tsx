import React from 'react';
import { AccountCircleOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

type DemoRolesProps = {
  onClick: () => void;
};
export const DemoRoles: React.FC<DemoRolesProps> = ({ onClick }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
    >
      <Typography gutterBottom variant='body2' color='text.secondary'>
        Demo role - Click to auto-fill
      </Typography>
      <Button
        size='small'
        variant='outlined'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderColor: '#e4e4e7'
        }}
        onClick={onClick}
      >
        <AccountCircleOutlined fontSize='small' color='disabled' />
        <Typography color='text.secondary' sx={{ fontSize: '12px' }}>
          Admin
        </Typography>
      </Button>
    </Box>
  );
};
