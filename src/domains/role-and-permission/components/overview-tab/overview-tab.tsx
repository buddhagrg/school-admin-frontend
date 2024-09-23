import { Divider, Typography } from '@mui/material';
import { AddRole } from './add-role';
import { ListRoles } from './list-roles';

export const OverviewTab = () => {
  return (
    <>
      <Typography component='div' sx={{ fontSize: '18px' }}>
        Overview
      </Typography>
      <AddRole />
      <Divider sx={{ my: '10px' }} />
      <ListRoles />
    </>
  );
};
