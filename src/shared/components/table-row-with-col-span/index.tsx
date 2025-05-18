import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ERROR_MESSAGE } from '@/shared/constants/error-message';

type Props = {
  colSpan: number;
  text?: string;
};

export const TableRowWithColSpan: React.FC<Props> = ({ colSpan, text }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>{text ? text : ERROR_MESSAGE.DATA_NOT_FOUND}</TableCell>
    </TableRow>
  );
};
