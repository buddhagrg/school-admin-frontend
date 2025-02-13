import * as React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { LoginRequest } from '../../types';

type LoginFormProps = {
  onSubmit: () => void;
  methods: UseFormReturn<LoginRequest>;
  isFetching: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, methods, isFetching }) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          variant='standard'
          size='small'
          type='text'
          placeholder='Username'
          sx={{ margin: '30px 0' }}
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </div>
      <div>
        <TextField
          variant='standard'
          size='small'
          type='password'
          placeholder='Password'
          sx={{ marginBottom: '30px' }}
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>
      <Stack>
        <Button
          loading={isFetching}
          loadingPosition='start'
          type='submit'
          size='small'
          variant='contained'
        >
          <span>Sign In</span>
        </Button>
      </Stack>
    </form>
  );
};
