import { useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { EditNote } from '@mui/icons-material';

import type { AcademicYear, AcademicYearFormPropsWithOption } from '../types';
import { useGetAcademicYearsQuery } from '../academic-years-api';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { UpdateAcademicYear } from './update-academic-year';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { academicYearInitialState } from './academi-year-initial-state';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

const initialState = {
  ...academicYearInitialState,
  id: 0
};
export const DisplayAcademicYears = () => {
  const { data, isLoading, isError, error } = useGetAcademicYearsQuery();
  const [state, setState] = useState<AcademicYearFormPropsWithOption>(initialState);

  const columns: MRT_ColumnDef<AcademicYear>[] = [
    { accessorKey: 'name', header: 'Academic Year' },
    { accessorKey: 'academicLevelName', header: 'Academic Level' },
    {
      accessorKey: 'isActive',
      header: 'Status',
      Cell: ({ cell }) => {
        const status = cell.getValue<boolean>();
        return (
          <Box component='span' sx={getTextColor(status)}>
            {status ? 'Active' : 'Inactive'}
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

  const onEditBtnClick = (data: AcademicYear) => {
    setState(data);
  };
  const closeModal = () => {
    setState((prevState) => ({ ...prevState, id: 0 }));
  };
  const table = useMaterialReactTable({
    columns,
    data: error ? [] : data?.academicYears || [],
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    enablePagination: false,
    enableColumnActions: false,
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1 }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
    ),
    renderRowActions: ({ row }) => {
      return (
        <IconButton
          title='Update Academic Year'
          size='small'
          color='primary'
          sx={{ mr: 1 }}
          onClick={() => onEditBtnClick(row.original)}
        >
          <EditNote />
        </IconButton>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {state.id > 0 && <UpdateAcademicYear closeModal={closeModal} data={state} />}
    </>
  );
};
