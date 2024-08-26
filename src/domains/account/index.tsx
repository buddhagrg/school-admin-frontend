import { useSelector } from "react-redux";
import { getUserRole } from "../auth/slice";
import { StudentAccountPage } from "./student-account";
import { StaffAccountPage } from "./staff-account";

export const AccountRoute = () => {
    const role = useSelector(getUserRole);

    if (role === "student") {
        return <StudentAccountPage />
    }

    return <StaffAccountPage />
}
