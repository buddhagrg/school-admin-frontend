import { useEffect, useState } from 'react';
import { UserAccountBasicProps } from '@/components/user-account-basic';
import { useGetStaffsQuery } from '../api';

export const useGetStaffs = () => {
  const [staffs, setStaffs] = useState<UserAccountBasicProps[]>([]);
  const { data } = useGetStaffsQuery({});

  useEffect(() => {
    if (data?.staffs) {
      setStaffs(data.staffs);
    }
  }, [data]);

  return staffs;
};
