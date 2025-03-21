import { useUpdateUserSystemAccessMutation } from '@/app/manage-users/manage-users-api';
import { menuItemTexts } from '../constants';
import {
  useResendPwdSetupLinkMutation,
  useResendVerificationEmailMutation,
  useResetPwdMutation
} from '@/app/auth/auth-api';
import { useUpdateNoticeStatusMutation } from '@/app/notice/notice-api';
import { ApiResponseSuccessMessage } from '@/types';

export const useHandleMenuAction = () => {
  const [updateUserSystemAccess] = useUpdateUserSystemAccessMutation();
  const [resendVerificationEmail] = useResendVerificationEmailMutation();
  const [resendPwdSetupLink] = useResendPwdSetupLinkMutation();
  const [resetPwd] = useResetPwdMutation();
  const [updateNoticeStatus] = useUpdateNoticeStatusMutation();

  const handleAction = async (menuItemValue: string, selectedId: number) => {
    const actionHandlers: {
      [key in keyof typeof menuItemTexts]: () => Promise<ApiResponseSuccessMessage>;
    } = {
      ENABLE_SYSTEM_ACCESS: () =>
        updateUserSystemAccess({ id: selectedId, hasSystemAccess: true }).unwrap(),
      DISABLE_SYSTEM_ACCESS: () =>
        updateUserSystemAccess({ id: selectedId, hasSystemAccess: false }).unwrap(),
      RESEND_VERIFICATION_EMAIL_TO_USER: () =>
        resendVerificationEmail({ userId: selectedId }).unwrap(),
      RESEND_PWD_LINK_EMAIL_TO_USER: () => resendPwdSetupLink({ userId: selectedId }).unwrap(),
      RESET_USER_PWD: () => resetPwd({ userId: selectedId }).unwrap(),
      APPROVE_NOTICE: () => updateNoticeStatus({ id: selectedId, status: 'APPROVED' }).unwrap(),
      REJECT_NOTICE: () => updateNoticeStatus({ id: selectedId, status: 'REJECTED' }).unwrap(),
      DELETE_NOTICE: () => updateNoticeStatus({ id: selectedId, status: 'DELETED' }).unwrap(),
      DELETE_NOTICE_BY_SELF: () =>
        updateNoticeStatus({ id: selectedId, status: 'DELETE_REQUEST' }).unwrap()
    };

    if (actionHandlers[menuItemValue]) {
      return await actionHandlers[menuItemValue]();
    }
    return null;
  };

  return { handleAction };
};
