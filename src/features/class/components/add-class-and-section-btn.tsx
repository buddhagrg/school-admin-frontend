import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { AddClass } from './class/add-class';
import { AddSection } from './section/add-section';

export const AddBtn = () => {
  const [action, setAction] = useState<string>('');

  const toggleClick = (action: string) => {
    setAction(action);
  };

  return (
    <>
      <Box sx={{ display: 'flex', ml: 'auto', gap: 1 }}>
        <Button
          startIcon={<Add />}
          size='small'
          variant='outlined'
          onClick={() => toggleClick('section')}
        >
          Add Section
        </Button>
        <Button
          startIcon={<Add />}
          size='small'
          color='primary'
          variant='contained'
          onClick={() => toggleClick('class')}
        >
          Add Class
        </Button>
      </Box>

      {action === 'class' && <AddClass closeModal={() => toggleClick('')} />}
      {action === 'section' && <AddSection closeModal={() => toggleClick('')} />}
    </>
  );
};
