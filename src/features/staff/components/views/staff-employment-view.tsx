import { CalendarTodayOutlined, DomainOutlined, WorkOutline } from '@mui/icons-material';
import { useStaffDetail } from '@/features/staff/staff-context-provider';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { AccountDetailLayout } from '@/shared/components';

export const StaffEmploymentView = () => {
  const { state } = useStaffDetail();

  const fields = [
    { icon: WorkOutline, label: 'Staff ID', value: state?.staffId || '' },
    { icon: DomainOutlined, label: 'Department', value: state?.department || '' },
    {
      icon: CalendarTodayOutlined,
      label: 'Joining Date',
      value: getFormattedDate(state?.joinDate || '', DATE_FORMAT)
    }
  ];

  return <AccountDetailLayout heading='Employment' fields={fields} />;
};
