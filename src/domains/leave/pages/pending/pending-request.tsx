import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Column } from '@/utils/type/misc';

const columns: Column[] = [
  { value: 'actions', label: 'Actions' },
  { value: 'name', label: 'Name', minWidth: 110 },
  { value: 'policy', label: 'Policy', minWidth: 110 },
  { value: 'note', label: 'Note', minWidth: 130 },
  { value: 'request', label: 'Request', minWidth: 180 },
  { value: 'submittedDate', label: 'Submitted Date', minWidth: 180 },
  { value: 'updatedDate', label: 'Updated Date', minWidth: 180 }
];

export const PendingRequestTable = ({ content }: { content: React.ReactNode }) => {
  return (
    <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(({ value, label, minWidth }) => (
                  <TableCell key={value} style={{ minWidth: minWidth }}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
