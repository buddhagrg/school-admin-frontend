import { Celebration } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { getFormattedCelebrationDate } from '../util';
import { CelebrationProps } from '../dashboard-type';
import { ERROR_MESSAGE } from '@/components/errors';

export const Celebrations = ({ celebrations }: { celebrations: CelebrationProps[] }) => {
  return (
    <>
      <Stack direction='row' spacing={1} marginBottom={1}>
        <Celebration className='section-title' sx={{ paddingTop: '2px' }} />
        <Typography variant='h6' className='section-title'>
          Celebrations
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <List>
            {celebrations.length <= 0 ? (
              <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>
            ) : (
              celebrations.map(({ userId, user, event, eventDate }) => (
                <div key={`${userId}${event}`}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt='User image' />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body1'
                            color='text.primary'
                          >
                            {getFormattedCelebrationDate(eventDate)}
                          </Typography>
                          {` — ${event}`}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant='inset' component='li' />
                </div>
              ))
            )}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
