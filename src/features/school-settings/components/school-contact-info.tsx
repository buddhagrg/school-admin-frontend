import { EmailOutlined } from '@mui/icons-material';
import type { SchoolContactProps } from '../types';
import { SchoolFieldLayout } from './school-field-layout';

export const SchoolContactInfo = () => {
  const fields: Array<{ id: keyof SchoolContactProps; label: string; mdSize: number }> = [
    { id: 'email', label: 'Email Address', mdSize: 6 },
    { id: 'phone', label: 'Phone Number', mdSize: 6 },
    { id: 'websiteUrl', label: 'Website', mdSize: 12 },
    { id: 'address', label: 'Address', mdSize: 12 }
  ];

  return (
    <SchoolFieldLayout
      icon={EmailOutlined}
      heading='Contact Information'
      subHeading='School contact details and location information'
      fields={fields}
    />
  );
};
