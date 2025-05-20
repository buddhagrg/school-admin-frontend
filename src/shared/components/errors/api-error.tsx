import {
  Alert,
  AlertTitle,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Clear } from '@mui/icons-material';

export const ApiError = ({
  messages,
  closeAlert,
  open = true
}: {
  messages: string[];
  closeAlert: () => void;
  open: boolean;
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                closeAlert();
              }}
            >
              <Clear fontSize='small' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          <List dense disablePadding sx={{ listStyleType: 'disc', marginLeft: 2 }}>
            {messages.map((msg) => (
              <ListItem disablePadding sx={{ display: 'list-item' }} key={msg}>
                <ListItemText primary={msg} />
              </ListItem>
            ))}
          </List>
        </Alert>
      </Collapse>
    </Box>
  );
};
