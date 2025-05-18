import { ErrorOutline } from '@mui/icons-material';
import { Box } from '@mui/material';
import { orange } from '@mui/material/colors';
import { InfoSection, SubSoftText, TitleText } from '@/shared/components';

export const NoLeavePolicy = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ErrorOutline color='warning' />
        <TitleText color={orange[800]} text='No Leave Policies Assigned' />
      </Box>
      <SubSoftText text="You currently don't have any leave policies assigned to your account." />
      <Box mt={2} />
      <InfoSection
        icon={ErrorOutline}
        heading='What does this mean?'
        subHeading={`
        Before you can request leave, your HR department needs to assign appropriate leave policies to your account. 
        This determines what types of leave you're eligible for and how many days you can take.`}
      />
      <Box mt={2} />
      <TitleText text='What should I do next?' />
      <SubSoftText
        text={`
        Please contact your HR department or system administrator to have leave policies assigned to your account.
        Once policies are assigned, you'll be able to request leave through this page.`}
      />
    </Box>
  );
};
