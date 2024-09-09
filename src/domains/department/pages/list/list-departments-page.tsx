import { Grid } from "@mui/material";
import { Info } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PageContentHeader } from "@/components/page-content-header";
import { DepartmentForm, DepartmentSchema } from "../../types";
import { ManageDepartment } from "../../components";
import { DepartmentDataTable } from "./department-data-table";

export const ListDepartmentsPage = () => {
    const methods = useForm<DepartmentForm>({
        defaultValues: { name: "" },
        resolver: zodResolver(DepartmentSchema)
    });

    return (
        <>
            <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading="Department Information" />
            <Grid container columnSpacing={5} rowSpacing={2}>
                <Grid item xs={12} md={4}>
                    <ManageDepartment
                        operation="Add"
                        methods={methods}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <DepartmentDataTable />
                </Grid>
            </Grid>
        </>
    );
}