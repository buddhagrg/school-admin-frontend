import { useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { Box, Button } from '@mui/material';

import { LEAVE_STATUS_CHIP } from '@/features/request-leave/components/leave-status';
import type { LeaveDetail } from '@/shared/types';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { useGetPendingLeavesQuery } from '../review-leave-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ReviewLeaveRequest } from './review-leave-request';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

type State = LeaveDetail | null;

export const LeaveRequestTable = () => {
  const { data, isLoading, isError, error } = useGetPendingLeavesQuery();
  const [leave, setLeave] = useState<State>(null);

  const columns: MRT_ColumnDef<LeaveDetail>[] = [
    {
      accessorKey: 'user',
      header: 'User'
    },
    {
      accessorKey: 'policy',
      header: 'Leave Type'
    },
    {
      id: 'date_range',
      header: 'Date Range',
      Cell: ({ row }) => {
        const { fromDate, toDate } = row.original;
        const formattedDate = `${getFormattedDate(fromDate, DATE_FORMAT)} - ${getFormattedDate(toDate, DATE_FORMAT)}`;
        return <>{formattedDate}</>;
      }
    },
    {
      id: 'duration',
      header: 'Duration (in days)',
      Cell: ({ row }) => {
        return <>{`${row.original.duration} days`}</>;
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ row }) => {
        return LEAVE_STATUS_CHIP[row.original.statusId];
      }
    }
  ];
  const handleClick = (data: LeaveDetail) => () => {
    setLeave(data);
  };
  const closeModal = () => {
    setLeave(null);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.pendingLeaves || [],
    columns,
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
        <Button size='small' onClick={handleClick(row.original)}>
          Review
        </Button>
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

      {leave && <ReviewLeaveRequest closeModal={closeModal} leave={leave} />}
    </>
  );
};
