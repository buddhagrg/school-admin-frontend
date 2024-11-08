import { Box, Button, Container, Typography } from '@mui/material';

export const Hero = () => {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ padding: '60px 30px', textAlign: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Organize your school seamlessly.
        </Typography>
        <Typography variant='h4' sx={{ color: '#DF5C52' }}>
          Built for efficient management.
        </Typography>
        <Button variant='contained' sx={{ backgroundColor: '#DF5C52', marginTop: '40px' }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};
