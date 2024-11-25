import * as React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type HomeBarProps = {
  menus?: React.ReactNode;
  actions?: React.ReactNode;
};

export const HomeBar: React.FC<HomeBarProps> = ({ menus, actions }) => {
  return (
    <AppBar
      sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}
      position='relative'
    >
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            sx={{
              mr: 3,
              fontFamily: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            School Admin
          </Typography>

          {menus ? menus : <Box sx={{ flexGrow: 1 }} />}
          {actions}
        </Toolbar>
      </Container>
    </AppBar>
  );
};