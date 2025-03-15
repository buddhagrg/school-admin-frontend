import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { UserSetting } from '../types';

type AttendanceSetting = {
  userType: UserSetting;
  handleChange: React.Dispatch<React.SetStateAction<UserSetting>>;
};
export const AttendanceSetting: React.FC<AttendanceSetting> = ({
  userType: value,
  handleChange
}) => {
  return (
    <FormControl sx={{ mt: 2 }}>
      <FormLabel>Attendance Setting</FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={(event) => handleChange(event.target.value as UserSetting)}
      >
        <FormControlLabel value='staff' label='Staff' control={<Radio size='small' />} />
        <FormControlLabel value='students' label='Students' control={<Radio size='small' />} />
      </RadioGroup>
    </FormControl>
  );
};
