import { Grid } from "@mui/material";
import { Info } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PageContentHeader } from "@/components/page-content-header";
import { ManageSection } from "../../components";
import { SectionForm, SectionFormSchema } from "../../types";
import { SectionDataTable } from "./section-data-table";

export const ListSectionPage = () => {
    const methods = useForm<SectionForm>({
        defaultValues: { name: "" },
        resolver: zodResolver(SectionFormSchema)
    });

    return (
        <>
            <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading="Section Information" />
            <Grid container columnSpacing={5} rowSpacing={2}>
                <Grid item xs={12} md={4}>
                    <ManageSection
                        operation="Add"
                        methods={methods}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <SectionDataTable />
                </Grid>
            </Grid>
        </>
    );
}