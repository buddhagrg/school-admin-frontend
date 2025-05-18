import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

type DemoRolesProps = {
  isChecked: boolean;
  toggleCheckBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const DemoRoles: React.FC<DemoRolesProps> = ({ toggleCheckBox, isChecked }) => {
  return (
    <FormControlLabel
      label='Use demo admin credential'
      control={<Checkbox checked={isChecked} onChange={toggleCheckBox} />}
    />
  );
};
