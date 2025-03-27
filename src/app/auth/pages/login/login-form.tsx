import { FC, useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
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
      <FormControl fullWidth size='small' variant='outlined'>
        <FormLabel sx={{ mb: '2px' }}>Username</FormLabel>
        <TextField
          size='small'
          type='text'
          placeholder='Your username'
          fullWidth
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </FormControl>

      <FormControl fullWidth size='small' sx={{ my: 2 }} variant='outlined'>
        <FormLabel sx={{ mb: '2px' }}>Password</FormLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          placeholder='Your password'
          {...register('password')}
          error={!!errors.password}
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
      <Button loading={isFetching} loadingPosition='start' type='submit' variant='contained'>
        <span>Sign In</span>
      </Button>
    </form>
  );
};
