import { Grid } from "@mui/material";
import { Info } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PageContentHeader } from "@/components/page-content-header";
import { ClassProps, ClassSchema } from "../../types";
import { ManageClass } from "../../components";
import { ClassDataTable } from "./class-data-table";

const initialState = {
    class: "",
    sections: []
};

export const ListClasses = () => {
    const methods = useForm<ClassProps>({
        defaultValues: initialState,
        resolver: zodResolver(ClassSchema)
    });

    return (
        <>
            <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading="Class Information" />
            <Grid container columnSpacing={5} rowSpacing={2}>
                <Grid item xs={12} md={4}>
                    <ManageClass
                        operation="Add"
                        methods={methods}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ClassDataTable />
                </Grid>
            </Grid>
        </>
    );
}