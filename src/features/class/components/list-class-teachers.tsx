import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  useMaterialReactTable
} from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import { EditNote } from '@mui/icons-material';

import type { ClassTeacherDetail } from '../types';
import { useGetClassTeachersQuery } from '../class-api';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdateClassTeacher } from './class/update-class-teacher';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

const classState: ClassTeacherDetail = {
  id: 0,
  classId: '',
  className: '',
  teacherName: '',
  teacherId: ''
};
export const ListClassTeachers = () => {
  const { data, isLoading, isError, error } = useGetClassTeachersQuery();
  const [state, setState] = useState(classState);

  const columns: MRT_ColumnDef<ClassTeacherDetail>[] = useMemo(
    () => [
      {
        accessorKey: 'className',
        header: 'Class'
      },
      {
        accessorKey: 'teacherName',
        header: 'Teacher'
      }
    ],
    []
  );
  const handleUpdate = (rowData: ClassTeacherDetail) => {
    setState(rowData);
  };
  const closeModal = () => {
    setState(classState);
  };

  const table = useMaterialReactTable({
    columns,
    data: isError ? [] : data?.classTeachers || [],
    state: {
      isLoading,
      density: 'compact',
      showGlobalFilter: true
    },
    enablePagination: false,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableColumnActions: false,
    renderRowActions: ({ row }) => (
      <IconButton
        color='primary'
        title='Update Class Teacher'
        aria-label='update class teacher'
        onClick={() => handleUpdate(row.original)}
      >
        <EditNote />
      </IconButton>
    ),
    renderTopToolbar: ({ table }) => (
      <Box sx={{ p: 1 }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
    ),
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {state.id > 0 && (
        <UpdateClassTeacher
          classId={state.classId}
          teacherId={state.teacherId}
          id={state.id}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
