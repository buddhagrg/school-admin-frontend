import { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetSchoolsQuery } from '../school-api';
import type { School } from '../types';
import { getAppBase } from '@/features/auth/auth-slice';
import { DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

export const ListSchools = () => {
  const appBase = useSelector(getAppBase);
  const { data, isLoading, isError, error } = useGetSchoolsQuery();

  const columns: MRT_ColumnDef<School>[] = useMemo(
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
        accessorKey: 'createdDate',
        header: 'Created Date',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'updatedDate',
        header: 'Updated Date',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_TIME_24_HR_FORMAT)}</>
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active?',
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
        accessorKey: 'isEmailVerified',
        header: 'Is Email Verified?',
        Cell: ({ cell }) => {
          const status = cell.getValue<boolean>();
          return (
            <Box component='span' sx={getTextColor(status)}>
              {status ? 'Yes' : 'No'}
            </Box>
          );
        }
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
        title='Edit School Detail'
        color='info'
        component={Link}
        to={`${appBase}/schools/edit/${row.original.schoolId}`}
      >
        <Edit />
      </IconButton>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return <MaterialReactTable table={table} />;
};
