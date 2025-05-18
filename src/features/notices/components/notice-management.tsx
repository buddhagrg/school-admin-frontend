import { useState } from 'react';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { type NoticeFilterProps, NoticeFilterSchema } from '../types';
import { NoticeFilter } from './notice-filter';
import { NoticeTabs } from './notice-tabs';

const filterState: NoticeFilterProps = {
  statusId: '',
  roleId: '',
  dateRangeId: 'LAST_7_DAYS',
  fromDate: null,
  toDate: null
};
export const NoticeManagement = () => {
  const [filter, setFilter] = useState(filterState);
  const methods = useForm<NoticeFilterProps>({
    defaultValues: filterState,
    resolver: zodResolver(NoticeFilterSchema)
  });

  const applyFilter = () => {
    setFilter(methods.getValues());
  };
  const resetFilter = () => {
    methods.reset(filterState);
  };

  return (
    <>
      <NoticeFilter applyFilter={applyFilter} methods={methods} resetFilter={resetFilter} />
      <Box mt={3} />
      <NoticeTabs filter={filter} />
    </>
  );
};
