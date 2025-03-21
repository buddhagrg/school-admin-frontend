import { FC, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { LoginRequest } from '../../types';
import { ApiError } from '@/components/errors';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type LoginFormProps = {
  onSubmit: () => void;
  methods: UseFormReturn<LoginRequest>;
  isFetching: boolean;
  apiErrors: string[];
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, methods, isFetching, apiErrors }) => {
  const {
    register,
    formState: { errors }
  } = methods;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth size='small' sx={{ mt: 3 }} variant='outlined'>
        <TextField
          variant='outlined'
          size='small'
          label='Username'
          type='text'
          placeholder='Username'
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </FormControl>

      <FormControl fullWidth size='small' sx={{ my: 4 }} variant='outlined'>
        <InputLabel shrink>Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          label='Password'
          placeholder='Password'
          {...register('password')}
          error={!!errors.password}
          notched
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={togglePasswordVisibility}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error>{errors?.password?.message}</FormHelperText>
      </FormControl>
      <ApiError messages={apiErrors} />
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
