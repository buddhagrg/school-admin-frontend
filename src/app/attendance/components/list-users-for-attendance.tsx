import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_RowSelectionState,
  useMaterialReactTable
} from 'material-react-table';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import {
  useRecordStaffAttendanceMutation,
  useRecordStudentsAttendanceMutation
} from '../attendance-api';
import { UserAttendance, UserAttendanceCommonDetail } from '../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '@/components/errors';
import { attendanceStatus } from '@/constants';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';

type ListUsersForAttendanceProps = {
  attendanceDate: string | Date;
  data: UserAttendanceCommonDetail[];
  isLoading: boolean;
  isError: boolean;
  error?: string | null;
  type: 'staff' | 'students';
  handleDataChange: (userId: number, property: string, value: string) => void;
};
export const ListUsersForAttendance: React.FC<ListUsersForAttendanceProps> = ({
  handleDataChange,
  data,
  isLoading,
  type,
  isError,
  error,
  attendanceDate
}) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [recordStudentsAttendance, { isLoading: isRecordingStudentsAttendance }] =
    useRecordStudentsAttendanceMutation();
  const [recordStaffAttendance, { isLoading: isRecordingStaffAttendance }] =
    useRecordStaffAttendanceMutation();

  const columns = useMemo<MRT_ColumnDef<UserAttendanceCommonDetail>[]>(
    () => [
      {
        accessorKey: 'userId',
        header: 'User Id',
        size: 100
      },
      {
        accessorKey: 'name',
        header: 'User Name'
      },
      {
        accessorKey: 'attendanceStatus',
        header: 'Attendance Status',
        size: 400,
        Cell: ({ row }) => {
          const { userId, attendanceStatusCode } = row.original;
          return (
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
            >
              {attendanceStatus.map(({ id: statusId, name }) => (
                <FormControlLabel
                  key={statusId}
                  label={name}
                  value={statusId}
                  checked={attendanceStatusCode === statusId}
                  control={
                    <Radio
                      onChange={() => handleDataChange(userId, 'attendanceStatusCode', statusId)}
                    />
                  }
                />
              ))}
            </RadioGroup>
          );
        }
      },
      {
        accessorKey: 'remarks',
        header: 'Remarks',
        Cell: ({ row }) => {
          const { userId, remarks } = row.original;
          return (
            <TextField
              size='small'
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              placeholder='Add remarks (optional)'
              value={remarks || ''}
              onChange={(event) => handleDataChange(userId, 'remarks', event.target.value)}
            />
          );
        }
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined'
    },
    getRowId: (row) => row?.userId?.toString(),
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
            Save Attendance
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
        const selected = data.find((item) => item.userId === keyNumber);
        if (selected) {
          return [
            ...acc,
            {
              userId: keyNumber,
              status: selected.attendanceStatusCode,
              remarks: selected.remarks
            }
          ];
        }

        return acc;
      }, []);

      const payload = {
        attendances,
        attendanceDate: getFormattedDate(attendanceDate, API_DATE_FORMAT)
      };
      const result =
        type === 'staff'
          ? await recordStaffAttendance(payload).unwrap()
          : await recordStudentsAttendance(payload).unwrap();
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
