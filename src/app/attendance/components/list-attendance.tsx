import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_RowSelectionState,
  useMaterialReactTable
} from 'material-react-table';
import {
  useRecordStaffAttendanceMutation,
  useRecordStudentsAttendanceMutation
} from '../attendance-api';
import { UserAttendance, UserAttendanceCommonDetail } from '../types';
import React, { useMemo, useState } from 'react';
import { Box, Button, Switch } from '@mui/material';
import { toast } from 'react-toastify';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ERROR_MESSAGE } from '@/components/errors';

type ListAttendanceProps = {
  data: UserAttendanceCommonDetail[];
  isLoading: boolean;
  isError: boolean;
  error?: string | null;
  type: 'staff' | 'students';
  handleDataChange: (id: number, property: string, value: string) => void;
};
export const ListAttendance: React.FC<ListAttendanceProps> = ({
  handleDataChange,
  data,
  isLoading,
  type,
  isError,
  error
}) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [recordStudentsAttendance, { isLoading: isRecordingStudentsAttendance }] =
    useRecordStudentsAttendanceMutation();
  const [recordStaffAttendance, { isLoading: isRecordingStaffAttendance }] =
    useRecordStaffAttendanceMutation();

  const columns = useMemo<MRT_ColumnDef<UserAttendanceCommonDetail>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 100,
        enableEditing: false
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableEditing: false
      },
      {
        accessorKey: 'attendanceStatus',
        header: 'Attendance Status',
        enableEditing: false
      },
      {
        id: 'attendanceAction',
        header: 'Attendance Actions',
        enableEditing: false,
        columns: [
          {
            id: 'present',
            header: 'Present',
            enableEditing: false,
            size: 50,
            Cell: ({ row }) => {
              const { id, attendanceStatusCode } = row.original;
              return (
                <Switch
                  checked={attendanceStatusCode === 'PR'}
                  onChange={() => handleDataChange(id, 'attendanceStatusCode', 'PR')}
                />
              );
            }
          },
          {
            id: 'absent',
            header: 'Absent',
            enableEditing: false,
            size: 50,
            Cell: ({ row }) => {
              const { id, attendanceStatusCode } = row.original;
              return (
                <Switch
                  checked={attendanceStatusCode === 'AB'}
                  onChange={() => handleDataChange(id, 'attendanceStatusCode', 'AB')}
                />
              );
            }
          },
          {
            id: 'latePresent',
            header: 'Late Present',
            enableEditing: false,
            size: 50,
            Cell: ({ row }) => {
              const { id, attendanceStatusCode } = row.original;
              return (
                <Switch
                  checked={attendanceStatusCode === 'LP'}
                  onChange={() => handleDataChange(id, 'attendanceStatusCode', 'LP')}
                />
              );
            }
          },
          {
            id: 'earlyLeave',
            header: 'Early Leave',
            enableEditing: false,
            size: 50,
            Cell: ({ row }) => {
              const { id, attendanceStatusCode } = row.original;
              return (
                <Switch
                  checked={attendanceStatusCode === 'EL'}
                  onChange={() => handleDataChange(id, 'attendanceStatusCode', 'EL')}
                />
              );
            }
          }
        ]
      },
      {
        accessorKey: 'remarks',
        header: 'Remarks',
        muiEditTextFieldProps: ({ row }) => ({
          type: 'text',
          onChange: (event) => {
            handleDataChange(row.original.id, 'remarks', event.target.value);
          }
        })
      }
    ],
    [data, handleDataChange]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableEditing: true,
    editDisplayMode: 'cell',
    enableCellActions: true,
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
      showGlobalFilter: true,
      rowSelection,
      isSaving: isRecordingStaffAttendance || isRecordingStudentsAttendance
    },
    onRowSelectionChange: setRowSelection,
    renderTopToolbar: ({ table }) => {
      const isDisabled =
        table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? false : true;
      return (
        <Box
          sx={{
            display: 'flex',
            p: '8px',
            justifyContent: 'space-between'
          }}
        >
          <MRT_GlobalFilterTextField table={table} />
          <Button
            size='small'
            color='primary'
            disabled={isDisabled}
            onClick={onSubmit}
            variant='contained'
          >
            Save
          </Button>
        </Box>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? error : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const onSubmit = async () => {
    try {
      const attendances = Object.keys(rowSelection).reduce<UserAttendance[]>((acc, key) => {
        const keyNumber = Number(key);
        const selected = data.find((item) => item.id === keyNumber);
        if (selected) {
          return [
            ...acc,
            {
              id: keyNumber,
              status: selected.attendanceStatusCode,
              remarks: selected.remarks
            }
          ];
        }

        return acc;
      }, []);
      console.log(attendances);
      const result =
        type === 'staff'
          ? await recordStaffAttendance({ attendances }).unwrap()
          : await recordStudentsAttendance({ attendances }).unwrap();
      toast.info(result.message);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};
