import * as React from 'react';
import { Box, ListItemText } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type PeriodItemProps = {
  id: number;
  name: string;
};
export const PeriodItem: React.FC<PeriodItemProps> = ({ id, name }) => {
  const { attributes, setNodeRef, listeners, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: '1px dashed grey',
    borderRadius: '5px',
    padding: '5px',
    marginBottom: '5px',
    textAlign: 'center'
  };

  return (
    <Box ref={setNodeRef} component='section' style={style}>
      <ListItemText {...attributes} {...listeners} primary={name} />
    </Box>
  );
};
