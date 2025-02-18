import { green, red } from '@mui/material/colors';

export const getTextColor = (status: boolean) => {
  return {
    backgroundColor: status ? green[400] : red[400],
    color: 'white',
    padding: '3px 5px',
    borderRadius: '3px'
  };
};
