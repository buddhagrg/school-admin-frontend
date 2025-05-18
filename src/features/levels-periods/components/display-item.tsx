import React from 'react';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import { HeadingText, SubSoftText } from '@/shared/components';
import { COLORS } from '@/theme/custom-colors';

type DisplayItemProps = {
  heading: string;
  index: number;
  onMoveItem?: (index: number, direction: string) => void;
  mode?: string | null;
  subHeading?: number | string;
  onActionBtnClick: (index: number, action: string) => void;
};
export const DisplayItem: React.FC<DisplayItemProps> = ({
  index,
  onMoveItem,
  mode,
  heading,
  subHeading,
  onActionBtnClick
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        border: `1px solid ${COLORS.border}`,
        borderRadius: '5px',
        alignItems: 'center',
        p: 2,
        mb: 2
      }}
    >
      {mode === 'reorder' && (
        <Box sx={{ mr: 2 }}>
          <IconButton onClick={() => onMoveItem && onMoveItem(index, 'up')}>
            <KeyboardArrowUp />
          </IconButton>
          <IconButton onClick={() => onMoveItem && onMoveItem(index, 'down')}>
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <HeadingText text={heading} />
        {subHeading && <SubSoftText text={`${subHeading}`} />}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton color='primary' onClick={() => onActionBtnClick(index, 'edit')}>
          <Edit />
        </IconButton>
        <IconButton color='error' onClick={() => onActionBtnClick(index, 'delete')}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};
