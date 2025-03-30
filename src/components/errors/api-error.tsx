import { ErrorOutline } from '@mui/icons-material';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { COLORS } from '@/theme/custom-colors';

export const ApiError = ({ messages }: { messages: string[] }) => {
  if (messages.length <= 0) {
    return null;
  }

  return (
    <Box
      sx={{
        color: `${COLORS.error}`,
        border: `1px solid ${COLORS.error}`,
        borderRadius: '5px',
        fontSize: '15px',
        padding: '5px'
      }}
    >
      <Box display='flex' alignItems='center'>
        <ErrorOutline sx={{ color: COLORS.error, marginRight: '3px', fontSize: '16px' }} />
        <Typography variant='body1'>Following error occured:</Typography>
      </Box>
      <List dense disablePadding sx={{ listStyleType: 'disc', marginLeft: 3 }}>
        {messages.map((msg) => (
          <ListItem disablePadding sx={{ display: 'list-item' }}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
