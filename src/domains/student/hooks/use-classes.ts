import { useLazyGetClassesQuery } from "@/domains/class/api";
import { ClassDataPropsWithId } from "@/domains/class/types";
import * as React from "react";

export const useClasses = () => {
    const [classes, setClasses] = React.useState<ClassDataPropsWithId[]>([]);
    const [getClasses] = useLazyGetClassesQuery();

    React.useEffect(() => {
        const fetchClasses = async () => {
            try {
                const result = await getClasses().unwrap();
                if (result.classes) {
                    setClasses(result.classes);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchClasses();
    }, []);

    return classes;
}
