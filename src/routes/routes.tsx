import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { AppRoot } from "./root";
import { LoginPage, SetupPasswordPage } from '@/domains/auth/pages';
import { DashboardPage } from '@/domains/dashboard/pages';
import { LeaveDefine, MyLeaveRequest, PendingRequest } from '@/domains/leave/pages';
import { EditClass, ListClasses } from '@/domains/class/pages';
import { EditClassTeacher, ListClassTeachers } from '@/domains/class-teacher/pages';
import { AddStudent, EditStudent, ListStudents, ViewStudent } from '@/domains/student/pages';
import { AddNotice, EditNotice, EditNoticeRecipientPage, ListNoticeRecipients, ListNotices, ManageNotices, ViewNotice } from '@/domains/notice/pages';
import { AddStaff, EditStaff, ListStaffs, ViewStaff } from '@/domains/staff/pages';
import { RoleAndPermission } from '@/domains/role-and-permission/pages';
import { AccountPage } from '@/domains/account/pages';
import { EditSectionPage, ListSectionPage } from '@/domains/section/pages';
import { EditDepartmentPage, ListDepartmentsPage } from '@/domains/department/pages';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/app" replace />
    },
    {
        path: "/auth/login",
        element: <LoginPage />
    },
    {
        path: "/auth/setup-password/:token",
        element: <SetupPasswordPage />
    },
    {
        path: "/app",
        element: (
            <ProtectedRoute>
                <AppRoot />
            </ProtectedRoute>
        ),
        errorElement: <>/app Error</>,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "account", element: <AccountPage /> },
            { path: "leave/define", element: <LeaveDefine /> },
            { path: "leave/request", element: <MyLeaveRequest /> },
            { path: "leave/pending", element: <PendingRequest /> },
            { path: "classes", element: <ListClasses /> },
            { path: "classes/edit/:id", element: <EditClass /> },
            { path: "class-teachers", element: <ListClassTeachers /> },
            { path: "class-teachers/edit/:id", element: <EditClassTeacher /> },
            { path: "sections", element: <ListSectionPage /> },
            { path: "sections/edit/:id", element: <EditSectionPage /> },
            { path: "students", element: <ListStudents /> },
            { path: "students/add", element: <AddStudent /> },
            { path: "students/:id", element: <ViewStudent />, },
            { path: "students/edit/:id", element: <EditStudent />, },
            { path: "notices", element: <ListNotices /> },
            { path: "notices/add", element: <AddNotice /> },
            { path: "notices/:id", element: <ViewNotice /> },
            { path: "notices/edit/:id", element: <EditNotice /> },
            { path: "notices/manage", element: <ManageNotices /> },
            { path: "staffs", element: <ListStaffs /> },
            { path: "staffs/add", element: <AddStaff /> },
            { path: "staffs/:id", element: <ViewStaff /> },
            { path: "staffs/edit/:id", element: <EditStaff /> },
            { path: "roles-and-permissions", element: <RoleAndPermission /> },
            { path: "departments", element: <ListDepartmentsPage /> },
            { path: "departments/edit/:id", element: <EditDepartmentPage /> },
            { path: "notices/recipients", element: <ListNoticeRecipients /> },
            { path: "notices/recipients/edit/:id", element: <EditNoticeRecipientPage /> }
        ]
    },
    {
        path: "*",
        element: <>Application Error</>
    }
]);
