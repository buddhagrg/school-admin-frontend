import { FC } from 'react';
import { Email, Person, Phone, School, SupervisorAccount } from '@mui/icons-material';
import { Box, Card, CardContent, Divider, Grid2, Typography } from '@mui/material';

type ViewMiniAvatarProps = {
  name: string;
  roleName?: string | null;
  email: string;
  phone: string;
  schoolName?: string;
};

export const ViewMiniAvatar: FC<ViewMiniAvatarProps> = ({
  name,
  roleName,
  email,
  phone,
  schoolName
}) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Person sx={{ mr: 1 }} />
          <Typography variant='h6'>{name}</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>School</Typography>
            </Box>
            <Typography variant='body1'>{schoolName}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SupervisorAccount sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Role</Typography>
            </Box>
            <Typography variant='body1'>{roleName}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Email</Typography>
            </Box>
            <Typography variant='body1'>{email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant='subtitle2'>Phone</Typography>
            </Box>
            <Typography variant='body1'>{phone}</Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
