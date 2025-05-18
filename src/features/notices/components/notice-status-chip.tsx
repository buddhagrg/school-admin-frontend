import React from 'react';
import {
  CancelOutlined,
  CheckCircleOutlined,
  EditNote,
  HourglassTop,
  PublicOutlined
} from '@mui/icons-material';
import { Chip } from '@mui/material';
import type { NoticeStatusCode } from '../types';

export const NOTICE_STATUS_CHIP: Record<NoticeStatusCode, React.JSX.Element> = {
  DRAFT: <Chip label='Draft' size='small' color='warning' icon={<EditNote />} />,
  PENDING: <Chip label='Pending' size='small' color='default' icon={<HourglassTop />} />,
  APPROVED: <Chip label='Approved' size='small' color='info' icon={<CheckCircleOutlined />} />,
  REJECTED: <Chip label='Rejected' size='small' color='error' icon={<CancelOutlined />} />,
  PUBLISHED: <Chip label='Published' size='small' color='success' icon={<PublicOutlined />} />
};
