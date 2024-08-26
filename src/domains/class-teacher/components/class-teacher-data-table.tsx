import * as React from "react";
import { Box, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { NameIdType } from "@/utils/type/misc";
import { TableRowWithColSpan } from "@/components/table-row-with-col-span";
import { getErrorMsg } from "@/utils/helpers/get-error-message";
import { useGetClassTeachersQuery } from "../api";

const columns: NameIdType[] = [
    {
        id: "class",
        name: "CLASS",
    },
    {
        id: "sections",
        name: "SECTIONS"
    },
    {
        id: "teacher",
        name: "CLASS TEACHER"
    },
    {
        id: "actions",
        name: "ACTIONS"
    }
];

export const ClassTeacherDataTable = () => {
    const { data: classTeachers, isLoading, isError, error } = useGetClassTeachersQuery();

    let content: React.ReactNode | null = null;
    if (isLoading) {
        content = <TableRowWithColSpan colSpan={4} text="loading..." />
    } else if (isError) {
        content = <TableRowWithColSpan colSpan={4} text={getErrorMsg(error).message} />
    } else if (!Array.isArray(classTeachers?.classTeachers) || classTeachers.classTeachers.length <= 0) {
        content = <TableRowWithColSpan colSpan={4} />
    } else {
        content = <>
            {
                classTeachers.classTeachers.map(ct => (
                    <TableRow hover key={ct.id}>
                        <TableCell>{ct.class}</TableCell>
                        <TableCell>{ct.section}</TableCell>
                        <TableCell>{ct.teacher}</TableCell>
                        <TableCell>
                            <Stack direction="row" spacing={1}>
                                <IconButton title="Edit Detail" color="primary" component={Link} to={`/app/class-teachers/edit/${ct.id}`}>
                                    <Edit />
                                </IconButton>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    }

    return (
        <Box component={Paper} >
            <TableContainer sx={{ height: "80vh", overflow: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map(({ id, name }) => (
                                    <TableCell key={id}>{name}</TableCell>
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