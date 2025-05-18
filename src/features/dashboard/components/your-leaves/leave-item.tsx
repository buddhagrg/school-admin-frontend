import { useState } from 'react';
import { Box } from '@mui/material';
import { AccessTimeOutlined, CalendarTodayOutlined } from '@mui/icons-material';

import { LEAVE_STATUS_CHIP, ViewLeaveDetail } from '@/features/request-leave/components';
import { COLORS } from '@/theme/custom-colors';
import type { LeaveDetail } from '@/shared/types';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { HeadingText, SubSoftText } from '@/shared/components';

export const LeaveItem = ({ leave }: { leave: LeaveDetail }) => {
  const { policy, fromDate, toDate, duration, statusId } = leave;
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
          <HeadingText text={policy} />
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
        <Box sx={{ ml: 'auto' }}>{LEAVE_STATUS_CHIP[statusId]}</Box>
      </Box>

      {open && <ViewLeaveDetail data={leave} closeModal={toggleModal} />}
    </>
  );
};
