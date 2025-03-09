import { FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { useGetRolesQuery } from '@/app/roles/roles-api';
import { StaffAttendanceCurrentFilterProps } from '../types';

type StaffAttendanceFilterType = {
  methods: UseFormReturn<StaffAttendanceCurrentFilterProps>;
  searchUser: () => void;
  clearFilter: () => void;
};
export const StaffAttendanceFilter: FC<StaffAttendanceFilterType> = ({
  methods,
  searchUser,
  clearFilter
}) => {
  const { data: rolesData } = useGetRolesQuery();
  const { control, register } = methods;

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='body1' sx={{ mb: 3 }}>
        Filter Criteria
      </Typography>
      <Grid2 container spacing={2}>
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
                  labelId='user-role'
                  label='User Role'
                  value={value}
                  notched
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
    </Box>
  );
};
