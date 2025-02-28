import { CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';

import { ClassItem } from '../components/level/class-item';
import { useGetAcademicLevelsWithClassesQuery } from '../api';
import { ResponsiveBox } from '@/components/responsive-box';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { AddClassToLevel } from '../components/level/add-class-to-level';
import { PageContentHeader } from '@/components/page-content-header';
import { ERROR_MESSAGE } from '@/components/errors';

export const LevelClassPage = () => {
  const { data, isLoading, isError, error } = useGetAcademicLevelsWithClassesQuery();

  if (isLoading) {
    return (
      <ResponsiveBox>
        <CircularProgress size='small' />
      </ResponsiveBox>
    );
  }
  if (isError) {
    return (
      <ResponsiveBox>
        <>{getErrorMsg(error).message}</>
      </ResponsiveBox>
    );
  }
  if (!data || data?.levelsWithClasses.length <= 0) {
    return (
      <ResponsiveBox>
        <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>
      </ResponsiveBox>
    );
  }

  return (
    <>
      <PageContentHeader heading='Academic Level and Class Relation' icon={Info} />
      {data?.levelsWithClasses.map(({ id, name, classes }) => (
        <div key={id}>
          <Typography sx={{ fontWeight: '500' }}>{name}</Typography>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, xl: 8 }}>
              <Paper sx={{ p: 2 }}>
                {classes.length > 0 ? (
                  classes?.map((item) => (
                    <ClassItem key={item.id} classId={item.id} className={item.name} />
                  ))
                ) : (
                  <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>
                )}
              </Paper>
            </Grid2>
            <AddClassToLevel
              academicLevelId={id}
              academicLevelName={name}
              usedClassList={classes}
            />
          </Grid2>
          <hr />
        </div>
      ))}
    </>
  );
};
