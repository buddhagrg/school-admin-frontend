import { FC } from 'react';
import { UserList } from './user-list';

type UserTabsProps = {
  roleId: number;
};

export const UserTabs: FC<UserTabsProps> = ({ roleId }) => {
  return (
    <>
      <UserList roleId={roleId} />
    </>
  );
};
