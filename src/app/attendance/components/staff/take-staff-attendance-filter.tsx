import { FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';

import { useGetRolesQuery } from '@/app/roles/roles-api';
import { TakeStaffAttendanceFilterProps } from '../../types';
import { DATE_FORMAT } from '@/utils/helpers/date';

type TakeStaffAttendanceFilterType = {
  methods: UseFormReturn<TakeStaffAttendanceFilterProps>;
  searchUser: () => void;
  clearFilter: () => void;
};
export const TakeStaffAttendanceFilter: FC<TakeStaffAttendanceFilterType> = ({
  methods,
  searchUser,
  clearFilter
}) => {
  const { data: rolesData } = useGetRolesQuery();
  const { control, register } = methods;

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <FormControl fullWidth size='small'>
            <Controller
              name='attendanceDate'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  label='Attendance Date'
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: Boolean(error),
                      helperText: error?.message,
                      InputLabelProps: { shrink: true }
                    }
                  }}
                  format={DATE_FORMAT}
                  value={typeof value === 'string' ? parseISO(value) : value}
                  onChange={(value) => onChange(value)}
                />
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='user-role' shrink>
              Staff Role
            </InputLabel>
            <Controller
              name='roleId'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  notched
                  labelId='user-role'
                  label='Staff Role'
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value=''>
                    <i>Select None</i>
                  </MenuItem>
                  {rolesData?.roles
                    ?.filter((role) => role.staticRoleId !== 2)
                    .map((item) => (
                      <MenuItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 8, md: 3 }}>
          <TextField
            {...register('name')}
            label='Name'
            fullWidth
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
      </Grid2>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 2, marginLeft: { xs: 'none', md: 'auto' } }}>
          <Button
            color='error'
            size='small'
            onClick={clearFilter}
            variant='contained'
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button color='primary' size='small' onClick={searchUser} variant='contained'>
            Search
          </Button>
        </Box>
      </Box>
    </>
  );
};
