import React from 'react';
import { Grid2, SvgIconProps } from '@mui/material';

import { TitleText } from '../title-text';
import { UserDetailInfo } from '../user-detail-info';

type Field = {
  icon: React.FC<SvgIconProps>;
  label: string;
  value: string | number;
};
type AccountDetailLayoutProps = {
  heading?: string;
  fields: Field[];
};
export const AccountDetailLayout: React.FC<AccountDetailLayoutProps> = ({ heading, fields }) => {
  return (
    <>
      <TitleText text={heading || ''} />
      <Grid2 container spacing={3} sx={{ mt: 2 }}>
        {fields.map(({ icon, label, value }) => (
          <Grid2 size={6} key={label}>
            <UserDetailInfo key={label} icon={icon} label={label} value={value} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
