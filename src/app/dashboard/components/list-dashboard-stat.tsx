import {
  FamilyRestroom,
  School,
  SupervisorAccount,
  TrendingDown,
  TrendingUp
} from '@mui/icons-material';
import { GeneralData } from '../dashboard-type';
import { Grid2 } from '@mui/material';
import { StatCard } from '@/components/stat-card';
import { green, red } from '@mui/material/colors';
import { StatCardProps } from '@/types';

type ListDashboardStatProps = {
  students: GeneralData;
  teachers: GeneralData;
  parents: GeneralData;
};
export const ListDashboardStat: React.FC<ListDashboardStatProps> = ({
  students,
  teachers,
  parents
}) => {
  const studentIconColor =
    students.totalNumberPercInComparisonFromPrevYear < 0 ? 'error' : 'success';
  const teachersIconColor =
    teachers.totalNumberPercInComparisonFromPrevYear < 0 ? 'error' : 'success';
  const parentsIconColor =
    parents.totalNumberPercInComparisonFromPrevYear < 0 ? 'error' : 'success';
  const successColor = green[100];
  const errorColor = red[100];

  const stats: StatCardProps[] = [
    {
      title: 'Students',
      stat: students.totalNumberCurrentYear,
      icon: <School color={studentIconColor} />,
      bgColor: studentIconColor === 'success' ? successColor : errorColor,
      sideIcon:
        studentIconColor === 'success' ? (
          <TrendingUp color={studentIconColor} />
        ) : (
          <TrendingDown color={studentIconColor} />
        )
    },
    {
      title: 'Teachers',
      stat: teachers.totalNumberCurrentYear,
      icon: <SupervisorAccount color={teachersIconColor} />,
      bgColor: teachersIconColor === 'success' ? successColor : errorColor,
      sideIcon:
        teachersIconColor === 'success' ? (
          <TrendingUp color={teachersIconColor} />
        ) : (
          <TrendingDown color={teachersIconColor} />
        )
    },
    {
      title: 'Parents',
      stat: parents.totalNumberCurrentYear,
      icon: <FamilyRestroom color={parentsIconColor} />,
      bgColor: parentsIconColor === 'success' ? successColor : errorColor,
      sideIcon:
        parentsIconColor === 'success' ? (
          <TrendingUp color={parentsIconColor} />
        ) : (
          <TrendingDown color={parentsIconColor} />
        )
    }
  ];

  return stats.map(({ title, stat, icon, bgColor, sideIcon }) => (
    <Grid2 size={{ xs: 12, md: 3 }} key={title}>
      <StatCard title={title} stat={stat} icon={icon} bgColor={bgColor} sideIcon={sideIcon} />
    </Grid2>
  ));
};
