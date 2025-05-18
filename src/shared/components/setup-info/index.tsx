import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Close, InfoOutlined } from '@mui/icons-material';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

import type { SetupItems } from '@/shared/types';

type SetupInfoProps = {
  screen: string;
  items: SetupItems[];
};
export const SetupInfo: React.FC<SetupInfoProps> = ({ items, screen }) => {
  const [display, setDisplay] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (screen) {
      setDisplay(localStorage.getItem(screen) ?? 'true');
    }
  }, [screen]);
  const onClick = () => {
    localStorage.setItem(screen, 'false');
    setDisplay('false');
  };

  if (display !== 'true') return null;

  return (
    <Box sx={{ border: `1px solid ${blue[100]}` }}>
      <Box sx={{ display: 'flex', bgcolor: blue[50], p: 2, color: blue[800] }}>
        <InfoOutlined sx={{ fontSize: '17px', mt: 0.2 }} />
        <Box sx={{ ml: 2 }}>
          <Typography fontWeight={500} gutterBottom variant='body2'>
            Setup Information
          </Typography>
          <Typography variant='body2'>Some features require following additional setup:</Typography>
          <List dense disablePadding sx={{ listStyleType: 'disc', marginLeft: 3 }}>
            {items?.map(({ route, name, description }) => (
              <ListItem disablePadding sx={{ display: 'list-item' }} key={route}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex' }}>
                      <Link to={route} className='link-text-inherit'>
                        <Typography variant='body2'>{name}</Typography>
                      </Link>
                      <Typography variant='body2'>{description}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Typography component='span' variant='body2' sx={{ display: 'inline-flex', mt: 1 }}>
            <Typography fontWeight={500} variant='body2'>
              Note:
            </Typography>
            &nbsp; If everything is setup, you can ignore or dismiss this dialog.
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Close onClick={onClick} sx={{ cursor: 'pointer' }} />
      </Box>
    </Box>
  );
};
