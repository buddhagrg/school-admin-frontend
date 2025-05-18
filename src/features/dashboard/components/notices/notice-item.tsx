import { useState } from 'react';
import { CalendarTodayOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';

import { ViewNotice } from '@/features/notices/components';
import type { Notice } from '@/features/notices/types';
import { COLORS } from '@/theme/custom-colors';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { HeadingText, SubSoftText } from '@/shared/components';

export const NoticeItem = ({ notice }: { notice: Notice }) => {
  const { title, publishedDate, author } = notice;
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          mt: 2,
          p: 1,
          border: `1px solid ${COLORS.border}`,
          borderRadius: '5px',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        component='div'
        onClick={toggleModal}
      >
        <HeadingText text={title} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <CalendarTodayOutlined sx={{ width: 15, height: 15 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <SubSoftText text={getFormattedDate(publishedDate, DATE_FORMAT)} />
            <Box component='div' ml={'auto'}>
              <SubSoftText text={author} />
            </Box>
          </Box>
        </Box>
      </Box>

      {open && <ViewNotice notice={notice} closeModal={toggleModal} />}
    </>
  );
};
