import * as React from 'react';
import { staffInitialState } from '../components/forms/staff-initial-state';
import { useGetStaffDetailQuery } from '../api/staff-api';
import { StaffFormPropsWithId } from '../types';

const initialState: StaffFormPropsWithId = { id: 0, ...staffInitialState };
export const useGetStaffDetail = (id: string | undefined) => {
  const [staff, setStaff] = React.useState<StaffFormPropsWithId>(initialState);
  const { data } = useGetStaffDetailQuery(id);

  React.useEffect(() => {
    if (data) {
      setStaff(data);
    }
  }, [data]);

  return staff;
};
