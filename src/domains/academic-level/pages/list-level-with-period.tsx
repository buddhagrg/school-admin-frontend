import * as React from 'react';
import { KeyboardDoubleArrowRight } from '@mui/icons-material';
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useGetAcademicLevelsWithPeriodsQuery } from '../api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdateLevel } from '../components/level/update-level';
import { UpdatePeriod } from '../components/period/update-period';
import { DeletePeriod } from '../components/period/delete-period';
import { Period } from '../types';
import { ManagePeriodOrder } from '../components/period/manage-period-order';

const ResponsiveBox = ({ children }: { children: React.ReactElement }) => {
  return (
    <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
      {children}
    </Box>
  );
};

const levelState = {
  isOpen: false,
  id: 0,
  name: ''
};
const periodState = {
  isOpen: false,
  academicLevelId: 0,
  id: 0,
  name: ''
};
const periodDeleteState = {
  isOpen: false,
  id: 0,
  name: ''
};
type levelOrderStateProps = {
  isOpen: boolean;
  academicLevelId: number;
  academicLevelName: string;
  periods: Period[];
};
const levelOrderState = {
  isOpen: false,
  academicLevelId: 0,
  academicLevelName: '',
  periods: []
};

export const ListLevelWithPeriod = () => {
  const { data, isLoading, isError, error } = useGetAcademicLevelsWithPeriodsQuery();
  const [levelDetail, setLevelDetail] = React.useState(levelState);
  const [periodDetail, setPeriodDetail] = React.useState(periodState);
  const [periodDeleteDetail, setPeriodDeleteDetail] = React.useState(periodDeleteState);
  const [levelOrderDetail, setLevelOrderDetail] =
    React.useState<levelOrderStateProps>(levelOrderState);

  const onLevelClick = (isOpen: boolean, id: number, name: string) => {
    setLevelDetail({ isOpen, id, name });
  };
  const onPeriodClick = (isOpen: boolean, academicLevelId: number, id: number, name: string) => {
    setPeriodDetail({ isOpen, academicLevelId, id, name });
  };
  const onDeletePeriodClick = (id: number, name: string) => {
    setPeriodDeleteDetail({ isOpen: true, id, name });
  };
  const closeLevelModal = () => {
    setLevelDetail((prevState) => ({ ...prevState, isOpen: false }));
  };
  const closePeriodModal = () => {
    setPeriodDetail((prevState) => ({ ...prevState, isOpen: false }));
  };
  const closeDeleteModal = () => {
    setPeriodDeleteDetail((prevState) => ({ ...prevState, isOpen: false }));
  };
  const closeLevelOrderModal = () => {
    setLevelOrderDetail((prevState) => ({ ...prevState, isOpen: false }));
  };
  const onManageLevelClick = (
    isOpen: boolean,
    academicLevelId: number,
    academicLevelName: string,
    periods: Period[]
  ) => {
    setLevelOrderDetail({
      isOpen,
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
  return (
    <>
      <ResponsiveBox>
        <>
          {data?.academicLevelsWithPeriods?.map(({ id: academicLevelId, name, periods }) => (
            <div key={academicLevelId}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                <Typography sx={{ fontWeight: '500' }}>{name}</Typography>
                <Box sx={{ ml: 'auto' }}>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => onManageLevelClick(true, academicLevelId, name, periods)}
                  >
                    Manage Order
                  </Button>
                  <Button
                    size='small'
                    variant='outlined'
                    sx={{ ml: 1 }}
                    onClick={() => onLevelClick(true, academicLevelId, name)}
                  >
                    Edit
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
                        onClick={() => onPeriodClick(true, academicLevelId, id, name)}
                      >
                        Edit
                      </Button>
                      <Button
                        size='small'
                        variant='outlined'
                        color='error'
                        sx={{ ml: 1 }}
                        onClick={() => onDeletePeriodClick(id, name)}
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

      {levelDetail.isOpen && (
        <UpdateLevel closeModal={closeLevelModal} id={levelDetail.id} name={levelDetail.name} />
      )}

      {periodDetail.isOpen && (
        <UpdatePeriod
          closeModal={closePeriodModal}
          academicLevelId={periodDetail.academicLevelId}
          id={periodDetail.id}
          name={periodDetail.name}
        />
      )}

      {periodDeleteDetail.isOpen && (
        <DeletePeriod
          closeModal={closeDeleteModal}
          id={periodDeleteDetail.id}
          name={periodDeleteDetail.name}
        />
      )}

      {levelOrderDetail.isOpen && (
        <ManagePeriodOrder
          closeModal={closeLevelOrderModal}
          academicLevelId={levelOrderDetail.academicLevelId}
          periods={levelOrderDetail.periods}
        />
      )}
    </>
  );
};
