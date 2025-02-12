import * as React from 'react';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useGetAcademicStructureQuery } from '../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdateLevel } from './level/update-level';
import { UpdatePeriod } from './period/update-period';
import { DeletePeriod } from './period/delete-period';
import { Period } from '../types';
import { ManagePeriodOrder } from './period/manage-period-order';
import { DeleteLevel } from './level/delete-level';
import { ResponsiveBox } from '@/components/responsive-box';
import { ERROR } from '@/constants';

type levelAction = '' | 'manage' | 'update' | 'delete';
type levelStateProps = {
  action: levelAction;
  academicLevelId: number;
  academicLevelName: string;
  periods: Period[];
};
const levelState: levelStateProps = {
  action: '',
  academicLevelId: 0,
  academicLevelName: '',
  periods: []
};
const periodState = {
  action: '',
  academicLevelId: 0,
  id: 0,
  periodName: ''
};

export const ListLevelWithPeriod = () => {
  const { data, isLoading, isError, error } = useGetAcademicStructureQuery();
  const [periodDetail, setPeriodDetail] = React.useState(periodState);
  const [levelDetail, setLevelDetail] = React.useState<levelStateProps>(levelState);

  const onPeriodClick = (
    action: string,
    academicLevelId: number,
    id: number,
    periodName: string
  ) => {
    setPeriodDetail({ action, academicLevelId, id, periodName });
  };
  const closeLevelModal = () => {
    setLevelDetail((prevState) => ({ ...prevState, action: '' }));
  };
  const closePeriodModal = () => {
    setPeriodDetail((prevState) => ({ ...prevState, action: '' }));
  };
  const onLevelBtnClick = (
    action: levelAction,
    academicLevelId: number,
    academicLevelName: string,
    periods: Period[]
  ) => {
    setLevelDetail({
      action,
      academicLevelId,
      academicLevelName,
      periods
    });
  };

  if (isLoading) {
    return (
      <ResponsiveBox>
        <CircularProgress />
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
  if (!data || data?.academicStructure.length <= 0) {
    return (
      <ResponsiveBox>
        <>{ERROR.NO_RECORD}</>
      </ResponsiveBox>
    );
  }

  return (
    <>
      <ResponsiveBox>
        <>
          {data?.academicStructure?.map(({ id: academicLevelId, name, periods }) => (
            <div key={academicLevelId}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <Typography sx={{ fontWeight: '500' }}>{name}</Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Button
                    size='small'
                    variant='outlined'
                    color='error'
                    onClick={() => onLevelBtnClick('delete', academicLevelId, name, periods)}
                  >
                    Delete
                  </Button>
                  <Button
                    size='small'
                    variant='outlined'
                    sx={{ mx: 1 }}
                    onClick={() => onLevelBtnClick('update', academicLevelId, name, periods)}
                  >
                    Edit
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => onLevelBtnClick('manage', academicLevelId, name, periods)}
                  >
                    Manage Order
                  </Button>
                </Box>
              </Box>
              <ul>
                {periods?.map(({ id, name }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mr: 1 }} key={id}>
                    <KeyboardDoubleArrowRight fontSize='inherit' />
                    <Typography variant='body2'>{name}</Typography>
                    <Box sx={{ ml: 'auto' }}>
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() => onPeriodClick('update', academicLevelId, id, name)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        sx={{ ml: 1 }}
                        onClick={() => onPeriodClick('delete', academicLevelId, id, name)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
              </ul>
            </div>
          ))}
        </>
      </ResponsiveBox>

      {levelDetail.action === 'manage' && (
        <ManagePeriodOrder
          closeModal={closeLevelModal}
          academicLevelId={levelDetail.academicLevelId}
          periods={levelDetail.periods}
        />
      )}
      {levelDetail.action === 'update' && (
        <UpdateLevel
          closeModal={closeLevelModal}
          id={levelDetail.academicLevelId}
          name={levelDetail.academicLevelName}
        />
      )}
      {levelDetail.action === 'delete' && (
        <DeleteLevel
          closeModal={closeLevelModal}
          id={levelDetail.academicLevelId}
          name={levelDetail.academicLevelName}
        />
      )}

      {periodDetail.action === 'update' && (
        <UpdatePeriod
          closeModal={closePeriodModal}
          academicLevelId={periodDetail.academicLevelId}
          id={periodDetail.id}
          name={periodDetail.periodName}
        />
      )}

      {periodDetail.action === 'delete' && (
        <DeletePeriod
          closeModal={closePeriodModal}
          id={periodDetail.id}
          name={periodDetail.periodName}
        />
      )}
    </>
  );
};
