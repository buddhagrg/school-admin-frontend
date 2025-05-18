import { FormControl, FormLabel, Grid2, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { ErContactFormProps, StaffFormProps } from '../../types';

const fields: Array<{
  id: keyof ErContactFormProps;
  name: string;
  required: boolean;
  placeholder?: string;
}> = [
  { name: 'Contact Name', id: 'guardianName', required: true },
  { name: 'Contact Phone', id: 'guardianPhone', required: true },
  { name: 'Contact Email', id: 'guardianEmail', required: false },
  {
    name: 'Relationship',
    id: 'guardianRelationship',
    required: false,
    placeholder: 'e.g., Father, Sister'
  }
];
export const StaffEmergencyContactForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<StaffFormProps>();

  return (
    <>
      <Grid2 container spacing={3} sx={{ mt: 1 }}>
        {fields.map(({ id, name, required }) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={id}>
            <FormControl fullWidth required={required}>
              <FormLabel>{name}</FormLabel>
              <TextField
                {...register(`${id}`)}
                error={Boolean(errors?.[id])}
                helperText={errors?.[id]?.message}
                fullWidth
                size='small'
              />
            </FormControl>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
