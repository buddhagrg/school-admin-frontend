import React, { useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { MoreVert } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';

import type { Notice, NoticeStatusCode } from '../types';
import { NOTICE_STATUS_CHIP } from './notice-status-chip';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { ViewNotice } from './view-notice';
import { EditNotice } from './edit-notice';
import { ReviewNotice } from './review-notice';
import { getUser } from '@/features/auth/auth-slice';
import { getAvailableActions } from '../get-available-actions';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';
import { ResponsiveBox } from '@/shared/components';

type RowData = {
  action: string;
  data: Notice | null;
};
const state = {
  action: '',
  data: null
};
type NoticeTableProps = {
  data: Notice[];
  isLoading: boolean;
  error?: string;
};
export const NoticeTable: React.FC<NoticeTableProps> = ({ data, isLoading, error }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [rowData, setRowData] = useState<RowData>(state);
  const [actions, setActions] = useState<string[]>([]);
  const isMenuOpen = Boolean(anchorEl);
  const user = useSelector(getUser);

  const columns: MRT_ColumnDef<Notice>[] = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'author', header: 'Author' },
    {
      id: 'status',
      header: 'Status',
      Cell: ({ row }) => {
        return <>{NOTICE_STATUS_CHIP[row.original.statusId as NoticeStatusCode]}</>;
      }
    },
    {
      accessorKey: 'createdDate',
      header: 'Created Date',
      Cell: ({ row }) => {
        return <>{getFormattedDate(row.original.createdDate, DATE_FORMAT)}</>;
      }
    },
    {
      accessorKey: 'updatedDate',
      header: 'Updated Date',
      Cell: ({ row }) => {
        return <>{getFormattedDate(row.original.updatedDate, DATE_FORMAT)}</>;
      }
    },
    {
      accessorKey: 'reviewerName',
      header: 'Reviewer'
    }
  ];
  const onActionIcon = (event: React.MouseEvent<HTMLElement>, data: Notice) => {
    const actions = getAvailableActions(user!, data);
    setActions(actions);
    setAnchorEl(event.currentTarget);
    setRowData((prev) => ({ ...prev, data }));
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (action: string) => {
    setRowData((prev) => ({ ...prev, action }));
    handleMenuClose();
  };
  const closeModal = () => {
    setRowData(state);
  };
  const table = useMaterialReactTable({
    columns,
    data: data,
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1 }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
    ),
    enableRowActions: true,
    enablePagination: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      return (
        <>
          <IconButton onClick={(event) => onActionIcon(event, row.original)}>
            <MoreVert />
          </IconButton>
          <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={handleMenuClose}>
            {actions.map((action) => {
              return (
                <Box key={action}>
                  <MenuItem key={action} onClick={() => handleMenuClick(action)}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </MenuItem>
                </Box>
              );
            })}
          </Menu>
        </>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = error || ERROR_MESSAGE.DATA_NOT_FOUND;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  const noticeId = rowData.data?.id;
  return (
    <ResponsiveBox>
      <MaterialReactTable table={table} />
      {rowData.action === 'view' && <ViewNotice notice={rowData.data!} closeModal={closeModal} />}
      {rowData.action === 'edit' && rowData.data && (
        <EditNotice closeModal={closeModal} notice={rowData.data} />
      )}
      {['approve', 'reject', 'delete', 'publish'].includes(rowData.action) && noticeId && (
        <ReviewNotice action={rowData.action} id={noticeId} closeModal={closeModal} />
      )}
    </ResponsiveBox>
  );
};
