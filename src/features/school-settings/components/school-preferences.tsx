import { Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

import { SubSoftText, TitleText } from '@/shared/components';
import type { SchoolPreferencesProps } from '../types';

export const SchoolPreferences = () => {
  const { control } = useFormContext<SchoolPreferencesProps>();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SettingsOutlined color='primary' />
          <TitleText text='System Preferences' />
        </Box>
        <SubSoftText text='Configure system-wide settings and defaults' />
        <Box mb={3} />
        <Controller
          name='calendarType'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <RadioGroup row value={value} onChange={(e) => onChange(Boolean(e.target.value))}>
                <FormControlLabel value='BS' label='BS' control={<Radio size='small' />} />
                <FormControlLabel value='AD' label='AD' control={<Radio size='small' />} />
              </RadioGroup>
              <FormHelperText error>{error?.message}</FormHelperText>
            </>
          )}
        />
      </CardContent>
    </Card>
  );
};
