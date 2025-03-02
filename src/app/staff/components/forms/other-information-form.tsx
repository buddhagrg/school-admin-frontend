import { More } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StaffFormProps } from '../../types';
import { useGetStaffsQuery } from '../../staff-api';

export const OtherInformationForm = ({ action }: { action: string }) => {
  const { data } = useGetStaffsQuery();

  const {
    control,
    formState: { errors }
  } = useFormContext<StaffFormProps>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <More sx={{ mr: 1 }} />
        <Typography variant='body1'>Others</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <Box>
          <FormControl size='small' sx={{ width: '250px' }} error={Boolean(errors?.reporterId)}>
            <InputLabel id='role' shrink>
              Reports To
            </InputLabel>
            <Controller
              name='reporterId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    name='reporterId'
                    label='Reports To'
                    labelId='reporterId'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    notched
                  >
                    {data?.staff.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Box>

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
