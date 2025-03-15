import React, { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box, Chip, IconButton } from '@mui/material';
import { Edit, ExitToApp, HighlightOff, Schedule, TaskAlt } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  AttendanceFormPropsWithId,
  AttendanceFormSchema,
  UserAttendanceCommonDetail
} from '../types';
import { ERROR_MESSAGE } from '@/components/errors';
import { DATE_FORMAT, DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { UpdateAttendance } from './update-attendance';

type ListAttendanceProps = {
  data: UserAttendanceCommonDetail[];
  isLoading: boolean;
  isError: boolean;
  error?: string | null;
  type: 'staff' | 'students';
};
type AttendanceStatus = 'PR' | 'AB' | 'LP' | 'EL';
type AttendanceStatusColor = 'success' | 'error' | 'warning' | 'primary';
const formState = {
  id: 0,
  userId: 0,
  status: '',
  remarks: ''
};
const STATUS_ICONS: Record<AttendanceStatus, JSX.Element> = {
  PR: <TaskAlt color='success' />,
  AB: <HighlightOff color='error' />,
  LP: <Schedule color='warning' />,
  EL: <ExitToApp color='primary' />
};
const STATUS_COLORS: Record<AttendanceStatus, AttendanceStatusColor> = {
  PR: 'success',
  AB: 'error',
  LP: 'warning',
  EL: 'primary'
};
const getStatusIcon = (code: AttendanceStatus) => STATUS_ICONS[code];
const getStatusColor = (code: AttendanceStatus) => STATUS_COLORS[code];
export const ListAttendance: React.FC<ListAttendanceProps> = ({
  data,
  isLoading,
  type,
  isError,
  error
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const methods = useForm<AttendanceFormPropsWithId>({
    defaultValues: formState,
    resolver: zodResolver(AttendanceFormSchema)
  });

  const columns = useMemo<MRT_ColumnDef<UserAttendanceCommonDetail>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Record Id',
        size: 100
      },
      {
        accessorKey: 'name',
        header: 'User Name'
      },
      {
        accessorKey: 'attendanceStatus',
        header: 'Attendance Status',
        Cell: ({ row }) => {
          const { attendanceStatusCode, attendanceStatus } = row.original;
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <>{getStatusIcon(attendanceStatusCode as AttendanceStatus)}</>
              <Chip
                label={attendanceStatus}
                color={getStatusColor(attendanceStatusCode as AttendanceStatus)}
                variant='outlined'
                sx={{ ml: 1 }}
              />
            </Box>
          );
        }
      },
      {
        accessorKey: 'attendanceDate',
        header: 'Attendance Date',
        Cell: ({ cell }) => (
          <>{getFormattedDate(cell.getValue<Date | string | null>(), DATE_FORMAT)}</>
        )
      },
      {
        accessorKey: 'lastUpdatedDate',
        header: 'Last Updated',
        size: 250,
        Cell: ({ cell }) => (
          <>{getFormattedDate(cell.getValue<Date | string | null>(), DATE_TIME_24_HR_FORMAT)}</>
        )
      },
      {
        accessorKey: 'remarks',
        header: 'Remarks'
      }
    ],
    []
  );

  const onEditBtn = (data: UserAttendanceCommonDetail) => {
    methods.setValue('id', data.id);
    methods.setValue('userId', data.userId);
    methods.setValue('name', data.name);
    methods.setValue('status', data.attendanceStatusCode);
    methods.setValue('remarks', data.remarks);
    setIsModalOpen(true);
  };
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: 'last',
    paginationDisplayMode: 'pages',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined'
    },
    getRowId: (row) => row?.id?.toString(),
    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined'
    },
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    renderRowActions: ({ row }) => {
      return (
        <IconButton
          title='Update status'
          aria-label='update'
          color='primary'
          onClick={() => onEditBtn(row.original)}
        >
          <Edit />
        </IconButton>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? error : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <MaterialReactTable table={table} />
      {isModalOpen && (
        <UpdateAttendance
          closeModal={closeModal}
          methods={methods}
          title='Update Attendance Status'
          type={type}
        />
      )}
    </>
  );
};
