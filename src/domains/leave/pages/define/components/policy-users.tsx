import * as React from 'react';
import {
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
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { TableRowWithColSpan } from '@/components/table-row-with-col-span';
import { Delete } from '@mui/icons-material';
import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import {
  useGetLeavePolicyUsersQuery,
  useRemoveUserFromPolicyMutation
} from '../../../api/leave-api';

export const PolicyUsers = ({ id }: { id: number }) => {
  const { data, isLoading, isError, error } = useGetLeavePolicyUsersQuery(id);
  const [removeUser, { isLoading: isRemovingUser }] = useRemoveUserFromPolicyMutation();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<number>(0);

  const toggleDeleteModal = (selectedUser: number) => {
    setSelectedUser(selectedUser);
    setModalOpen(!modalOpen);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const renderTableBody = () => {
    if (isLoading) return <TableRowWithColSpan colSpan={4} text='loading...' />;
    if (isError) return <TableRowWithColSpan colSpan={4} text={getErrorMsg(error).message} />;
    if (data?.users.length === 0) return <TableRowWithColSpan colSpan={4} />;

    return data?.users?.map(({ id, name, role, totalDaysUsed }) => (
      <TableRow key={id}>
        <TableCell align='center'>{name}</TableCell>
        <TableCell align='center'>{role}</TableCell>
        <TableCell align='center'>{totalDaysUsed}</TableCell>
        <TableCell align='center'>
          <IconButton
            title='Remove user from policy'
            color='primary'
            onClick={() => toggleDeleteModal(id)}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };
  const handleRemoveUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      const result = await removeUser({ policyId: id, userId: selectedUser }).unwrap();
      toast.success(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ '& th': { backgroundColor: '#f3f6f999' } }}>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Role</TableCell>
              <TableCell align='center'>Policy Used (Days)</TableCell>
              <TableCell align='center'>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>

      <DialogModal
        isSaving={isRemovingUser}
        titleText='Remove User'
        actionFooterCancelText='No'
        actionFooterSaveText='Yes'
        isOpen={modalOpen}
        closeModal={closeModal}
        handleSave={handleRemoveUser}
      >
        <Typography variant='body1'>
          Are you sure you want to remove user from this policy?
        </Typography>
      </DialogModal>
    </>
  );
};
