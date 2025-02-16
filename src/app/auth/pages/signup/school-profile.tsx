import { ChangeEvent, FC, useState } from 'react';
import { AccountCircle, Email, Phone, School } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Paper,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { SchoolProfileProps } from '../../types';

type SchoolProfileType = {
  step1Method: UseFormReturn<SchoolProfileProps>;
};

const fields: { id: keyof SchoolProfileProps; name: string; icon: JSX.Element }[] = [
  { id: 'id', name: 'School ID', icon: <School /> },
  { id: 'name', name: 'Name', icon: <AccountCircle /> },
  { id: 'email', name: 'Email', icon: <Email /> },
  { id: 'phone', name: 'Phone', icon: <Phone /> }
];

export const SchoolProfile: FC<SchoolProfileType> = ({ step1Method }) => {
  const [hasSchoolId, setHasSchoolId] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    register,
    formState: { errors },
    reset
  } = step1Method;

  const onCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    reset();
    setHasSchoolId(event.target.checked);
  };

  return (
    <Box sx={{ width: isSmallScreen ? '100%' : '50%' }}>
      <Container sx={{ '& > :not(style)': { my: 1 } }} component={Paper}>
        {hasSchoolId ? (
          <TextField
            size='small'
            type='text'
            label={'School ID'}
            fullWidth
            variant='standard'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <School />
                  </InputAdornment>
                )
              }
            }}
            {...register('id')}
            error={!!errors.id}
            helperText={errors.id?.message}
          />
        ) : (
          fields
            .filter((field) => field.id !== 'id')
            .map((field) => (
              <TextField
                key={field.id}
                size='small'
                type='text'
                label={field.name}
                fullWidth
                variant='standard'
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position='start'>{field.icon}</InputAdornment>
                  }
                }}
                {...register(field.id)}
                error={!!errors?.[field.id]}
                helperText={errors?.[field.id]?.message}
              />
            ))
        )}
      </Container>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={hasSchoolId} onChange={onCheckChange} />}
          label='I have School ID'
        />
      </FormGroup>
    </Box>
  );
};
