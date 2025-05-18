import { DescriptionOutlined } from '@mui/icons-material';
import type { SchoolLegalProps } from '../types';
import { SchoolFieldLayout } from './school-field-layout';

export const SchoolLegalInfo = () => {
  const fields: Array<{ id: keyof SchoolLegalProps; label: string; mdSize: number }> = [
    { id: 'pan', label: 'Pan (Permanent Account Number)', mdSize: 6 },
    { id: 'registrationNumber', label: 'School Registration Number', mdSize: 6 }
  ];

  return (
    <SchoolFieldLayout
      icon={DescriptionOutlined}
      heading='Legal Information'
      subHeading='Tax and registration details for your institution'
      fields={fields}
    />
  );
};
