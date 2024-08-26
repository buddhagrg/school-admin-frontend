import { Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout";

export const AppRoot = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}