import { ExitToApp, HighlightOff, Schedule, TaskAlt } from '@mui/icons-material';
import { blue, green, orange, red, teal } from '@mui/material/colors';
import { AttendanceStatus, AttendanceStatusColor } from './types';

export const STATUS_ICONS: Record<AttendanceStatus, JSX.Element> = {
  PR: <TaskAlt color='success' />,
  AB: <HighlightOff color='error' />,
  LP: <Schedule color='warning' />,
  EL: <ExitToApp color='primary' />
};
export const STATUS_COLORS: Record<AttendanceStatus, AttendanceStatusColor> = {
  PR: 'success',
  AB: 'error',
  LP: 'warning',
  EL: 'primary'
};

export const STATUS_ICON_BG_COLOR: Record<AttendanceStatus | 'CC', string> = {
  PR: green[100],
  AB: red[100],
  LP: orange[100],
  EL: blue[100],
  CC: teal[100]
};
