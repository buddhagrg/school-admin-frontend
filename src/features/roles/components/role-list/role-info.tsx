import { InfoSection } from '@/shared/components';

export const RoleInfo = () => {
  const list = [
    'System roles have fixed details but editable permissions',
    'Custom roles can be fully managed'
  ];
  return <InfoSection heading='System vs Custom Roles' list={list} />;
};
