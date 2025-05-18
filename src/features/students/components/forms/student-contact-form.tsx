import { FormControl, FormLabel, Grid2, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { ContactFormProps, StudentFormProps } from '../../types';

const fields: Array<{ id: keyof ContactFormProps; name: string; required: boolean }> = [
  { name: 'Email', id: 'email', required: true },
  { name: 'Phone', id: 'phone', required: true },
  { name: 'Current Address', id: 'currentAddress', required: true },
  { name: 'Permanent Address', id: 'permanentAddress', required: false }
];
export const StudentContactForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<StudentFormProps>();

  return (
    <>
      <Grid2 container spacing={3} sx={{ mt: 1 }}>
        {fields.map(({ id, name, required }) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={id}>
            <FormControl fullWidth required={required}>
              <FormLabel>{name}</FormLabel>
            </FormControl>
            <TextField
              {...register(`${id}`)}
              error={Boolean(errors?.[id])}
              helperText={errors?.[id]?.message}
              fullWidth
              size='small'
            />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
