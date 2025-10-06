import React from 'react';
import { Box, TextField } from '@mui/material';
import { TitleText } from '../title-text';
import { SubSoftText } from '../sub-soft-text';

type SearchTextProps = {
  searchTerm: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleText: string;
  subtitleText?: string;
  placeholder: string;
};
export const SearchText: React.FC<SearchTextProps> = ({
  searchTerm,
  handleChange,
  titleText,
  subtitleText,
  placeholder
}) => {
  return (
    <Box>
      <TitleText text={titleText} />
      <SubSoftText text={subtitleText} />
      <TextField
        sx={{ mt: 2 }}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        size='small'
        fullWidth
      />
    </Box>
  );
};
