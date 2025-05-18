import { useState } from 'react';
import { AccessTimeOutlined, CalendarTodayOutlined } from '@mui/icons-material';
import { Box, Chip } from '@mui/material';

import { ViewLeaveDetail } from '@/features/request-leave/components';
import { COLORS } from '@/theme/custom-colors';
import type { LeaveDetail } from '@/shared/types';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { HeadingText, SubSoftText } from '@/shared/components';

export const OneMonthLeaveItem = ({ leave }: { leave: LeaveDetail }) => {
  const { user, policy, fromDate, toDate, duration } = leave;
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer'
          },
          border: `1px solid ${COLORS.border}`,
          borderRadius: '5px',
          p: 1
        }}
        component='div'
        onClick={toggleModal}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <HeadingText text={user} />
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <CalendarTodayOutlined sx={{ width: 14, height: 14 }} />
            <SubSoftText
              text={`${getFormattedDate(fromDate, DATE_FORMAT)} - ${getFormattedDate(toDate, DATE_FORMAT)}`}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <AccessTimeOutlined sx={{ width: 14, height: 14 }} />
            <SubSoftText text={`${duration} days`} />
          </Box>
        </Box>
        <Chip size='small' variant='outlined' label={policy} sx={{ ml: 'auto' }} />
      </Box>

      {open && <ViewLeaveDetail data={leave} closeModal={toggleModal} />}
    </>
  );
};
