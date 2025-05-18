import { CakeOutlined, WorkspacePremiumOutlined } from '@mui/icons-material';
import { Avatar, Box } from '@mui/material';

import { COLORS } from '@/theme/custom-colors';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { CelebrationProps } from '../../dashboard-type';
import { HeadingText, SubHardText } from '@/shared/components';

export const CelebrationItem = ({ celebration }: { celebration: CelebrationProps }) => {
  const { user, event, eventDate, type } = celebration;

  return (
    <Box
      sx={{
        display: 'flex',
        border: `1px solid ${COLORS.border}`,
        borderRadius: '5px',
        p: 1,
        mt: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {type === 'B' ? (
          <Avatar sx={{ bgcolor: '#fce7f3' }}>
            <CakeOutlined fontSize='small' sx={{ color: '#db2777' }} />
          </Avatar>
        ) : (
          <Avatar sx={{ bgcolor: '#fef3c7' }}>
            <WorkspacePremiumOutlined fontSize='small' color='warning' />
          </Avatar>
        )}
        <Box>
          <HeadingText text={user} />
          <SubHardText
            text={`${event} on ${getFormattedDate(eventDate, DATE_FORMAT)}`}
            color='primary'
          />
        </Box>
      </Box>
    </Box>
  );
};
