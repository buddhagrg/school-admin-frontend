import { useEffect, useState } from 'react';
import { staffInitialState } from '../components/forms/staff-initial-state';
import { StaffFormPropsWithId } from '../types';
import { useGetStaffDetailQuery } from '../api';

const initialState: StaffFormPropsWithId = { id: 0, ...staffInitialState };
export const useGetStaffDetail = (id: string | undefined) => {
  const [staff, setStaff] = useState<StaffFormPropsWithId>(initialState);
  const { data } = useGetStaffDetailQuery(id);

  useEffect(() => {
    if (data) {
      setStaff(data);
    }
  }, [data]);

  return staff;
};
