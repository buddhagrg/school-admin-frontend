import React from 'react';
import { Card, CardContent } from '@mui/material';

type AccountDetailTabContentProps = {
  components: React.ReactNode[];
};
export const AccountDetailTabContent: React.FC<AccountDetailTabContentProps> = ({ components }) => {
  return components.map((component, index) => (
    <Card key={index} sx={{ mb: 2 }}>
      <CardContent>{component}</CardContent>
    </Card>
  ));
};
