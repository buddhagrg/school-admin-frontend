import * as React from 'react';
import { UserAccountBasicProps } from '@/components/user-account-basic';
import { useGetStaffsQuery } from '../api/staff-api';

export const useGetStaffs = () => {
  const [staffs, setStaffs] = React.useState<UserAccountBasicProps[]>([]);
  const { data } = useGetStaffsQuery({});

  React.useEffect(() => {
    if (data?.staffs) {
      setStaffs(data.staffs);
    }
  }, [data]);

  return staffs;
};
