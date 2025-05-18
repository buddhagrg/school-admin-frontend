import React from 'react';
import { SvgIconProps } from '@mui/material';
import { Block, CheckCircle, Edit, Email, Key, LockReset, Visibility } from '@mui/icons-material';
import { USER_ACTION_MENUS } from '@/utils/constants';
import type { UserActions } from '../types';

const getUserAtionContent = (action: UserActions): string => {
  return USER_ACTION_MENUS[action] ?? action;
};

export const USER_ACTION_MENU_LIST: Array<{
  action: UserActions;
  icon: React.FC<SvgIconProps>;
  text: string;
}> = [
  {
    action: 'VIEW_DETAIL',
    icon: Visibility,
    text: getUserAtionContent('VIEW_DETAIL')
  },
  {
    action: 'EDIT_DETAIL',
    icon: Edit,
    text: getUserAtionContent('EDIT_DETAIL')
  },
  {
    action: 'DISABLE_SYSTEM_ACCESS',
    icon: Block,
    text: getUserAtionContent('DISABLE_SYSTEM_ACCESS')
  },
  {
    action: 'ENABLE_SYSTEM_ACCESS',
    icon: CheckCircle,
    text: getUserAtionContent('ENABLE_SYSTEM_ACCESS')
  },
  {
    action: 'RESEND_VERIFICATION_EMAIL_TO_USER',
    icon: Email,
    text: getUserAtionContent('RESEND_VERIFICATION_EMAIL_TO_USER')
  },
  {
    action: 'RESEND_PWD_LINK_EMAIL_TO_USER',
    icon: Key,
    text: getUserAtionContent('RESEND_PWD_LINK_EMAIL_TO_USER')
  },
  {
    action: 'RESET_USER_PWD',
    icon: LockReset,
    text: getUserAtionContent('RESET_USER_PWD')
  }
];
