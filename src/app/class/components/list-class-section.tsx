import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { TaskAlt, DoNotDisturb, Edit } from '@mui/icons-material';

import { UpdateSection } from './section/update-section';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdateClass } from './class/update-class';
import { ClassSection } from '../types';
import { ClassStatus } from './class/class-status';
import { SectionStatus } from './section/section-status';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { useGetClassesWithSectionsQuery } from '../class-api';
import { ERROR_MESSAGE } from '@/components/errors';

const classState = {
  id: 0,
  name: '',
  action: ''
};
const sectionState = {
  classId: 0,
  id: 0,
  name: '',
  action: ''
};
export const ListClassSection = () => {
  const { data, isLoading, isError, error } = useGetClassesWithSectionsQuery();
  const [classDetail, setClassDetail] = useState(classState);
  const [sectionDetail, setSectionDetail] = useState(sectionState);

  const columns: MRT_ColumnDef<ClassSection>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'CLASS NAME'
      },
      {
        accessorKey: 'isActive',
        header: 'STATUS',
        Cell: ({ cell }) => {
          const status = cell.getValue<boolean>();
          return (
            <Box component='span' sx={getTextColor(status)}>
              {status ? 'Active' : 'Inactive'}
            </Box>
          );
        }
      },
      {
        accessorKey: 'academicLevelName',
        header: 'ACADEMIC LEVEL'
      }
    ],
    []
  );
  const handleClassBtnClick = (id: number, name: string, action: string) => {
    setClassDetail({ id, name, action });
  };
  const handleSectionBtnClick = (classId: number, id: number, name: string, action: string) => {
    setSectionDetail({ classId, id, name, action });
  };
  const closeModal = () => {
    setClassDetail(classState);
    setSectionDetail(sectionState);
  };

  const table = useMaterialReactTable({
    columns,
    data: isError ? [] : data?.classesWithSections || [],
    state: {
      density: 'compact',
      isLoading
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id, name, isActive }
      } = row;
      return (
        <Box sx={{ display: 'flex' }}>
          <IconButton
            title='Update Class'
            aria-label='update'
            color='primary'
            onClick={() => handleClassBtnClick(id, name, 'update')}
          >
            <Edit />
          </IconButton>
          <IconButton
            title={isActive ? 'Deactivate Class' : 'Activate Class'}
            aria-label='Activate/Deactivate'
            onClick={() => handleClassBtnClick(id, name, isActive ? 'deactivate' : 'activate')}
          >
            {isActive ? <DoNotDisturb color='error' /> : <TaskAlt color='success' />}
          </IconButton>
        </Box>
      );
    },
    muiDetailPanelProps: () => ({
      sx: { backgroundColor: 'rgb(240, 240, 240)' }
    }),
    renderDetailPanel: ({ row }) => {
      const {
        original: { sections, id: classId }
      } = row;

      const nestedTable = (
        <TableContainer component={Paper}>
          <Table size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sections.map(({ id, name, isActive }) => (
                <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {id}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <Box component='span' sx={getTextColor(isActive)}>
                      {isActive ? 'Active' : 'Inactive'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <IconButton
                        title='Update Section'
                        aria-label='update'
                        color='primary'
                        onClick={() => handleSectionBtnClick(classId, id, name, 'update')}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        title={isActive ? 'Deactivate Section' : 'Activate Section'}
                        aria-label='activate/deactivate'
                        onClick={() =>
                          handleSectionBtnClick(
                            classId,
                            id,
                            name,
                            isActive ? 'deactivate' : 'activate'
                          )
                        }
                      >
                        {isActive ? <DoNotDisturb color='error' /> : <TaskAlt color='success' />}
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

      return sections.length > 0 ? (
        <>
          <Typography component='div' fontWeight={500} gutterBottom>
            Sections
          </Typography>
          {nestedTable}
        </>
      ) : null;
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <MaterialReactTable table={table} />

      {classDetail.action === 'update' && (
        <UpdateClass id={classDetail.id} name={classDetail.name} closeModal={closeModal} />
      )}

      {['activate', 'deactivate'].includes(classDetail.action) && (
        <ClassStatus
          id={classDetail.id}
          name={classDetail.name}
          closeModal={closeModal}
          action={classDetail.action}
        />
      )}

      {sectionDetail.action === 'update' && (
        <UpdateSection
          classId={sectionDetail.classId}
          id={sectionDetail.id}
          name={sectionDetail.name}
          closeModal={closeModal}
        />
      )}

      {['activate', 'deactivate'].includes(sectionDetail.action) && (
        <SectionStatus
          id={sectionDetail.id}
          classId={sectionDetail.classId}
          name={sectionDetail.name}
          closeModal={closeModal}
          action={sectionDetail.action}
        />
      )}
    </>
  );
};
