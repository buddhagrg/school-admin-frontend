import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { AppRoot } from "./root";
import { LoginPage } from '@/domains/auth/login';
import { SetupPasswordPage } from '@/domains/auth/setup-password';
import { DashboardPage } from '@/domains/dashboard';
import { AccountRoute } from '@/domains/account';
import { LeaveDefine } from '@/domains/leave/define';
import { MyLeaveRequest } from '@/domains/leave/request';
import { PendingRequest } from '@/domains/leave/pending';
import { ListClasses } from '@/domains/class/list';
import { EditClass } from '@/domains/class/edit';
import { ListClassTeachers } from '@/domains/class-teacher/list';
import { EditClassTeacher } from '@/domains/class-teacher/edit';
import { ListStudents } from '@/domains/student/list';
import { AddStudent } from '@/domains/student/add';
import { ViewStudent } from '@/domains/student/view';
import { EditStudent } from '@/domains/student/edit';
import { ListNotices } from '@/domains/notice/list';
import { AddNotice } from '@/domains/notice/add';
import { ViewNotice } from '@/domains/notice/view';
import { EditNotice } from '@/domains/notice/edit';
import { ManageNotices } from '@/domains/notice/manage';
import { ListStaffs } from '@/domains/staff/list';
import { AddStaff } from '@/domains/staff/add';
import { ViewStaff } from '@/domains/staff/view';
import { EditStaff } from '@/domains/staff/edit';
import { RoleAndPermission } from '@/domains/role-and-permission';

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
            { path: "account", element: <AccountRoute /> },
            { path: "leave/define", element: <LeaveDefine /> },
            { path: "leave/request", element: <MyLeaveRequest /> },
            { path: "leave/pending", element: <PendingRequest /> },
            { path: "classes", element: <ListClasses /> },
            { path: "classes/edit/:id", element: <EditClass /> },
            { path: "class-teachers", element: <ListClassTeachers /> },
            { path: "class-teachers/edit/:id", element: <EditClassTeacher /> },
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
        ]
    },
    {
        path: "*",
        element: <>Application Error</>
    }
]);
