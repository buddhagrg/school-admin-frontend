import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';

import { BLOOD_GROUPS, GENDERS, STATUS_LIST } from '@/utils/constants';
import { DATE_FORMAT } from '@/utils/helpers/date';
import type { StaffFormProps } from '../../types';
import { MARITAL_STATUS_LIST } from '../../constant';
import { useGetRolesQuery } from '@/features/roles/roles-api';

export const StaffPersonalInfoForm = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<StaffFormProps>();
  const { data: roleData } = useGetRolesQuery();

  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Full Name</FormLabel>
            <TextField
              size='small'
              {...register('name')}
              placeholder={`Student's full name`}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>System Access</FormLabel>
            <Controller
              name='hasSystemAccess'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    row
                    value={value}
                    onChange={(e) => onChange(e.target.value === 'true')}
                  >
                    {STATUS_LIST.map(({ id, label }) => (
                      <FormControlLabel
                        label={label}
                        value={id}
                        key={label}
                        control={<Radio size='small' />}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Staff Role</FormLabel>
            <Controller
              name='roleId'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    value={value}
                    displayEmpty
                    onChange={(event) => onChange(event.target.value)}
                  >
                    <MenuItem value='' disabled>
                      Select Role
                    </MenuItem>
                    {roleData?.roles
                      ?.filter((role) => role.staticRole !== 'STUDENT')
                      .map(({ id, name }) => (
                        <MenuItem value={id} key={id}>
                          {name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Date of Birth</FormLabel>
            <Controller
              name='dob'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      size: 'small',
                      placeholder: 'Select date'
                    }
                  }}
                  format={DATE_FORMAT}
                  value={typeof value === 'string' ? parseISO(value) : value}
                  onChange={(newDt) => onChange(newDt)}
                />
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Gender</FormLabel>
            <Controller
              name='gender'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <RadioGroup row value={value} onChange={(e) => onChange(e.target.value)}>
                    {GENDERS.map(({ id, name }) => (
                      <FormControlLabel
                        label={name}
                        key={id}
                        value={id}
                        control={<Radio size='small' />}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Marital Status</FormLabel>
            <Controller
              name='maritalStatus'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    <MenuItem value='' disabled>
                      Select Marital Status
                    </MenuItem>
                    {MARITAL_STATUS_LIST.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Join Date</FormLabel>
            <Controller
              name='joinDate'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      size: 'small',
                      placeholder: 'Select date'
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
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size='small' required>
            <FormLabel>Blood Group</FormLabel>
            <Controller
              name='bloodGroup'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                    <MenuItem value='' disabled>
                      Select Blood Group
                    </MenuItem>
                    {BLOOD_GROUPS.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid2>
      </Grid2>
    </>
  );
};
