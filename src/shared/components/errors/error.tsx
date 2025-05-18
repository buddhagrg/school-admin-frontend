import { ErrorOutline } from '@mui/icons-material';
import { Box } from '@mui/material';
import { HeadingText } from '../heading-text';

export const Error = ({ message }: { message: string }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Box>
        <ErrorOutline color='error' />
      </Box>
      <HeadingText text={message} />
    </Box>
  );
};
