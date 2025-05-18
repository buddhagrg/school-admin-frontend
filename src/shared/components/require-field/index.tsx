import { InfoOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { SubSoftText } from '../sub-soft-text';

export const RequiredField = () => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <InfoOutlined fontSize='small' color='disabled' />
    <SubSoftText text={`Fields marked with * are required`} />
  </Box>
);
