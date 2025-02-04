import * as React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ERROR } from '@/constants';

type Props = {
  colSpan: number;
  text?: string;
};

export const TableRowWithColSpan: React.FC<Props> = ({ colSpan, text }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>{text ? text : ERROR.NO_RECORD}</TableCell>
    </TableRow>
  );
};
