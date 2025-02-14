import { CSSProperties, FC } from 'react';
import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator } from '@mui/icons-material';

type PeriodItemProps = {
  id: number;
  name: string;
};
export const PeriodItem: FC<PeriodItemProps> = ({ id, name }) => {
  const { attributes, setNodeRef, listeners, transform, transition } = useSortable({ id });
  const style: CSSProperties = {
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
      <ListItem>
        <ListItemIcon {...attributes} {...listeners}>
          <DragIndicator />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Box>
  );
};
