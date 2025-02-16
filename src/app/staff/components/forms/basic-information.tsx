import { AccountCircle, Call, Email } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { DATE_FORMAT } from '@/utils/helpers/date';
import { genders, maritalStatusList } from '@/constants';
import { useGetRolesQuery } from '@/domains/role-and-permission/api';

type BasicInformationProps<T extends FieldValues> = {
  schema: z.ZodObject<T>;
};

export const BasicInformation = <T extends FieldValues>({ schema }: BasicInformationProps<T>) => {
  const { data } = useGetRolesQuery();
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<T>();

  return (
    <>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AccountCircle sx={{ mr: 1 }} />
        <Typography variant='body1'>Basic Information</Typography>
      </Box>
      <Stack sx={{ my: 2 }} spacing={2}>
        <Box>
          <TextField
            {...register('name' as Path<T>)}
            error={Boolean(errors?.name)}
            helperText={String(errors?.name?.message || '')}
            label='Full Name'
            size='small'
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
        {schema.shape.role && (
          <FormControl size='small' sx={{ width: '180px' }} error={Boolean(errors?.role)}>
            <InputLabel id='role' shrink>
              Role
            </InputLabel>
            <Controller
              name={'role' as Path<T>}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Select
                    label='Role'
                    labelId='role'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    notched
                  >
                    {data?.roles.map((role) => (
                      <MenuItem value={role.id} key={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error?.message}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        )}
        <FormControl size='small' sx={{ width: '180px' }}>
          <InputLabel id='gender' shrink>
            Gender
          </InputLabel>
          <Controller
            name={'gender' as Path<T>}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='Gender'
                  labelId='gender'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {genders.map((gender) => (
                    <MenuItem value={gender.id} key={gender.id}>
                      {gender.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <FormControl size='small' sx={{ width: '180px' }}>
          <InputLabel id='maritalStatus' shrink>
            Marital Status
          </InputLabel>
          <Controller
            name={'maritalStatus' as Path<T>}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select
                  label='>Mairtal Status'
                  labelId='maritalStatus'
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  notched
                >
                  {maritalStatusList.map((m) => (
                    <MenuItem value={m.id} key={m.id}>
                      {m.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
        <Box>
          <TextField
            {...register('phone' as Path<T>)}
            error={Boolean(errors?.phone)}
            helperText={String(errors?.phone?.message || '')}
            label='Phone Number'
            size='small'
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Call fontSize='small' />
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>
        <Box>
          <TextField
            {...register('email' as Path<T>)}
            error={Boolean(errors?.email)}
            helperText={String(errors?.email?.message || '')}
            label='Email'
            size='small'
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email fontSize='small' />
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>
        <Box>
          <Controller
            name={'dob' as Path<T>}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Birth Date'
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(dt) => onChange(dt)}
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            name={'joinDate' as Path<T>}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DatePicker
                label='Join Date'
                format={DATE_FORMAT}
                value={typeof value === 'string' ? parseISO(value) : value}
                onChange={(dt) => onChange(dt)}
                slotProps={{
                  textField: {
                    helperText: error?.message,
                    size: 'small',
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            )}
          />
        </Box>
        <Grid2 container rowSpacing={2}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <TextField
              {...register('qualification' as Path<T>)}
              error={Boolean(errors?.qualification)}
              helperText={String(errors?.qualification?.message || '')}
              multiline
              rows={3}
              fullWidth
              label='Qualification'
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <TextField
              {...register('experience' as Path<T>)}
              error={Boolean(errors?.experience)}
              helperText={String(errors?.experience?.message || '')}
              multiline
              rows={3}
              fullWidth
              label='Experience'
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};
