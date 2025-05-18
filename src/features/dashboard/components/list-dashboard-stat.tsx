import { Person, School } from '@mui/icons-material';
import { Grid2 } from '@mui/material';
import { blue } from '@mui/material/colors';

import { GeneralData } from '../dashboard-type';
import type { StatCardProps } from '@/shared/types';
import { StatCard } from '@/shared/components';

type ListDashboardStatProps = {
  students: GeneralData;
  teachers: GeneralData;
  parents: GeneralData;
};
export const ListDashboardStat: React.FC<ListDashboardStatProps> = ({ students, teachers }) => {
  const stats: StatCardProps[] = [
    {
      title: 'Students',
      totalCount: students.totalCount ?? 0,
      totalCountPreviousYear: students.totalCountPreviousYear ?? 0,
      icon: <School fontSize='small' />,
      percentDiff: students.percentDifference ?? 0,
      bgColor: blue[800]
    },
    {
      title: 'Teachers',
      totalCount: teachers.totalCount ?? 0,
      totalCountPreviousYear: teachers.totalCountPreviousYear ?? 0,
      icon: <Person fontSize='small' />,
      percentDiff: teachers.percentDifference ?? 0,
      bgColor: blue[800]
    }
  ];

  return stats.map((stat) => (
    <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={stat.title}>
      <StatCard stat={stat} />
    </Grid2>
  ));
};
