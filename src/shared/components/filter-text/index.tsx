import { FilterAltOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const FilterText = () => {
  return (
    <Box sx={{ display: 'flex', alignContent: 'center', mb: 2 }}>
      <FilterAltOutlined />
      <Typography variant='body1'>Filters</Typography>
    </Box>
  );
};
