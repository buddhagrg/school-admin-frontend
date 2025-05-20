import React from 'react';
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
import { Cancel } from '@mui/icons-material';

type ApiResponseAlertProps = {
  severity: 'error' | 'success';
  open: boolean;
  messages: string[];
  onClose: () => void;
};
export const ApiResponseAlert: React.FC<ApiResponseAlertProps> = ({
  severity,
  open,
  messages,
  onClose
}) => {
  const renderMessage = () => {
    return messages.length === 1 ? (
      messages[0]
    ) : (
      <List dense disablePadding sx={{ listStyleType: 'disc', marginLeft: 2 }}>
        {messages.map((msg) => (
          <ListItem disablePadding sx={{ display: 'list-item' }} key={msg}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                onClose();
              }}
            >
              <Cancel fontSize='small' />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>{severity === 'error' ? 'Error' : 'Success'}</AlertTitle>
          {renderMessage()}
        </Alert>
      </Collapse>
    </Box>
  );
};
