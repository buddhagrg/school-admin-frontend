import { FormControl, FormLabel, Grid2, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { ContactFormProps, StaffFormProps } from '../../types';

const fields: Array<{
  id: keyof ContactFormProps;
  name: string;
  required: boolean;
  mdSize: number;
}> = [
  { name: 'Email', id: 'email', required: true, mdSize: 6 },
  { name: 'Phone', id: 'phone', required: true, mdSize: 6 },
  { name: 'Current Address', id: 'currentAddress', required: true, mdSize: 6 },
  { name: 'Permanent Address', id: 'permanentAddress', required: false, mdSize: 6 }
];

export const StaffContactForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<StaffFormProps>();

  return (
    <>
      <Grid2 container spacing={3} sx={{ mt: 1 }}>
        {fields.map(({ id, name, required, mdSize }) => (
          <Grid2 size={{ xs: 12, md: mdSize }} key={id}>
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
