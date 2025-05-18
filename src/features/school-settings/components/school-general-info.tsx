import { SettingsOutlined } from '@mui/icons-material';
import type { SchoolGeneralProps } from '../types';
import { SchoolFieldLayout } from './school-field-layout';

export const SchoolGeneralInfo = () => {
  const fields: Array<{ id: keyof SchoolGeneralProps; label: string; mdSize: number }> = [
    { id: 'name', label: 'School Name', mdSize: 6 },
    { id: 'code', label: 'School Short Name/Abbreviation', mdSize: 6 },
    { id: 'establishedYear', label: 'Established Year', mdSize: 6 },
    { id: 'motto', label: 'Tagline/Moto', mdSize: 12 }
  ];

  return (
    <SchoolFieldLayout
      icon={SettingsOutlined}
      heading='School Information'
      subHeading='Basic information about your educational institution'
      fields={fields}
    />
  );
};
