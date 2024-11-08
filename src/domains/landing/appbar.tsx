import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { getUserRoleId, isUserAuthenticated } from '../auth/slice';

export const Appbar = () => {
  const pages: Array<{ name: string; path: string }> = [{ name: 'Features', path: '#features' }];
  const isAuthenticated = useSelector(isUserAuthenticated);
  const userRoleId = useSelector(getUserRoleId);

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

          {isAuthenticated ? (
            <Button
              component={Link}
              to={userRoleId === 1 ? '/schools' : '/app'}
              sx={{ color: '#DF5C52', textTransform: 'none', fontSize: 16 }}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to='/auth/login'
                sx={{ textTransform: 'none', fontSize: 16, color: 'inherit' }}
              >
                Sign In
              </Button>
              <Button
                variant='contained'
                component={Link}
                to='/auth/signup'
                sx={{
                  ml: 1,
                  backgroundColor: '#DF5C52',
                  color: 'white',
                  textTransform: 'none',
                  fontSize: 16
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
