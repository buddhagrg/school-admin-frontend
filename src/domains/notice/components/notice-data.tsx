import * as React from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { Column } from "@/utils/type/misc";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { ActionCellType, NoticeDataTable } from "./notice-data-table";
import { Notice } from "../types";

type NoticeDataProps = {
    notices: Notice[];
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    actionCellType: ActionCellType;
};

const columns: Column[] = [
    { value: "action", label: "" },
    { value: "title", label: "Title", minWidth: 120 },
    { value: "author", label: "Author", minWidth: 110 },
    { value: "status", label: "Status", minWidth: 150 },
    { value: "createdDate", label: "Created Date", minWidth: 220 },
    { value: "updatedDate", label: "Updated Date", minWidth: 220 },
    { value: "reviewerName", label: "Reviewer Name", minWidth: 120 },
    { value: "reviewedDate", label: "Reviewed Date", minWidth: 220 },
    { value: "whoHasAccess", label: "Who Has Access?", minWidth: 150 }
];

export const NoticeData: React.FC<NoticeDataProps> = ({
    notices,
    isLoading,
    isError,
    error,
    actionCellType,
}) => {
    let content: null | React.ReactElement = null;
    if (isLoading) {
        content = <TableRowWithColSpan colSpan={8} text="loading..." />
    } else if (isError) {
        content = <TableRowWithColSpan colSpan={8} text={getErrorMsg(error).message} />
    } else if (!Array.isArray(notices) || notices.length <= 0) {
        content = <TableRowWithColSpan colSpan={8} />
    } else {
        content = <>
            {
                notices.map(notice => (
                    <NoticeDataTable
                        key={notice.id}
                        notice={notice}
                        actionCellType={actionCellType}
                    />
                ))
            }
        </>
    }

    return (
        <Box sx={{ p: 2 }} component={Paper}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(({ value, label, minWidth, colSpan }) => (
                                    <TableCell
                                        key={value}
                                        style={{ minWidth: minWidth }}
                                        colSpan={colSpan ?? 1}
                                    >
                                        {label}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}