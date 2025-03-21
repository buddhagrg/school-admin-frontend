import { useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Block, CheckCircle } from '@mui/icons-material';

import { HandleLeaveRequest } from './handle-leave-request';
import { DATE_FORMAT, DATE_TIME_24_HR_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { LeaveStatusType, MyLeaveRequestDetail } from '@/app/leave/types';
import { useGetLeavePendingQuery } from '@/app/leave/leave-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { ERROR_MESSAGE } from '@/components/errors';

type State = {
  action: LeaveStatusType;
  leaveId: number;
};
const initialState: State = {
  action: 'REVIEW_REQUEST',
  leaveId: 0
};
export const ListPendingRequest = () => {
  const { data, isLoading, isError, error } = useGetLeavePendingQuery();
  const [state, setState] = useState<State>(initialState);

  const columns: MRT_ColumnDef<MyLeaveRequestDetail>[] = useMemo(
    () => [
      { accessorKey: 'user', header: 'Name', minWidth: 110 },
      { accessorKey: 'policy', header: 'Policy', minWidth: 110 },
      { accessorKey: 'note', header: 'Note', minWidth: 130 },
      {
        accessorKey: 'request',
        header: 'Request',
        minWidth: 180,
        Cell: ({ row }) => {
          const {
            original: { from, to, days }
          } = row;
          return (
            <>
              {getFormattedDate(from, DATE_FORMAT)}
              {`—`}
              {getFormattedDate(to, DATE_FORMAT)} ({days} Days)
            </>
          );
        }
      },
      {
        accessorKey: 'submitted',
        header: 'Submitted Date',
        minWidth: 180,
        Cell: ({ row }) => {
          return <>{getFormattedDate(row.original.submitted, DATE_TIME_24_HR_FORMAT)}</>;
        }
      },
      {
        accessorKey: 'updated',
        header: 'Updated Date',
        minWidth: 180,
        Cell: ({ row }) => {
          return <>{getFormattedDate(row.original.updated, DATE_TIME_24_HR_FORMAT)}</>;
        }
      }
    ],
    []
  );
  const onActionBtnClick = (action: LeaveStatusType, leaveId: number) => {
    setState({ action, leaveId });
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.pendingLeaves || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <>
        <IconButton
          title='Approve Leave'
          color='info'
          onClick={() => onActionBtnClick('APPROVED', row.original.id)}
        >
          <CheckCircle />
        </IconButton>
        <IconButton
          title='Reject Leave'
          color='error'
          onClick={() => onActionBtnClick('CANCELLED', row.original.id)}
        >
          <Block />
        </IconButton>
      </>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });
  const closeModal = () => {
    setState(initialState);
  };

  const { action, leaveId } = state;
  const actionTxt: Record<LeaveStatusType, string> = {
    APPROVED: 'Approve',
    CANCELLED: 'Cancel',
    REVIEW_REQUEST: 'Review'
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />

        {['APPROVED', 'CANCELLED'].includes(action) && (
          <HandleLeaveRequest
            leaveId={leaveId}
            status={action}
            titleText={`${actionTxt[action]} Leave`}
            contextText={`Are you sure you want to ${actionTxt[action]} this leave request?`}
            closeModal={closeModal}
          />
        )}
      </Box>
    </>
  );
};
