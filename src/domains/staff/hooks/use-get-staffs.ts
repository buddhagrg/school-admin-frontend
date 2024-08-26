import * as React from "react";
import { StaffAccountBasic } from "../types";
import { useLazyGetStaffsQuery } from "../api";

export const useGetStaffs = () => {
    const [staffs, setStaffs] = React.useState<StaffAccountBasic[]>([]);
    const [getStaffs] = useLazyGetStaffsQuery();

    React.useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const result = await getStaffs({}).unwrap();
                const staffs = Array.isArray(result.staffs) ? result.staffs : [];
                setStaffs(staffs);
            } catch (error) {
                console.log(error);
            }
        }

        fetchStaffs();
    }, []);

    return staffs;
}