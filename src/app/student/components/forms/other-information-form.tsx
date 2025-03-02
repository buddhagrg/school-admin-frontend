import { More } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StudentProps } from '../../types';

export const OtherInformationForm = ({ action }: { action: string }) => {
  const { control } = useFormContext<StudentProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <More sx={{ mr: 1 }} />
        <Typography variant='body1'>Other Info</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        {action === 'edit' && (
          <FormControl>
            <FormLabel>System Access</FormLabel>
            <RadioGroup row>
              <Controller
                name='hasSystemAccess'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label='Yes'
                    control={<Radio checked={value} onChange={() => onChange(true)} />}
                  />
                )}
              />
              <Controller
                name='hasSystemAccess'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label='No'
                    control={<Radio checked={!value} onChange={() => onChange(false)} />}
                  />
                )}
              />
            </RadioGroup>
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Enable System Access</FormLabel>
          <RadioGroup row>
            <Controller
              name='hasSystemAccess'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  label='Yes'
                  control={<Radio checked={value} onChange={() => onChange(true)} />}
                />
              )}
            />
            <Controller
              name='hasSystemAccess'
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  label='No'
                  control={<Radio checked={!value} onChange={() => onChange(false)} />}
                />
              )}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </>
  );
};
