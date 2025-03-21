import React from 'react';
import { Person2 } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { LeaveHistory } from '@/app/leave/types';
import { UserAccountBasic } from '@/app/manage-users/types';
import { ERROR_MESSAGE } from '@/components/errors';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

type UserDetailProps = {
  leaveHistory: LeaveHistory[];
  user: null | Pick<
    UserAccountBasic,
    'id' | 'name' | 'role' | 'email' | 'currentAddress' | 'phone'
  >;
};
export const UserDetail: React.FC<UserDetailProps> = ({ user, leaveHistory }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' component='div' gutterBottom>
          User Details
        </Typography>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Avatar sx={{ width: 70, height: 70 }}>
              <Person2 />
            </Avatar>
            <Typography variant='subtitle1'>{user?.name}</Typography>
            <Typography variant='body2' color='text.secondary'>
              {user?.email}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, lg: 6 }}>
            <Grid2 container spacing={3}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Role
                </Typography>
                <Typography>{user?.role}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Phone
                </Typography>
                <Typography>{user?.phone}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Current Address
                </Typography>
                <Typography>{user?.currentAddress}</Typography>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  User ID
                </Typography>
                <Typography>{user?.id}</Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>

        <Divider sx={{ mt: 3 }} />

        <Grid2>
          <Typography variant='subtitle2'>Recent Leave History</Typography>
          <List dense>
            {leaveHistory.length > 0 ? (
              leaveHistory.map(({ id, name, status, dateFrom, dateTo, days }) => (
                <ListItem
                  key={id}
                  sx={{
                    backgroundColor: grey[100],
                    mb: 1
                  }}
                >
                  <ListItemText
                    primary={name}
                    secondary={`${getFormattedDate(dateFrom, DATE_FORMAT)} - ${getFormattedDate(dateTo, DATE_FORMAT)}`}
                    sx={{
                      '& .MuiListItemText-secondary': {
                        fontSize: '12px'
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex' }}>
                    <Chip label={status} size='small' />
                    <Typography variant='subtitle2' sx={{ ml: 1, fontSize: '12px' }}>
                      {days} days
                    </Typography>
                  </Box>
                </ListItem>
              ))
            ) : (
              <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>
            )}
          </List>
        </Grid2>
      </CardContent>
    </Card>
  );
};
