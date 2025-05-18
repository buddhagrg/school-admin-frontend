import React, { useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

import { useGetMyLeaveHistoryQuery } from '../../request-leave-api';
import type { LeaveRequestFilterProps } from '../../types';
import type { LeaveDetail, NameIdType } from '@/shared/types';
import { API_DATE_FORMAT, DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { DeleteLeaveRequest } from './delete-leave-request';
import { EditLeaveRequest } from '../leave-action/edit-leave-request';
import { LEAVE_STATUS_CHIP } from '../leave-status';
import { ViewLeaveDetail } from '../leave-action/view-leave-detail';
import { getDateRange } from '@/utils/helpers/get-date-range';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { ResponsiveBox } from '@/shared/components';

type LeaveRequestTableProps = {
  filter: LeaveRequestFilterProps;
};
const options: NameIdType<string>[] = [
  { id: 'view', name: 'View' },
  { id: 'edit', name: 'Edit' },
  { id: 'delete', name: 'Delete' }
];
type TableDataProps = {
  action: string;
  data: LeaveDetail | null;
};
const tableData: TableDataProps = {
  action: '',
  data: null
};

export const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({ filter }) => {
  const { dateRangeId, fromDate, toDate, ...rest } = filter;
  const dateRange = dateRangeId === 'CUSTOM' ? null : getDateRange(dateRangeId!);
  const { data, isLoading, isError, error } = useGetMyLeaveHistoryQuery({
    ...rest,
    fromDate: dateRange ? dateRange.from : getFormattedDate(fromDate || '', API_DATE_FORMAT),
    toDate: dateRange ? dateRange.to : getFormattedDate(toDate || '', API_DATE_FORMAT)
  });
  const [rowData, setRowData] = useState(tableData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const columns: MRT_ColumnDef<LeaveDetail>[] = [
    { accessorKey: 'policy', header: 'Leave Type' },
    {
      id: 'dateRange',
      header: 'Date Range',
      Cell: ({ row }) => {
        const { fromDate, toDate } = row.original;
        const fromDt = getFormattedDate(fromDate, DATE_FORMAT);
        const toDt = getFormattedDate(toDate, DATE_FORMAT);
        return <>{`${fromDt} - ${toDt}`}</>;
      }
    },
    { accessorKey: 'duration', header: 'Duration (in days)' },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ row }) => {
        return LEAVE_STATUS_CHIP[row.original.statusId];
      }
    }
  ];
  const handleClick = (event: React.MouseEvent<HTMLElement>, data: LeaveDetail) => {
    setAnchorEl(event.currentTarget);
    setRowData({ action: '', data });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (action: string) => {
    setRowData((data) => ({ ...data, action }));
    handleClose();
  };
  const closeModal = () => {
    setRowData(tableData);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.leaveHistory || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableTopToolbar: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const { statusId } = row.original;
      return (
        <>
          <IconButton aria-label='more' onClick={(event) => handleClick(event, row.original)}>
            <MoreVert fontSize='small' />
          </IconButton>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            {options.map(({ id, name }) => (
              <MenuItem
                key={id}
                disabled={statusId !== 'PENDING' && id !== 'view'}
                onClick={() => handleMenuClick(id)}
              >
                {name}
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const selectedData = rowData.data;
  return (
    <>
      <ResponsiveBox>
        <MaterialReactTable table={table} />
      </ResponsiveBox>

      {rowData.action === 'delete' && selectedData && (
        <DeleteLeaveRequest id={selectedData.id} closeModal={closeModal} />
      )}

      {rowData.action === 'edit' && selectedData && (
        <EditLeaveRequest closeModal={closeModal} data={selectedData} />
      )}

      {rowData.action === 'view' && selectedData && (
        <ViewLeaveDetail closeModal={closeModal} data={selectedData} />
      )}
    </>
  );
};
