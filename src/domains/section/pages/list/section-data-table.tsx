import * as React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { NameIdType } from '@/utils/type/misc';
import { TableRowWithColSpan } from '@/components/table-row-with-col-span';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useDeleteSectionMutation, useGetSectionsQuery } from '../../api';

const columns: NameIdType[] = [
  {
    id: 'name',
    name: 'NAME'
  },
  {
    id: 'actions',
    name: 'ACTIONS'
  }
];

export const SectionDataTable = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sectionId, setSectionId] = React.useState<number | null>(null);

  const { data, isLoading, isError, error } = useGetSectionsQuery();
  const [deleteSection, { isLoading: isDeletingSection }] = useDeleteSectionMutation();

  const handleDelete = (id: number) => () => {
    setSectionId(id);
    setModalOpen(true);
  };

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <TableRowWithColSpan colSpan={3} text='loading...' />;
  } else if (isError) {
    content = <TableRowWithColSpan colSpan={4} text={getErrorMsg(error).message} />;
  } else if (!Array.isArray(data?.sections) || data.sections.length <= 0) {
    content = <TableRowWithColSpan colSpan={3} />;
  } else {
    content = (
      <>
        {data.sections.map((c) => (
          <TableRow hover key={c.id}>
            <TableCell>{c.name}</TableCell>
            <TableCell>
              <Stack direction='row' spacing={1}>
                <IconButton
                  title='Edit Section'
                  color='primary'
                  component={Link}
                  to={`/app/sections/edit/${c.id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton title='Delete Section' color='error' onClick={handleDelete(c.id)}>
                  <Delete />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const onDeleteSection = async () => {
    try {
      const result = await deleteSection(sectionId!).unwrap();
      toast.info(result.message);
      handleModalClose();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <Box component={Paper}>
        <TableContainer sx={{ height: '80vh', overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(({ id, name }) => (
                  <TableCell key={id}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <DialogModal
        isSaving={isDeletingSection}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={modalOpen}
        closeModal={handleModalClose}
        handleSave={onDeleteSection}
        titleText='Delete Section'
      >
        <Typography variant='body1'>Are you sure you want to delete this section?</Typography>
      </DialogModal>
    </>
  );
};
