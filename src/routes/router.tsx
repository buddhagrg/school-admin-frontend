import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './protected-route';
import { AppRoot } from './app-root';
import { Login, SetupPassword } from '@/app/auth/pages';
import {
  ApplyLeaveForOthers,
  LeaveDefine,
  MyLeaveRequest,
  PendingRequest
} from '@/app/leave/pages';
import { AddStudent, EditStudent, ViewStudent } from '@/app/student/pages';
import { AddNotice, EditNotice, ListNotices, ManageNotices, ViewNotice } from '@/app/notice/pages';
import { AddStaff, EditStaff, ViewStaff } from '@/app/staff/pages';
import { Error, NotFound } from '@/components/errors';
import { MainLayout } from '@/components/layout';
import { ProtectedSuperAdminRoute } from './protected-super-admin-route';
import { Permissions } from '@/app/permissions/permissions';
import { SuperAdminDashboard } from '@/app/super-admin-dashboard';
import { EditSchool, Schools } from '@/app/schools/pages';
import { ClassSection, ClassTeacher } from '@/app/class/pages';
import { ManageUsers } from '@/app/manage-users/manage-users';
import { Dashboard } from '@/app/dashboard/dashboard';
import { Account } from '@/app/account/account';
import { Departments, EditDepartment } from '@/app/department/pages';
import { AcademicYears } from '@/app/academic-years/academic-years';
import { Roles } from '@/app/roles/roles';
import { LevelsPeriods } from '@/app/levels-periods/levels-periods';
import { LevelsClasses } from '@/app/levels-classes/levels-classes';
import { PeriodsDates } from '@/app/periods-dates/periods-dates';
import { FiscalYears } from '@/app/fiscal-years/fiscal-years';
import { TakeAttendance, ViewAttendance } from '@/app/attendance/pages';

export const routes = [
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error message='Error loading login page' />
  },
  {
    path: '/setup-password/:token',
    element: <SetupPassword />,
    errorElement: <Error message='Error loading password setup page' />
  },
  {
    path: '',
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    errorElement: (
      <MainLayout>
        <Error message='Error loading the app' />
      </MainLayout>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'account', element: <Account /> },
      { path: 'academic/levels/periods', element: <LevelsPeriods /> },
      { path: 'academic/levels/classes', element: <LevelsClasses /> },
      { path: 'academic/periods/dates', element: <PeriodsDates /> },
      { path: 'academic/years', element: <AcademicYears /> },
      { path: 'classes/sections', element: <ClassSection /> },
      { path: 'classes/teachers', element: <ClassTeacher /> },
      { path: 'users/roles-permissions', element: <Roles /> },
      { path: 'users/students/add', element: <AddStudent /> },
      { path: 'users/students/:id', element: <ViewStudent /> },
      { path: 'users/students/edit/:id', element: <EditStudent /> },
      { path: 'users/staff/add', element: <AddStaff /> },
      { path: 'users/staff/:id', element: <ViewStaff /> },
      { path: 'users/staff/edit/:id', element: <EditStaff /> },
      { path: 'users/manage', element: <ManageUsers /> },
      { path: 'leaves/policies', element: <LeaveDefine /> },
      { path: 'leaves/apply', element: <MyLeaveRequest /> },
      { path: 'leaves/apply-for-others', element: <ApplyLeaveForOthers /> },
      { path: 'leaves/review', element: <PendingRequest /> },
      { path: 'notices', element: <ListNotices /> },
      { path: 'notices/add', element: <AddNotice /> },
      { path: 'notices/:id', element: <ViewNotice /> },
      { path: 'notices/edit/:id', element: <EditNotice /> },
      { path: 'notices/review', element: <ManageNotices /> },
      { path: 'departments', element: <Departments /> },
      { path: 'departments/edit/:id', element: <EditDepartment /> },
      { path: 'fiscal-years', element: <FiscalYears /> },
      { path: 'attendances', element: <ViewAttendance /> },
      { path: 'attendances/record', element: <TakeAttendance /> },
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
    element: <NotFound />,
    errorElement: <Error />
  }
];

export const router = createBrowserRouter(routes);
