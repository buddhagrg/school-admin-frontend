import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  ListItemText,
  MenuItem,
  MenuList,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { getAppBase, isUserAuthenticated } from '../auth/slice';
import { HomeBar } from '@/components/home-bar';
import { Close, Menu } from '@mui/icons-material';

export const Appbar = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isBigScreen = useMediaQuery(theme.breakpoints.up('md'));

  const pages: Array<{ name: string; path: string }> = [{ name: 'Features', path: '#features' }];
  const isAuthenticated = useSelector(isUserAuthenticated);
  const appBase = useSelector(getAppBase);
  const [open, setOpen] = React.useState<boolean>(false);

  const menus = (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      {pages.map((page) => (
        <Button
          key={page.path}
          component={HashLink}
          to={`/${page.path}`}
          sx={{
            textTransform: 'none',
            fontSize: 16,
            scrollBehavior: 'smooth',
            color: 'inherit'
          }}
        >
          {page.name}
        </Button>
      ))}
    </Box>
  );

  const actions = isAuthenticated ? (
    <Button
      component={Link}
      to={appBase!}
      sx={{ color: '#DF5C52', textTransform: 'none', fontSize: 16, ml: { xs: 1, lg: 0 } }}
    >
      Dashboard
    </Button>
  ) : (
    <>
      <Button
        component={Link}
        to='/auth/login'
        sx={{
          textTransform: 'none',
          fontSize: 16,
          color: 'inherit',
          ml: { xs: 1, lg: 1 },
          mb: { xs: 2, sm: 0 }
        }}
      >
        Sign In
      </Button>
      <Button
        variant='contained'
        component={Link}
        to='/auth/signup'
        sx={{
          ml: { xs: 1, lg: 1 },
          backgroundColor: '#DF5C52',
          color: 'white',
          textTransform: 'none',
          fontSize: 16,
          display: { xs: 'block', sm: 'inline' }
        }}
      >
        Sign Up
      </Button>
    </>
  );

  const toggleDialog = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <HomeBar
        menus={isBigScreen ? menus : ''}
        actions={
          isMediumScreen ? (
            <IconButton size='large' onClick={toggleDialog}>
              <Menu />
            </IconButton>
          ) : (
            actions
          )
        }
      />

      <Dialog
        fullScreen
        open={open}
        onClose={toggleDialog}
        sx={{ display: { xs: '', lg: 'none' } }}
      >
        <HomeBar
          actions={
            <IconButton color='inherit' onClick={toggleDialog} aria-label='close'>
              <Close />
            </IconButton>
          }
        />

        <Container maxWidth='lg' sx={{ ml: 1 }}>
          <MenuList
            sx={{ '& .MuiTypography-root': { fontWeight: '500 !important', fontSize: '18px' } }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} component={HashLink} to={`/${page.path}`}>
                <ListItemText>{page.name}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
          <Box sx={{ display: 'block', gap: 2 }}>{actions}</Box>
        </Container>
      </Dialog>
    </>
  );
};
