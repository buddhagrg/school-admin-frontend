import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { ClassTeacherDetail } from '../types';
import { useGetClassTeachersQuery } from '../api';
import { useMemo, useState } from 'react';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { UpdateClassTeacher } from './class/update-class-teacher';
import { DeleteClassTeacher } from './class/delete-class-teacher';

const classState = {
  id: 0,
  classId: 0,
  className: '',
  action: '',
  teacherName: ''
};
export const ListClassTeachers = () => {
  const { data, isLoading, isError, error } = useGetClassTeachersQuery();
  const [classDetail, setClassDetail] = useState(classState);

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
  const handleBtnClick = (rowData: ClassTeacherDetail, action: string) => {
    setClassDetail({ action, ...rowData });
  };
  const closeModal = () => {
    setClassDetail(classState);
  };

  const table = useMaterialReactTable({
    columns,
    data: isError ? [] : data?.classTeachers || [],
    state: {
      isLoading,
      density: 'compact'
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      return (
        <Box sx={{ display: 'flex' }}>
          <IconButton
            color='primary'
            title='Update Class Teacher'
            aria-label='update class teacher'
            onClick={() => handleBtnClick(row.original, 'update')}
          >
            <Edit />
          </IconButton>
          <IconButton
            color='error'
            title='Delete Class Teacher'
            aria-label='Delete class teacher'
            onClick={() => handleBtnClick(row.original, 'delete')}
          >
            <Delete />
          </IconButton>
        </Box>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {classDetail.action === 'update' && (
        <UpdateClassTeacher
          classId={classDetail.classId}
          className={classDetail.className}
          closeModal={closeModal}
        />
      )}
      {classDetail.action === 'delete' && (
        <DeleteClassTeacher
          id={classDetail.id}
          className={classDetail.className}
          teacherName={classDetail.teacherName}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
