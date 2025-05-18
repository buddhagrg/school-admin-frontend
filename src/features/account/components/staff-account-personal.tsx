import React from 'react';
import { StaffBasicInfoView } from '@/features/staff/components/views/staff-basic-info-view';
import { StaffContactView } from '@/features/staff/components/views/staff-contact-view';
import { StaffEmergencyContactView } from '@/features/staff/components/views/staff-emergency-contact-view';
import { StaffEmploymentView } from '@/features/staff/components/views/staff-employment-view';
import { StaffQualificationView } from '@/features/staff/components/views/staff-qualification-view';
import { AccountDetailTabContent } from '@/shared/components';

export const StaffAccountPersonal = () => {
  const components: React.ReactNode[] = [
    <StaffBasicInfoView />,
    <StaffContactView />,
    <StaffEmergencyContactView />,
    <StaffEmploymentView />,
    <StaffQualificationView />
  ];

  return <AccountDetailTabContent components={components} />;
};
