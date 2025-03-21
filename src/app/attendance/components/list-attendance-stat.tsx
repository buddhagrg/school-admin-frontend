import React from 'react';
import { EventAvailable } from '@mui/icons-material';
import { Grid2 } from '@mui/material';

import { StaffAttendanceRecord } from '../types';
import { STATUS_ICON_BG_COLOR, STATUS_ICONS } from '../constant';
import { StatCard } from '@/components/stat-card';

type ListAttendanceStatProps = {
  data: StaffAttendanceRecord;
};
export const ListAttendanceStat: React.FC<ListAttendanceStatProps> = ({ data }) => {
  const {
    totalAbsentDays,
    totalEarlyLeaveDays,
    totalLatePresentDays,
    totalOperatingDays,
    totalPresentDays,
    totalLeaveDays
  } = data;
  const stats = [
    {
      title: 'Operating Days',
      stat: totalOperatingDays,
      icon: <EventAvailable />,
      bgColor: STATUS_ICON_BG_COLOR['COMMON']
    },
    {
      title: 'Absent',
      stat: totalAbsentDays,
      icon: STATUS_ICONS['ABSENT'],
      bgColor: STATUS_ICON_BG_COLOR['ABSENT']
    },
    {
      title: 'Present',
      stat: totalPresentDays,
      icon: STATUS_ICONS['PRESENT'],
      bgColor: STATUS_ICON_BG_COLOR['PRESENT']
    },
    {
      title: 'Early Leave',
      stat: totalEarlyLeaveDays,
      icon: STATUS_ICONS['EARLY_LEAVE'],
      bgColor: STATUS_ICON_BG_COLOR['EARLY_LEAVE']
    },
    {
      title: 'Late Present',
      stat: totalLatePresentDays,
      icon: STATUS_ICONS['LATE_PRESENT'],
      bgColor: STATUS_ICON_BG_COLOR['LATE_PRESENT']
    },
    {
      title: 'On Leave',
      stat: totalLeaveDays,
      icon: STATUS_ICONS['ON_LEAVE'],
      bgColor: STATUS_ICON_BG_COLOR['ON_LEAVE']
    }
  ];

  return (
    <Grid2 container spacing={3}>
      {stats.map(({ title, stat, icon, bgColor }) => (
        <Grid2 size={{ xs: 12, md: 3 }} key={title}>
          <StatCard title={title} stat={stat} icon={icon} bgColor={bgColor || 'white'} />
        </Grid2>
      ))}
    </Grid2>
  );
};
