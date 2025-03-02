import { FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

import { NoticeFormProps } from '../types';
import { noticeStatusList } from '@/constants';
import { useGetNoticeRecipientsQuery } from '../notice-api';

type Props = {
  isSaving: boolean;
  onSubmit: () => void;
  methods: UseFormReturn<NoticeFormProps>;
  handleRoleChange: (event: SelectChangeEvent<string | number | null>) => void;
  handleRecipientChange: (event: SelectChangeEvent<string | number>) => void;
  selectedRoleId: number | string;
};

export const NoticeForm: FC<Props> = ({
  isSaving,
  methods,
  onSubmit,
  handleRoleChange,
  handleRecipientChange,
  selectedRoleId
}) => {
  const { data } = useGetNoticeRecipientsQuery();
  const {
    register,
    formState: { errors },
    control,
    watch
  } = methods;
  const recipientWatch = watch('recipientType');

  const getDependentFields = () => {
    const role = data?.noticeRecipients.find((r) => r.id === selectedRoleId);
    if (!role) return { primaryDependents: [] };

    return {
      primaryDependents: role.primaryDependents.list
    };
  };
  const getDependentRole = (type: 'primaryDependents') => {
    return data?.noticeRecipients.find((r) => r.id === selectedRoleId)?.[type].name;
  };

  const { primaryDependents } = getDependentFields();
  return (
    <form onSubmit={onSubmit}>
      <TextField
        {...register('title')}
        error={Boolean(errors.title)}
        helperText={errors.title?.message}
        type='text'
        label='Title'
        fullWidth
        size='small'
        sx={{ marginTop: '20px' }}
      />
      <TextField
        {...register('description')}
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        type='text'
        label='Description'
        size='small'
        multiline
        minRows={3}
        maxRows={10}
        fullWidth
        sx={{ marginTop: '30px' }}
      />
      <FormControl
        sx={{ marginTop: '30px', minWidth: { xs: '100%', md: '350px' } }}
        size='small'
        error={Boolean(errors.status)}
      >
        <InputLabel id='notice-status-label' shrink>
          Status
        </InputLabel>
        <Controller
          name='status'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select
                label='Status'
                labelId='notice-status-label'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                notched
              >
                <MenuItem value='' disabled>
                  <em>None</em>
                </MenuItem>
                {noticeStatusList.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
      <Box>
        <FormControl sx={{ mt: 3 }}>
          <FormLabel>Recipient</FormLabel>
          <Controller
            name='recipientType'
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                row
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  handleRecipientChange(e);
                }}
              >
                <FormControlLabel value='EV' control={<Radio size='small' />} label='Everyone' />
                <FormControlLabel value='SP' control={<Radio size='small' />} label='Specific' />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>

      {recipientWatch === 'SP' && (
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <FormControl size='small' fullWidth error={Boolean(errors.recipientRole)}>
              <InputLabel id='role' shrink>
                Role
              </InputLabel>
              <Controller
                name='recipientRole'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <Select
                      label='Role'
                      labelId='role'
                      value={value}
                      notched
                      onChange={(e) => {
                        onChange(e.target.value);
                        handleRoleChange(e);
                      }}
                    >
                      {data?.noticeRecipients.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
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
          <Grid2 size={{ xs: 12, lg: 4 }}>
            {primaryDependents.length > 0 && (
              <FormControl
                sx={{ minWidth: { xs: '100%', md: '350px' } }}
                size='small'
                error={Boolean(errors.firstField)}
              >
                <InputLabel id='firstField' shrink>
                  {getDependentRole('primaryDependents')}
                </InputLabel>
                <Controller
                  name='firstField'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <Select
                        labelId='firstField'
                        value={value}
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        label={getDependentRole('primaryDependents')}
                        notched
                      >
                        <MenuItem value='' disabled>
                          <em>None</em>
                        </MenuItem>
                        {primaryDependents.map(({ id, name }) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{error?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>
            )}
          </Grid2>
        </Grid2>
      )}

      <Button
        loading={isSaving}
        loadingPosition='start'
        type='submit'
        size='medium'
        variant='contained'
        sx={{ margin: '30px 0 10px 0' }}
      >
        Save
      </Button>
    </form>
  );
};
