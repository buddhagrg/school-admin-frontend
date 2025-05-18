import type { UserActions } from '../types';

export const isMenuDisabled = (action: UserActions, hasSystemAccess: boolean): boolean => {
  if (action === 'ENABLE_SYSTEM_ACCESS') {
    return hasSystemAccess;
  }
  if (action === 'DISABLE_SYSTEM_ACCESS') {
    return !hasSystemAccess;
  }

  return false;
};
