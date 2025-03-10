import { useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { TaskAlt, Edit } from '@mui/icons-material';

import { AcademicYear, AcademicYearFormPropsWithOption } from '../types';
import { useGetAcademicYearsQuery } from '../academic-years-api';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { UpdateAcademicYear } from './update-academic-year';
import { ActivateAcademicYear } from './activate-academic-year';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '@/components/errors';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { academicYearInitialState } from './academi-year-initial-state';

const initialState = {
  ...academicYearInitialState,
  id: 0,
  action: ''
};
export const DisplayAcademicYears = () => {
  const { data, isLoading, isError, error } = useGetAcademicYearsQuery();
  const [state, setState] = useState<AcademicYearFormPropsWithOption>(initialState);

  const columns: MRT_ColumnDef<AcademicYear>[] = [
    { accessorKey: 'name', header: 'Academic Year Name' },
    { accessorKey: 'academicLevelName', header: 'Academic Level' },
    {
      accessorKey: 'isActive',
      header: 'Is Active?',
      Cell: ({ cell }) => {
        const status = cell.getValue<boolean>();
        return (
          <Box component='span' sx={getTextColor(status)}>
            {status ? 'Yes' : 'No'}
          </Box>
        );
      }
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_FORMAT)}</>
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_FORMAT)}</>
    }
  ];

  const onActivateYearClick = (id: number, action: string) => {
    setState((prevState) => ({ ...prevState, id, action }));
  };
  const onEditBtnClick = (data: AcademicYear, action: string) => {
    setState({ ...data, action });
  };
  const closeModal = () => {
    setState((prevState) => ({ ...prevState, action: '' }));
  };
  const table = useMaterialReactTable({
    columns,
    data: error ? [] : data?.academicYears || [],
    state: {
      isLoading,
      density: 'compact'
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const { id, isActive } = row.original;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            title='Update Academic Year'
            size='small'
            color='primary'
            sx={{ mr: 1 }}
            onClick={() => onEditBtnClick(row.original, 'update')}
          >
            <Edit />
          </IconButton>
          {!isActive && (
            <IconButton
              size='small'
              onClick={() => onActivateYearClick(id, 'activate')}
              title='Activate Academic Year'
              aria-label='activate'
            >
              <TaskAlt color='success' />
            </IconButton>
          )}
        </Box>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const { action, ...restState } = state;
  return (
    <>
      <MaterialReactTable table={table} />

      {action === 'update' && <UpdateAcademicYear closeModal={closeModal} data={restState} />}
      {action === 'activate' && <ActivateAcademicYear id={state.id} closeModal={closeModal} />}
    </>
  );
};
