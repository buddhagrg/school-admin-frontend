import { FC } from 'react';
import { AutoDelete, Block, Delete, Done, Drafts, HourglassTop } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { NoticeStatusType } from '../types';

type StatusMap = {
  [key: NoticeStatusType]: ['default' | 'success' | 'error', JSX.Element];
};

const statusMap: StatusMap = {
  DRAFTED: ['default', <Drafts />],
  REVIEW_REQUESTED: ['default', <HourglassTop />],
  DELETE_REQUESTED: ['default', <AutoDelete />],
  REJECTED: ['error', <Block />],
  APPROVED: ['success', <Done />],
  DELETED: ['default', <Delete />]
};

type LeaveStatusProps = {
  statusId: keyof typeof statusMap;
  label: string;
};

export const NoticeStatus: FC<LeaveStatusProps> = ({ statusId, label }) => {
  const [color, icon] = statusMap[statusId] || ['default', null];

  return <Chip icon={icon} label={label} color={color} />;
};
