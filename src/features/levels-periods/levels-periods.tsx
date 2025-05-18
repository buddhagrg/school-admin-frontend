import { PageContentHeader, PageInfo } from '@/shared/components';
import { ManageLevelPeriodTab } from './components';
import { Box } from '@mui/material';

const pageTitle = 'About Academic Levels & Periods';
const pageSubtitle = `Academic levels (like School, College) define the structure of your institution. Each level can have its own set of periods (months, semesters, etc.).
These settings will be used throughout the system for organizing classes, scheduling, and reporting.`;
export const LevelsPeriods = () => {
  return (
    <>
      <PageContentHeader
        title='Academic Levels and Periods'
        subtitle={`Manage your institution's academic levels and their associated time periods`}
      />
      <Box mt={2} />
      <PageInfo title={pageTitle} subTitle={pageSubtitle} />
      <ManageLevelPeriodTab />
    </>
  );
};
