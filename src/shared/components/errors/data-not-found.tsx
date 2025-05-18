import { SearchOffOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

import { ERROR_MESSAGE } from '../../constants/error-message';
import { HeadingText } from '../heading-text';

export const DataNotFound = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <SearchOffOutlined fontSize='small' />
      <HeadingText text={ERROR_MESSAGE.DATA_NOT_FOUND} color='red' />
    </Box>
  );
};
