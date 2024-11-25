import { Box, Button } from '@mui/material';
import { Add, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { PageContentHeader } from '@/components/page-content-header';
import { useGetAllPendingNoticesQuery } from '../api/notice-api';
import { NoticeData } from '../components';
import { useSelector } from 'react-redux';
import { getAppBase } from '@/domains/auth/slice';

export const ManageNotices = () => {
  const { data, isLoading, isError, error } = useGetAllPendingNoticesQuery();
  const appBase = useSelector(getAppBase);

  return (
    <>
      <PageContentHeader icon={<Settings sx={{ mr: 1 }} />} heading='Manage Notices' />
      <Button
        variant='contained'
        startIcon={<Add />}
        size='small'
        sx={{ mb: 2, margin: 'auto' }}
        component={Link}
        to={`${appBase}/notices/add`}
      >
        Add Notice
      </Button>
      <Box sx={{ mb: 2 }} />
      <NoticeData
        notices={isError ? [] : data?.notices || []}
        isLoading={isLoading}
        isError={isError}
        error={error}
        actionCellType='reviewer'
      />
    </>
  );
};
