import { Box, Button } from '@mui/material';
import { Add, Campaign } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PageContentHeader } from '@/components/page-content-header';
import { NoticeData } from '../components';
import { getAppBase } from '@/app/auth/slice';
import { useGetNoticesQuery } from '../api';

export const ListNotices = () => {
  const { data, isLoading, isError, error } = useGetNoticesQuery();
  const appBase = useSelector(getAppBase);

  return (
    <>
      <PageContentHeader icon={Campaign} heading='Notices' />
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
        actionCellType='user'
      />
    </>
  );
};
