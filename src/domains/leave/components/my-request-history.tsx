import { useGetMyLeaveHistoryQuery } from "../api";
import { RequestHistoryTable } from "../pending/components/request-history-table";
import { getErrorMsg } from "@/utils/helpers/get-error-message";

export const RequestHistory = () => {
    const { data, isLoading, isError, error } = useGetMyLeaveHistoryQuery();

    if (isLoading) {
        return <>loading...</>;
    }
    if (isError) {
        return <>{getErrorMsg(error).message}</>;
    }
    if (!data || !Array.isArray(data.leaveHistory)) {
        return <>No data</>;
    }

    return <RequestHistoryTable requests={data.leaveHistory} />;
}
