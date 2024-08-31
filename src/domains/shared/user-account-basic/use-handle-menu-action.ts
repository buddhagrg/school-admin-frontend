import { useResendPwdSetupLinkMutation, useResendVerificationEmailMutation, useResetPwdMutation } from "@/domains/auth/api";
import { useHandleStaffStatusMutation } from "@/domains/staff/api";

const useHandleMenuAction = () => {
    const [handleStatus] = useHandleStaffStatusMutation();
    const [resendVerificationEmail] = useResendVerificationEmailMutation();
    const [resendPwdSetupLink] = useResendPwdSetupLinkMutation();
    const [resetPwd] = useResetPwdMutation();

    const handleAction = async (menuItemValue: string, selectedUserId: number) => {
        const actionHandlers: { [key: string]: () => Promise<any> } = {
            "true": () => handleStatus({ id: selectedUserId, status: true }).unwrap(),
            "false": () => handleStatus({ id: selectedUserId, status: false }).unwrap(),
            "RESEND_EMAIL": () => resendVerificationEmail({ userId: selectedUserId }).unwrap(),
            "RESEND_PWD_LINK": () => resendPwdSetupLink({ userId: selectedUserId }).unwrap(),
            "RESET_PWD": () => resetPwd({ userId: selectedUserId }).unwrap()
        };

        if (actionHandlers[menuItemValue]) {
            return await actionHandlers[menuItemValue]();
        }
        return null;
    };

    return { handleAction };
};

export default useHandleMenuAction;
