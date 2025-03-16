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
    totalPresentDays
  } = data;
  const stats = [
    {
      title: 'Operating Days',
      stat: totalOperatingDays,
      icon: <EventAvailable />,
      bgColor: STATUS_ICON_BG_COLOR['CC']
    },
    {
      title: 'Absent',
      stat: totalAbsentDays,
      icon: STATUS_ICONS['AB'],
      bgColor: STATUS_ICON_BG_COLOR['AB']
    },
    {
      title: 'Present',
      stat: totalPresentDays,
      icon: STATUS_ICONS['PR'],
      bgColor: STATUS_ICON_BG_COLOR['PR']
    },
    {
      title: 'Early Leave',
      stat: totalEarlyLeaveDays,
      icon: STATUS_ICONS['EL'],
      bgColor: STATUS_ICON_BG_COLOR['EL']
    },
    {
      title: 'Late Present',
      stat: totalLatePresentDays,
      icon: STATUS_ICONS['LP'],
      bgColor: STATUS_ICON_BG_COLOR['LP']
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
