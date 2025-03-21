import { ExitToApp, HighlightOff, PausePresentation, Schedule, TaskAlt } from '@mui/icons-material';
import { blue, cyan, green, orange, red, teal } from '@mui/material/colors';
import { AttendanceStatus, AttendanceStatusColor } from './types';

export const STATUS_ICONS: Record<AttendanceStatus, JSX.Element> = {
  PRESENT: <TaskAlt color='success' />,
  ABSENT: <HighlightOff color='error' />,
  LATE_PRESENT: <Schedule color='warning' />,
  EARLY_LEAVE: <ExitToApp color='primary' />,
  ON_LEAVE: <PausePresentation color='info' />
};
export const STATUS_COLORS: Record<AttendanceStatus, AttendanceStatusColor> = {
  PRESENT: 'success',
  ABSENT: 'error',
  LATE_PRESENT: 'warning',
  EARLY_LEAVE: 'primary',
  ON_LEAVE: 'info'
};

export const STATUS_ICON_BG_COLOR: Record<AttendanceStatus | 'COMMON', string> = {
  PRESENT: green[100],
  ABSENT: red[100],
  LATE_PRESENT: orange[100],
  EARLY_LEAVE: blue[100],
  COMMON: teal[100],
  ON_LEAVE: cyan[100]
};
