import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetSchoolsQuery } from '../../api';
import { School } from '../../types';
import { useSelector } from 'react-redux';
import { getAppBase } from '@/domains/auth/slice';
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';

export const DisplaySchools = () => {
  const appBase = useSelector(getAppBase);
  const { data, isLoading, isError, error } = useGetSchoolsQuery();

  const columns: MRT_ColumnDef<School>[] = React.useMemo(
    () => [
      {
        accessorKey: 'schoolId',
        header: 'School Id'
      },
      {
        accessorKey: 'name',
        header: 'NAME'
      },
      {
        accessorKey: 'email',
        header: 'EMAIL'
      },
      {
        accessorKey: 'phone',
        header: 'PHONE'
      },
      {
        accessorKey: 'lastModifiedByName',
        header: 'Last Modified By'
      },
      {
        accessorKey: 'createdDt',
        header: 'Created Date',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'updatedDt',
        header: 'Updated Date',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active',
        Cell: ({ cell }) => <>{cell.getValue<boolean>().toString()}</>
      },
      {
        accessorKey: 'isEmailVerified',
        header: 'Is Email Verified',
        Cell: ({ cell }) => <>{cell.getValue<boolean>().toString()}</>
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    data: isError ? [] : data?.schools || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.schoolId?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <IconButton
        title='Edit class'
        color='info'
        component={Link}
        to={`${appBase}/schools/edit/${row.original.schoolId}`}
      >
        <Edit />
      </IconButton>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
};