import React from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid2,
  SvgIconProps,
  TextField
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import type { SchoolFormProps } from '../types';
import { SubSoftText, TitleText } from '@/shared/components';

type SchoolFieldLayoutProps = {
  icon: React.FC<SvgIconProps>;
  heading: string;
  subHeading: string;
  fields: Array<{ id: keyof SchoolFormProps; label: string; mdSize: number }>;
};
export const SchoolFieldLayout: React.FC<SchoolFieldLayoutProps> = ({
  heading,
  subHeading,
  fields,
  icon: Icon
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<SchoolFormProps>();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon color='primary' />
          <TitleText text={heading} />
        </Box>
        <SubSoftText text={subHeading} />
        <Box mb={3} />
        <Grid2 container spacing={3}>
          {fields.map(({ id, label, mdSize }) => (
            <Grid2 size={{ xs: 12, md: mdSize }} key={id}>
              <FormControl fullWidth error={!!errors[id]}>
                <FormLabel>{label}</FormLabel>
                <TextField
                  size='small'
                  {...register(id)}
                  error={!!errors[id]}
                  helperText={errors[id]?.message}
                />
              </FormControl>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
};
