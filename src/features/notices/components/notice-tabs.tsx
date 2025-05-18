import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';

import { NoticeTable } from './notice-table';
import type { NoticeFilterProps } from '../types';
import { getDateRange } from '@/utils/helpers/get-date-range';
import { useGetNoticesQuery } from '../notice-api';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { getUser } from '@/features/auth/auth-slice';
import { TabPanel } from '@/shared/components';

export const NoticeTabs = ({ filter }: { filter: NoticeFilterProps }) => {
  const [tab, setTab] = useState(0);
  const user = useSelector(getUser);
  const userId = user?.id;
  const apiSet = new Set(user?.apis.map((user) => user.path));
  const canReview = apiSet.has('api/v1/notices/:id/review');

  const { fromDate, toDate, dateRangeId, ...rest } = filter;
  const dateRange = dateRangeId === 'CUSTOM' ? null : getDateRange(dateRangeId!);

  const { data, isLoading, isError, error } = useGetNoticesQuery({
    ...rest,
    fromDate: dateRange ? dateRange.from : getFormattedDate(fromDate || '', API_DATE_FORMAT),
    toDate: dateRange ? dateRange.to : getFormattedDate(toDate || '', API_DATE_FORMAT)
  });

  useEffect(() => {
    setTab(0);
  }, []);

  const handleTabChange = (_event: SyntheticEvent, index: number) => {
    setTab(index);
  };

  const errorMsg = isError ? getErrorMsg(error).message : '';
  const allNotices = useMemo(() => {
    return isError ? [] : data?.notices || [];
  }, [data, isError]);

  const myNotices = useMemo(
    () => allNotices.filter((notice) => notice.authorId === userId),
    [allNotices, userId]
  );

  const reviewPendingNotices = useMemo(
    () =>
      allNotices.filter((notice) => notice.statusId === 'PENDING' && notice.authorId !== userId),
    [allNotices, userId]
  );

  const tabsToRender = useMemo(() => {
    const base = [
      { label: 'All Notices', data: allNotices },
      { label: 'My Notices', data: myNotices }
    ];

    return canReview ? [...base, { label: 'Pending Reviews', data: reviewPendingNotices }] : base;
  }, [canReview, allNotices, myNotices, reviewPendingNotices]);

  return (
    <>
      <Tabs value={tab} onChange={handleTabChange}>
        {tabsToRender.map(({ label }, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {tabsToRender.map(({ data }, index) => (
          <TabPanel value={tab} index={index} key={index}>
            <NoticeTable data={data} error={errorMsg} isLoading={isLoading} />
          </TabPanel>
        ))}
      </Box>
    </>
  );
};
