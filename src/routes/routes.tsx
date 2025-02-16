import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protected-route';
import { AppRoot } from './app-root';
import { LoginPage, SetupPasswordPage } from '@/app/auth/pages';
import { DashboardPage } from '@/app/dashboard/pages';
import { LeaveDefine, MyLeaveRequest, PendingRequest } from '@/app/leave/pages';
import { AddStudent, EditStudent, ListStudents, ViewStudent } from '@/app/student/pages';
import { AddNotice, EditNotice, ListNotices, ManageNotices, ViewNotice } from '@/app/notice/pages';
import { AddStaff, EditStaff, ListStaffs, ViewStaff } from '@/app/staff/pages';
import { AccountPage } from '@/app/account/pages';
import { EditDepartmentPage, ListDepartmentsPage } from '@/app/department/pages';
import { ErrorPage, NotFound } from '@/components/errors';
import { MainLayout } from '@/components/layout';
import { RoleAndPermission } from '@/app/role-and-permission/pages';
import { Home } from '@/app/landing';
import { ProtectedSuperAdminRoute } from './protected-super-admin-route';
import { SignUpPage } from '@/app/auth/pages/signup/signup-page';
import { ManageAccessControl } from '@/app/access-controls/pages/access-control-page';
import { SuperAdminDashboard } from '@/app/super-admin-dashboard';
import { EditSchool, ListSchoolsPage } from '@/app/schools/pages';
import { LevelClassPage, AcademicPage } from '@/app/academic/pages';
import { ClassSectionPage, ClassTeacherPage } from '@/app/class/pages';

export const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
    errorElement: <ErrorPage message='Error loading login page' />
  },
  {
    path: '/auth/signup',
    element: <SignUpPage />,
    errorElement: <ErrorPage message='Error loading signup page' />
  },
  {
    path: '/auth/setup-password/:token',
    element: <SetupPasswordPage />,
    errorElement: <ErrorPage message='Error loading password setup page' />
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    errorElement: (
      <MainLayout>
        <ErrorPage message='Error loading the app' />
      </MainLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'leaves/manage', element: <LeaveDefine /> },
      { path: 'leaves/request', element: <MyLeaveRequest /> },
      { path: 'leaves/review', element: <PendingRequest /> },
      { path: 'classes/manage', element: <ClassSectionPage /> },
      { path: 'classes/teachers', element: <ClassTeacherPage /> },
      { path: 'students', element: <ListStudents /> },
      { path: 'students/add', element: <AddStudent /> },
      { path: 'students/:id', element: <ViewStudent /> },
      { path: 'students/edit/:id', element: <EditStudent /> },
      { path: 'notices', element: <ListNotices /> },
      { path: 'notices/add', element: <AddNotice /> },
      { path: 'notices/:id', element: <ViewNotice /> },
      { path: 'notices/edit/:id', element: <EditNotice /> },
      { path: 'notices/manage', element: <ManageNotices /> },
      { path: 'staffs', element: <ListStaffs /> },
      { path: 'staffs/add', element: <AddStaff /> },
      { path: 'staffs/:id', element: <ViewStaff /> },
      { path: 'staffs/edit/:id', element: <EditStaff /> },
      { path: 'users/role-and-permission', element: <RoleAndPermission /> },
      { path: 'departments', element: <ListDepartmentsPage /> },
      { path: 'departments/edit/:id', element: <EditDepartmentPage /> },
      { path: 'academic/manage', element: <AcademicPage /> },
      { path: 'academic/level-class', element: <LevelClassPage /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedSuperAdminRoute>
        <AppRoot />
      </ProtectedSuperAdminRoute>
    ),
    errorElement: (
      <MainLayout>
        <ErrorPage message='Error loading the app' />
      </MainLayout>
    ),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'schools', element: <ListSchoolsPage /> },
      { path: 'schools/edit/:id', element: <EditSchool /> },
      { path: 'access-controls', element: <ManageAccessControl /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />
  }
];

export const router = createBrowserRouter(routes);
