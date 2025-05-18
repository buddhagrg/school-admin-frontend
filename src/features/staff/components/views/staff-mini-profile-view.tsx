import {
  CalendarTodayOutlined,
  CancelOutlined,
  Circle,
  DomainOutlined,
  Edit,
  SchoolOutlined,
  TaskAltOutlined,
  WorkOutline
} from '@mui/icons-material';
import { Avatar, Box, Chip, Typography } from '@mui/material';

import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useStaffDetail } from '../../staff-context-provider';
import { StaffActionBtn } from '../add-edit-staff/staff-action-btn';
import { PageContentHeader } from '@/shared/components';

export const StaffMiniProfileView = () => {
  const { state } = useStaffDetail();
  const NA = '-n/a';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        textAlign: { xs: 'center', md: 'left' }
      }}
    >
      <Box sx={{ justifyItems: 'center', mb: { xs: 2, md: 0 } }}>
        <Avatar alt='User avatar' sx={{ width: 80, height: 80 }}>
          <Typography variant='h4'>{state?.name?.charAt(0).toUpperCase()}</Typography>
        </Avatar>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: { xs: 0, md: 2 }, gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1,
            alignItems: 'center'
          }}
        >
          <PageContentHeader title={state?.name || NA} />
          <Chip
            sx={{ p: 1 }}
            size='small'
            label={state?.role || NA}
            icon={<SchoolOutlined fontSize='small' />}
            color='info'
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkOutline sx={{ fontSize: '17px' }} />
            <Typography ml={0.3} variant='body2'>
              ID: {state?.staffId}
            </Typography>
          </Box>
          <Circle sx={{ fontSize: '7px', mx: 1, display: { xs: 'none', md: 'block' } }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DomainOutlined sx={{ fontSize: '17px' }} />
            <Typography ml={0.3} variant='body2'>
              Department: {state?.department || NA}
            </Typography>
          </Box>
          <Circle sx={{ fontSize: '7px', mx: 1, display: { xs: 'none', md: 'block' } }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayOutlined sx={{ fontSize: '17px' }} />
            <Typography ml={0.3} variant='body2'>
              Joined {getFormattedDate(state?.joinDate || '', DATE_FORMAT) || NA}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            justifyContent: { xs: 'center', md: 'left' },
            mb: { xs: 1, md: 0 }
          }}
        >
          <Chip
            sx={{ p: 1 }}
            size='small'
            label={state && state?.hasSystemAccess ? 'Active' : 'Inactive'}
            icon={
              state?.hasSystemAccess ? (
                <TaskAltOutlined fontSize='small' />
              ) : (
                <CancelOutlined fontSize='small' />
              )
            }
            color={state?.hasSystemAccess ? 'success' : 'error'}
          />
        </Box>
      </Box>
      {state?.id && <StaffActionBtn id={state.id!} mode='Edit' icon={Edit} />}
    </Box>
  );
};
