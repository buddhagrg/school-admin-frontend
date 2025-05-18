import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

import { COLORS } from '@/theme/custom-colors';
import { HeadingText } from '../heading-text';
import { SubSoftText } from '../sub-soft-text';

type InfoSectionProps = {
  heading: string;
  icon?: React.ElementType;
  subHeading?: string;
  list?: string[];
};
export const InfoSection: React.FC<InfoSectionProps> = ({
  heading,
  subHeading,
  list,
  icon: Icon
}) => {
  return (
    <Box
      sx={{
        p: 2,
        border: `1px solid ${COLORS.border}`,
        display: 'flex',
        gap: 1,
        borderRadius: '5px'
      }}
    >
      {Icon ? <Icon fontSize='small' /> : <InfoOutlined fontSize='small' />}
      <Box>
        <HeadingText text={heading} />
        {subHeading && <SubSoftText text={subHeading} />}
        <List dense disablePadding sx={{ listStyleType: 'disc', marginLeft: 3 }}>
          {list?.map((item) => (
            <ListItem disablePadding sx={{ display: 'list-item' }} key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
