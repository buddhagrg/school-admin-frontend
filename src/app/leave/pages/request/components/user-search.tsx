import React from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

type UserSearchProps = {
  userId: number;
  isLoading: boolean;
  onSave: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const UserSearch: React.FC<UserSearchProps> = ({
  userId,
  handleChange,
  isLoading,
  onSave
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' component='div'>
          Search User
        </Typography>
        <Typography sx={{ mb: 4 }} color='text.secondary' variant='body1'>
          Enter User Id to find user details
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box>
            <TextField
              size='small'
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              label='User Id'
              value={userId}
              type='number'
              onChange={handleChange}
            />
          </Box>
          <Button
            loading={isLoading}
            loadingPosition='start'
            type='button'
            size='small'
            variant='contained'
            onClick={onSave}
            disabled={!userId}
            startIcon={<Search />}
          >
            Search User
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
