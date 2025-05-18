import { Box, Chip, Divider, Grid2, Typography } from '@mui/material';
import { CalendarTodayOutlined } from '@mui/icons-material';

import { NOTICE_STATUS_CHIP } from './notice-status-chip';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import type { Notice } from '../types';
import { SubHardText, SubSoftText, TitleText } from '@/shared/components';

export const NoticeDetail = ({ notice }: { notice: Notice }) => {
  const {
    title,
    statusId,
    publishedDate,
    description,
    author,
    createdDate,
    updatedDate,
    reviewerName,
    audience
  } = notice;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TitleText text={title} />
        <Box sx={{ ml: 'auto' }}>{NOTICE_STATUS_CHIP[statusId]}</Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CalendarTodayOutlined sx={{ fontSize: '15px', mr: 0.5 }} />
        <SubSoftText text='Published: ' />
        &nbsp;
        <SubSoftText text={getFormattedDate(publishedDate, DATE_FORMAT) || 'N/A'} />
      </Box>
      <Typography sx={{ my: 3 }}>{description}</Typography>
      <SubHardText text='Audience' />
      <Chip size='small' label={audience} sx={{ mt: 0.5, mb: 1 }} />
      <Divider />
      <Grid2 container spacing={3} sx={{ mt: 1 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SubSoftText text='Created by' />
          <SubHardText text={author} />
          <Box mt={1} />
          <SubSoftText text='Last Updated' />
          <SubHardText text={getFormattedDate(updatedDate, DATE_FORMAT) || '-'} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <SubSoftText text='Created at' />
          <SubHardText text={getFormattedDate(createdDate, DATE_FORMAT) || '-'} />
          <Box mt={1} />
          <SubSoftText text='Reviewed by' />
          <SubHardText text={reviewerName || '-'} />
        </Grid2>
      </Grid2>
    </>
  );
};
