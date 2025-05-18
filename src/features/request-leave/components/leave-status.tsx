import { AccessTime, CancelOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { Chip } from '@mui/material';

export const LEAVE_STATUS_CHIP: Record<string, React.JSX.Element> = {
  PENDING: <Chip size='small' color='warning' label='Pending' icon={<AccessTime />} />,
  REJECTED: <Chip size='small' color='error' label='Rejected' icon={<CancelOutlined />} />,
  APPROVED: <Chip size='small' color='success' label='Approved' icon={<CheckCircleOutlined />} />
};
