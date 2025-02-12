import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protected-route';
import { AppRoot } from './app-root';
import { LoginPage, SetupPasswordPage } from '@/domains/auth/pages';
import { DashboardPage } from '@/domains/dashboard/pages';
import { LeaveDefine, MyLeaveRequest, PendingRequest } from '@/domains/leave/pages';
// import { EditClass, ListClasses } from '@/domains/class-str/pages';
import { AddStudent, EditStudent, ListStudents, ViewStudent } from '@/domains/student/pages';
import {
  AddNotice,
  EditNotice,
  ListNotices,
  ManageNotices,
  ViewNotice
} from '@/domains/notice/pages';
import { AddStaff, EditStaff, ListStaffs, ViewStaff } from '@/domains/staff/pages';
import { AccountPage } from '@/domains/account/pages';
// import { EditSectionPage, ListSectionPage } from '@/domains/section/pages';
import { EditDepartmentPage, ListDepartmentsPage } from '@/domains/department/pages';
import { ErrorPage, NotFound } from '@/components/errors';
import { MainLayout } from '@/components/layout';
import { RoleAndPermission } from '@/domains/role-and-permission/pages';
import { Home } from '@/domains/landing';
import { ProtectedSuperAdminRoute } from './protected-super-admin-route';
import { SignUpPage } from '@/domains/auth/pages/signup/signup-page';
import { ManageAccessControl } from '@/domains/access-controls/pages/access-control-page';
import { SuperAdminDashboard } from '@/domains/super-admin-dashboard';
import { EditSchool, ListSchoolsPage } from '@/domains/schools/pages';
import { LevelClassPage, AcademicPage } from '@/domains/academic/pages';
import { ClassSectionPage } from '@/domains/class/pages';

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
      // { path: 'classes/edit/:id', element: <EditClass /> },
      // { path: 'sections', element: <ListSectionPage /> },
      // { path: 'sections/edit/:id', element: <EditSectionPage /> },
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
