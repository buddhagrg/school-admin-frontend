import { USER_ACTION_MENUS } from '../../utils/constants';
import {
  useResendPwdSetupLinkMutation,
  useResendVerificationEmailMutation
} from '@/features/auth/auth-api';
import type { ApiResponseSuccessMessage, UserActions, UserEntity } from '@/shared/types';
import { useUpdateUserSystemAccessMutation } from '../api/user-system-access-api';

export const useUserAction = () => {
  const [updateUserSystemAccess] = useUpdateUserSystemAccessMutation();
  const [resendVerificationEmail] = useResendVerificationEmailMutation();
  const [resendPwdSetupLink] = useResendPwdSetupLinkMutation();

  const handleAction = async ({
    menuAction,
    userId,
    entity
  }: {
    menuAction: UserActions;
    userId: number;
    entity: UserEntity;
  }) => {
    const actionHandlers: {
      [key in keyof typeof USER_ACTION_MENUS]: () => Promise<ApiResponseSuccessMessage>;
    } = {
      ENABLE_SYSTEM_ACCESS: () =>
        updateUserSystemAccess({ userId, hasSystemAccess: true, entity }).unwrap(),
      DISABLE_SYSTEM_ACCESS: () =>
        updateUserSystemAccess({ userId, hasSystemAccess: false, entity }).unwrap(),
      RESEND_VERIFICATION_EMAIL_TO_USER: () => resendVerificationEmail({ userId }).unwrap(),
      RESEND_PWD_LINK_EMAIL_TO_USER: () => resendPwdSetupLink({ userId }).unwrap()
    };

    if (actionHandlers[menuAction]) {
      return await actionHandlers[menuAction]();
    }
    return null;
  };

  return { handleAction };
};
