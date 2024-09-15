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
import { useDeleteNoticeRecipientMutation, useGetNoticeRecipientsQuery } from '../../api';

const columns: NameIdType[] = [
  {
    id: 'Role',
    name: 'ROLE'
  },
  {
    id: 'dependentName',
    name: 'DEPENDENT NAME'
  },
  {
    id: 'dependentSelect',
    name: 'DEPENDENT SELECT'
  },
  {
    id: 'actions',
    name: 'ACTIONS'
  }
];

export const RecipientDataTable = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [recipientId, setRecipientId] = React.useState<number | null>(null);

  const { data, isLoading, isError, error } = useGetNoticeRecipientsQuery();
  const [deleteRecipient, { isLoading: isDeletingRecipient }] = useDeleteNoticeRecipientMutation();

  const handleDelete = (id: number) => () => {
    setRecipientId(id);
    setModalOpen(true);
  };

  let content: React.ReactNode | null = null;
  if (isLoading) {
    content = <TableRowWithColSpan colSpan={3} text='loading...' />;
  } else if (isError) {
    content = <TableRowWithColSpan colSpan={4} text={getErrorMsg(error).message} />;
  } else if (!Array.isArray(data?.noticeRecipients) || data.noticeRecipients.length <= 0) {
    content = <TableRowWithColSpan colSpan={3} />;
  } else {
    content = (
      <>
        {data.noticeRecipients.map((c) => (
          <TableRow hover key={c.id}>
            <TableCell>{c.roleName}</TableCell>
            <TableCell>{c.primaryDependentName}</TableCell>
            <TableCell>{c.primaryDependentSelect}</TableCell>
            <TableCell>
              <Stack direction='row' spacing={1}>
                <IconButton
                  title='Edit Recipient'
                  color='primary'
                  component={Link}
                  to={`/app/notices/recipients/edit/${c.id}`}
                >
                  <Edit />
                </IconButton>
                <IconButton title='Delete Recipient' color='error' onClick={handleDelete(c.id)}>
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
  const onDeleteRecipient = async () => {
    try {
      const result = await deleteRecipient(recipientId!).unwrap();
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
        isSaving={isDeletingRecipient}
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={modalOpen}
        closeModal={handleModalClose}
        handleSave={onDeleteRecipient}
        titleText='Delete Recipient'
      >
        <Typography variant='body1'>Are you sure you want to delete this recipient?</Typography>
      </DialogModal>
    </>
  );
};
