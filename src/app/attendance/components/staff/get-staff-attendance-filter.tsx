import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { useGetAcademicYearsQuery } from '@/app/academic-years/academic-years-api';
import { GetStaffAttendanceFilterProps } from '../../types';
import { useGetRolesQuery } from '@/app/roles/roles-api';
import { AttendanceDateSetting } from '../attendance-date-setting';

type GetStaffAttendanceFilterType = {
  methods: UseFormReturn<GetStaffAttendanceFilterProps>;
  onSearchBtn: () => void;
  onClearBtn: () => void;
};
export const GetStaffAttendanceFilter: React.FC<GetStaffAttendanceFilterType> = ({
  methods,
  onSearchBtn,
  onClearBtn
}) => {
  const { data: academicYearsData } = useGetAcademicYearsQuery();
  const { data: rolesData } = useGetRolesQuery();
  const {
    control,
    register,
    formState: { errors }
  } = methods;

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.academicYearId)}>
            <InputLabel id='academic-year' shrink>
              Academic Year
            </InputLabel>
            <Controller
              name='academicYearId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    labelId='academic-year'
                    label=' Academic Year'
                    value={value}
                    notched
                    onChange={onChange}
                  >
                    <MenuItem value='' disabled>
                      All Academic Years
                    </MenuItem>
                    {academicYearsData?.academicYears.map((item) => (
                      <MenuItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <FormControl fullWidth size='small' error={Boolean(errors.roleId)}>
            <InputLabel id='role' shrink>
              Role
            </InputLabel>
            <Controller
              name='roleId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select labelId='role' label='Role' value={value} notched onChange={onChange}>
                    <MenuItem value=''>All Roles</MenuItem>
                    {rolesData?.roles
                      .filter((role) => ![1, 2, 4, 5].includes(role.staticRoleId))
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
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

      <AttendanceDateSetting methods={methods} />

      <Box sx={{ display: 'flex' }}>
        <Box sx={{ mt: 2, marginLeft: { xs: 'none', md: 'auto' } }}>
          <Button
            color='error'
            size='small'
            onClick={onClearBtn}
            variant='contained'
            sx={{ mr: 2 }}
          >
            Reset
          </Button>
          <Button color='primary' size='small' onClick={onSearchBtn} variant='contained'>
            Search
          </Button>
        </Box>
      </Box>
    </>
  );
};
