import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import type { Period } from '../../types';
import {
  useGetAcademicLevelsQuery,
  useGetAcademicPeriodsQuery,
  useReorderPeriodsMutation
} from '../../levels-periods-api';
import { DisplayItem } from '../display-item';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdatePeriod } from './update-period';
import { DeletePeriod } from './delete-period';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { Error, HeadingText, Loader, SubSoftText, TitleText } from '@/shared/components';

type PeriodStateType = Period & {
  action: string;
};
const periodInitialState: PeriodStateType = {
  action: '',
  academicLevelId: 0,
  id: 0,
  name: '',
  startDate: null,
  endDate: null
};
export const ListPeriods = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [state, setState] = useState<Period[]>([]);
  const [mode, setMode] = useState<string | null>(null);
  const [periodDetail, setPeriodDetail] = useState<PeriodStateType>(periodInitialState);
  const {
    data: periodData,
    isLoading,
    isError,
    error
  } = useGetAcademicPeriodsQuery(selectedLevel ?? skipToken);
  const { data: levelsData } = useGetAcademicLevelsQuery();
  const [reorder, { isLoading: isPeriodsReordering }] = useReorderPeriodsMutation();

  useEffect(() => {
    if (periodData?.academicPeriods) {
      setState(periodData?.academicPeriods);
    }
  }, [periodData?.academicPeriods]);
  const onModeChange = async (mode: string) => {
    if (mode === 'reorder') {
      setMode(mode);
    } else if (mode === 'done') {
      try {
        const periods = state.map(({ id }, index) => ({ id, sortOrder: index + 1 }));
        const result = await reorder({
          academicLevelId: selectedLevel,
          periods
        }).unwrap();
        toast.info(result.message);
        setMode(mode);
      } catch (error) {
        toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
      }
    }
  };
  const onMoveItem = (index: number, direction: string) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= state.length) return;

    const newItems = [...state];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setState(newItems);
  };
  const onSelectChange = (event: SelectChangeEvent) => {
    setSelectedLevel(Number(event.target.value));
  };
  const selectLevelError = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        mt: 2
      }}
    >
      <Box>
        <InfoOutlined color='primary' />
      </Box>
      <HeadingText text='Select an academic level' />
      <SubSoftText text='Please select an academic level from the dropdown to view and manage its periods.' />
    </Box>
  );
  const onActionBtnClick = (index: number, action: string) => {
    const item = state[index];
    setPeriodDetail({ action, ...item });
  };
  const closeModal = () => {
    setPeriodDetail((prevState) => ({ ...prevState, action: '' }));
  };

  return (
    <>
      <Card>
        <CardHeader
          title={<TitleText text='Academic Periods' />}
          subheader={<SubSoftText text='Create a new period for the selected academic level' />}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl size='small'>
                <Select sx={{ mr: 2 }} value={selectedLevel.toString()} onChange={onSelectChange}>
                  <MenuItem value={0}>Select Level</MenuItem>
                  {levelsData?.academicLevels?.map(({ id, name }) => (
                    <MenuItem key={id.toString()} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {!mode || mode === 'done' ? (
                <Button
                  disabled={state.length <= 1}
                  variant='outlined'
                  onClick={() => onModeChange('reorder')}
                >
                  Reorder
                </Button>
              ) : (
                <Button
                  disabled={state.length <= 1 || isPeriodsReordering}
                  variant='outlined'
                  onClick={() => onModeChange('done')}
                >
                  Done
                </Button>
              )}
            </Box>
          }
        />
        <CardContent>
          {!selectedLevel && !isLoading ? selectLevelError() : null}
          {isLoading && <Loader />}
          {selectedLevel && isError ? <Error message={getErrorMsg(error).message} /> : null}
          {!isError &&
            state.map(({ id, name, startDate, endDate }, index) => {
              const subHeading: string =
                startDate && endDate
                  ? `${getFormattedDate(startDate, DATE_FORMAT)} - ${getFormattedDate(endDate, DATE_FORMAT)}`
                  : '';
              return (
                <DisplayItem
                  onActionBtnClick={onActionBtnClick}
                  mode={mode}
                  subHeading={subHeading}
                  heading={name}
                  key={id}
                  index={index}
                  onMoveItem={onMoveItem}
                />
              );
            })}
        </CardContent>
      </Card>

      {periodDetail.action === 'edit' && (
        <UpdatePeriod
          closeModal={closeModal}
          academicLevelId={selectedLevel}
          id={periodDetail.id}
          name={periodDetail.name}
          startDate={periodDetail.startDate}
          endDate={periodDetail.endDate}
        />
      )}

      {periodDetail.action === 'delete' && (
        <DeletePeriod
          academicLevelId={selectedLevel}
          closeModal={closeModal}
          id={periodDetail.id}
          name={periodDetail.name}
        />
      )}
    </>
  );
};
