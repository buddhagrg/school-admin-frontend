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
import { EditNote } from '@mui/icons-material';

import { UpdateSection } from './section/update-section';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UpdateClass } from './class/update-class';
import type { ClassSection } from '../types';
import { getTextColor } from '@/utils/helpers/get-text-color';
import { useGetClassesWithSectionsQuery } from '../class-api';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

type ClassStateProps = {
  id: number;
  academicLevelId: number;
  name: string;
  status: boolean;
};
const classState: ClassStateProps = {
  id: 0,
  academicLevelId: 0,
  name: '',
  status: true
};
type SectionStateProps = {
  classId: number;
  id: number;
  name: string;
  status: boolean;
};
const sectionState: SectionStateProps = {
  classId: 0,
  id: 0,
  name: '',
  status: true
};
export const ListClassSection = ({ level }: { level: string }) => {
  const { data, isLoading, isError, error } = useGetClassesWithSectionsQuery(level);
  const [classDetail, setClassDetail] = useState<ClassStateProps>(classState);
  const [sectionDetail, setSectionDetail] = useState<SectionStateProps>(sectionState);

  const columns: MRT_ColumnDef<ClassSection>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Class Name'
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
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
        header: 'Academic Level'
      }
    ],
    []
  );
  const handleClassUpdate = (data: ClassStateProps) => {
    setClassDetail(data);
  };
  const handleSectionUpdate = (data: SectionStateProps) => {
    setSectionDetail(data);
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
    enableTopToolbar: false,
    enablePagination: false,
    enableRowActions: true,
    enableColumnActions: false,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id, name, academicLevelId, isActive: status }
      } = row;
      return (
        <IconButton
          title='Update Class'
          aria-label='update'
          color='primary'
          onClick={() => handleClassUpdate({ id, name, academicLevelId, status })}
        >
          <EditNote />
        </IconButton>
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
              {sections.map(({ id, name, isActive: status }) => (
                <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {id}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <Box component='span' sx={getTextColor(status)}>
                      {status ? 'Active' : 'Inactive'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      title='Update Section'
                      aria-label='update'
                      color='primary'
                      onClick={() => handleSectionUpdate({ classId, id, name, status })}
                    >
                      <EditNote />
                    </IconButton>
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

      {classDetail.id > 0 && (
        <UpdateClass
          id={classDetail.id}
          academicLevelId={classDetail.academicLevelId}
          name={classDetail.name}
          status={classDetail.status}
          closeModal={closeModal}
        />
      )}

      {sectionDetail.id > 0 && (
        <UpdateSection
          classId={sectionDetail.classId}
          id={sectionDetail.id}
          name={sectionDetail.name}
          status={sectionDetail.status}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
