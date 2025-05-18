import React from 'react';
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
import { Controller, UseFormReturn } from 'react-hook-form';

import type { NoticeFormProps } from '../types';
import { useGetNoticeRecipientsQuery } from '../notice-api';
import { NOTICE_STATUS_LIST } from '../constant';

type NoticeFormType = {
  methods: UseFormReturn<NoticeFormProps>;
};

export const NoticeForm: React.FC<NoticeFormType> = ({ methods }) => {
  const { data } = useGetNoticeRecipientsQuery();
  const notices = NOTICE_STATUS_LIST.filter((notice) => ['DRAFT', 'PENDING'].includes(notice.code));
  const {
    register,
    setValue,
    formState: { errors },
    control,
    watch
  } = methods;
  const recipientWatch = watch('recipientType');
  const selectedRoleId = watch('recipientRole');

  const getDependentFields = () => {
    const role = data?.noticeRecipients.find((r) => r.id === selectedRoleId);
    if (!role) return { primaryDependents: [] };

    return {
      primaryDependents: role?.primaryDependents?.list ?? []
    };
  };
  const getDependentRole = (type: 'primaryDependents') => {
    return data?.noticeRecipients.find((r) => r.id === selectedRoleId)?.[type].name;
  };

  const handleRoleChange = () => {
    setValue('firstField', '');
  };

  const handleRecipientChange = () => {
    setValue('recipientRole', '');
    setValue('firstField', '');
  };

  const { primaryDependents } = getDependentFields();
  return (
    <>
      <FormControl fullWidth required>
        <FormLabel>Title</FormLabel>
        <TextField
          {...register('title')}
          placeholder=''
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          size='small'
        />
      </FormControl>
      <FormControl fullWidth required sx={{ mt: 2 }}>
        <FormLabel>Description</FormLabel>
        <TextField
          {...register('description')}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          size='small'
          multiline
          minRows={3}
          maxRows={10}
        />
      </FormControl>
      <FormControl
        sx={{ minWidth: { xs: '100%', md: '50%' }, mt: 2 }}
        size='small'
        error={Boolean(errors.status)}
        required
      >
        <FormLabel>Status</FormLabel>
        <Controller
          name='status'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Select value={value} onChange={(e) => onChange(e.target.value)} displayEmpty>
                <MenuItem value='' disabled>
                  Select Status
                </MenuItem>
                {notices.map(({ action, code }) => (
                  <MenuItem key={code} value={code}>
                    {action}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{error?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>

      <FormControl fullWidth required sx={{ mt: 2 }}>
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
                handleRecipientChange();
              }}
            >
              <FormControlLabel value='EV' control={<Radio size='small' />} label='Everyone' />
              <FormControlLabel value='SP' control={<Radio size='small' />} label='Specific' />
            </RadioGroup>
          )}
        />
      </FormControl>

      {recipientWatch === 'SP' && (
        <Grid2 container spacing={2} sx={{ mt: 1 }}>
          <Grid2 size={{ xs: 10, md: 6 }}>
            <FormControl size='small' fullWidth error={Boolean(errors.recipientRole)}>
              <FormLabel>Role</FormLabel>
              <Controller
                name='recipientRole'
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <Select
                      value={value}
                      displayEmpty
                      onChange={(e) => {
                        onChange(e.target.value);
                        handleRoleChange();
                      }}
                    >
                      <MenuItem value='' disabled>
                        Select Role
                      </MenuItem>
                      {data?.noticeRecipients.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error>{error?.message}</FormHelperText>
                  </>
                )}
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 10, md: 6 }}>
            {primaryDependents.length > 0 && (
              <FormControl fullWidth size='small' error={Boolean(errors.firstField)}>
                <FormLabel>{getDependentRole('primaryDependents')}</FormLabel>
                <Controller
                  name='firstField'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <Select
                        value={value}
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        displayEmpty
                      >
                        <MenuItem value='' disabled>
                          Select Option
                        </MenuItem>
                        {primaryDependents.map(({ id, name }) => (
                          <MenuItem key={id} value={id}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error>{error?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>
            )}
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
