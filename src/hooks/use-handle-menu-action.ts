import { menuItemTexts } from '../constants';
import {
  useResendPwdSetupLinkMutation,
  useResendVerificationEmailMutation,
  useResetPwdMutation
} from '@/app/auth/api';
import { useHandleUserSystemAccessMutation } from '@/app/manage-users/api';
import { useHandleNoticeStatusMutation } from '@/app/notice/api';

export const useHandleMenuAction = () => {
  const [handleUserSystemAccess] = useHandleUserSystemAccessMutation();
  const [resendVerificationEmail] = useResendVerificationEmailMutation();
  const [resendPwdSetupLink] = useResendPwdSetupLinkMutation();
  const [resetPwd] = useResetPwdMutation();
  const [handleNoticeStatus] = useHandleNoticeStatusMutation();

  const handleAction = async (menuItemValue: string, selectedId: number) => {
    const actionHandlers: {
      [key in keyof typeof menuItemTexts]: () => Promise<{ message: string }>;
    } = {
      ENABLE_SYSTEM_ACCESS: () =>
        handleUserSystemAccess({ id: selectedId, hasSystemAccess: true }).unwrap(),
      DISABLE_SYSTEM_ACCESS: () =>
        handleUserSystemAccess({ id: selectedId, hasSystemAccess: false }).unwrap(),
      RESEND_VERIFICATION_EMAIL_TO_USER: () =>
        resendVerificationEmail({ userId: selectedId }).unwrap(),
      RESEND_PWD_LINK_EMAIL_TO_USER: () => resendPwdSetupLink({ userId: selectedId }).unwrap(),
      RESET_USER_PWD: () => resetPwd({ userId: selectedId }).unwrap(),
      APPROVE_NOTICE: () => handleNoticeStatus({ id: selectedId, status: 5 }).unwrap(),
      REJECT_NOTICE: () => handleNoticeStatus({ id: selectedId, status: 4 }).unwrap(),
      DELETE_NOTICE: () => handleNoticeStatus({ id: selectedId, status: 6 }).unwrap(),
      DELETE_NOTICE_BY_SELF: () => handleNoticeStatus({ id: selectedId, status: 3 }).unwrap()
    };

    if (actionHandlers[menuItemValue]) {
      return await actionHandlers[menuItemValue]();
    }
    return null;
  };

  return { handleAction };
};
