import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { Edit, TaskAlt } from '@mui/icons-material';

import { FiscalYear, FiscalYearInitialStateProps } from '../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetFiscalYearsQuery } from '../fiscal-years-api';
import { ERROR_MESSAGE } from '@/components/errors';
import { fiscalYearInitialState } from './fiscal-year-initial-state';
import { ActivateFiscalYear } from './activate-fiscal-year';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { UpdateFiscalYear } from './update-fiscal-year';

const initialState: FiscalYearInitialStateProps = {
  ...fiscalYearInitialState,
  id: 0,
  action: ''
};
export const ListFiscalYears = () => {
  const { data, isLoading, isError, error } = useGetFiscalYearsQuery();
  const [state, setState] = useState<FiscalYearInitialStateProps>(initialState);

  const columns: MRT_ColumnDef<FiscalYear>[] = useMemo(
    () => [
      { accessorKey: 'name', header: 'Fiscal Year Name' },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_FORMAT)}</>
      },
      {
        accessorKey: 'endDate',
        header: 'End Date',
        Cell: ({ cell }) => <>{getFormattedDate(cell.getValue<string>(), DATE_FORMAT)}</>
      },
      {
        accessorKey: 'isActive',
        header: 'Is Active?',
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEditBtnClick = ({ isActive: _isActive, ...rest }: FiscalYear, action: string) => {
    setState({ ...rest, action });
  };
  const onActivateYearClick = (id: number, action: string) => {
    setState((prevState) => ({ ...prevState, id, action }));
  };
  const table = useMaterialReactTable({
    columns,
    data: error ? [] : data?.fiscalYears || [],
    state: {
      isLoading,
      density: 'compact'
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const { id, isActive } = row.original;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            title='Update Fiscal Year'
            size='small'
            color='primary'
            sx={{ mr: 1 }}
            onClick={() => onEditBtnClick(row.original, 'update')}
          >
            <Edit />
          </IconButton>
          {!isActive && (
            <IconButton
              size='small'
              onClick={() => onActivateYearClick(id, 'activate')}
              title='Activate Fiscal Year'
              aria-label='activate'
            >
              <TaskAlt color='success' />
            </IconButton>
          )}
        </Box>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });
  const closeModal = () => {
    setState((prevState) => ({ ...prevState, action: '' }));
  };

  const { action, ...restState } = state;
  return (
    <>
      <MaterialReactTable table={table} />
      {action === 'activate' && <ActivateFiscalYear id={restState.id} closeModal={closeModal} />}
      {action === 'update' && <UpdateFiscalYear data={restState} closeModal={closeModal} />}
    </>
  );
};
