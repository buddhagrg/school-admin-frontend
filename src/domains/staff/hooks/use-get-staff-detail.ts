import { useGetStaffDetailQuery } from "../api";
import { staffInitialState } from "../components/forms/staff-initial-state";
import { StaffFormPropsWithId } from "../types";

const initialState: StaffFormPropsWithId = { id: 0, ...staffInitialState };
export const useGetStaffDetail = (id: string | undefined) => {
    const { data: staff, isLoading, isError } = useGetStaffDetailQuery(id);
    if (isLoading) {
        return initialState;
    } else if (isError) {
        return initialState;
    } else if (staff) {
        return staff;
    }
    return initialState;
}
