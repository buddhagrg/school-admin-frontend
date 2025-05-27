import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protected-route';
import { AppRoot } from './app-root';
import { Login, ForgotPassword, SetupPassword, ResetPassword } from '@/features/auth/pages';
import { Error, MainLayout, PageNotFound } from '@/shared/components';

import { ProtectedSuperAdminRoute } from './protected-super-admin-route';
import { Permissions } from '@/features/permissions/permissions';
import { SuperAdminDashboard } from '@/features/super-admin-dashboard';
import { EditSchool, Schools } from '@/features/schools/pages';
import { ClassSection, ClassTeacher } from '@/features/class/pages';
import { Dashboard } from '@/features/dashboard/dashboard';
import { Account } from '@/features/account/account';
import { AcademicYears } from '@/features/academic-years/academic-years';
import { Roles } from '@/features/roles/roles';
import { LevelsPeriods } from '@/features/levels-periods/levels-periods';
import { Students } from '@/features/students/students';
import { Staff } from '@/features/staff/staff';
import { Departments } from '@/features/departments/departments';
import { LeavePolicies } from '@/features/leave-policies/leave-policies';
import { RequestLeave } from '@/features/request-leave/request-leave';
import { ReviewLeave } from '@/features/review-leave/review-leave';
import { Notices } from '@/features/notices/notices';
import { SchoolSetting } from '@/features/school-settings/school-setting';

export const routes = [
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error message='Error loading login page' />
  },
  {
    path: '/setup-password',
    element: <SetupPassword />,
    errorElement: <Error message='Error loading setup password page' />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <Error message='Error loading forgot password page' />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    errorElement: <Error message='Error loading reset password page' />
  },
  {
    path: '',
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    errorElement: <Error message='Error loading the app' />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'account', element: <Account /> },
      { path: 'academic-structure/levels-periods', element: <LevelsPeriods /> },
      { path: 'academic-structure/years', element: <AcademicYears /> },
      { path: 'academic-structure/departments', element: <Departments /> },
      { path: 'class-management/classes-sections', element: <ClassSection /> },
      { path: 'class-management/classes-teachers', element: <ClassTeacher /> },
      { path: 'user-management/roles-permissions', element: <Roles /> },
      { path: 'user-management/students', element: <Students /> },
      { path: 'user-management/staff', element: <Staff /> },
      { path: 'leave-management/policies', element: <LeavePolicies /> },
      { path: 'leave-management/request', element: <RequestLeave /> },
      { path: 'leave-management/review', element: <ReviewLeave /> },
      { path: 'notices', element: <Notices /> },
      { path: 'system-config/settings', element: <SchoolSetting /> },
      { path: '*', element: <PageNotFound /> }
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
        <Error message='Error loading the app' />
      </MainLayout>
    ),
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: 'account', element: <Account /> },
      { path: 'schools', element: <Schools /> },
      { path: 'schools/edit/:id', element: <EditSchool /> },
      { path: 'permissions', element: <Permissions /> }
    ]
  },
  {
    path: '*',
    element: <PageNotFound />,
    errorElement: <Error message='Error loading the page' />
  }
];

export const router = createBrowserRouter(routes);
