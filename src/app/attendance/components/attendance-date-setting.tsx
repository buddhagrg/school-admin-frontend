import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup
} from '@mui/material';
import { Controller, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { DATE_FORMAT } from '@/utils/helpers/date';

interface DateFields {
  dateFrom: Date | null | string;
  dateTo: Date | null | string;
  dateType: string;
}
export const AttendanceDateSetting = <T extends DateFields>({
  methods
}: {
  methods: UseFormReturn<T>;
}) => {
  const { clearErrors, setValue, watch, control } = methods;

  const dateFields: Array<{
    name: keyof DateFields & string;
    label: string;
    alterLabel: string;
  }> = [
    { name: 'dateFrom', label: 'Date From', alterLabel: 'Date' },
    { name: 'dateTo', label: 'Date To', alterLabel: '' }
  ];
  const handleDateChange = (type: string) => {
    clearErrors(['dateFrom' as Path<T>, 'dateTo' as Path<T>]);
    if (type === 'S') {
      setValue('dateTo' as Path<T>, null as unknown as PathValue<T, Path<T>>);
    }
  };

  const { dateType } = watch();

  return (
    <>
      <Box>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Attendance Date</FormLabel>
          <Controller
            name={'dateType' as Path<T>}
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                row
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  handleDateChange(e.target.value);
                }}
              >
                <FormControlLabel value='S' label='Specific' control={<Radio size='small' />} />
                <FormControlLabel value='R' label='Range' control={<Radio size='small' />} />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>

      <Grid2 container columnSpacing={3}>
        {dateFields.map(({ name, label, alterLabel }, index) => (
          <Grid2 size={{ xs: 12, md: 3 }} key={name}>
            <FormControl
              fullWidth
              size='small'
              sx={{ mt: 2, display: index === 1 && dateType === 'S' ? 'none' : '' }}
              key={name}
            >
              <Controller
                name={name as Path<T>}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    label={dateType === 'S' ? alterLabel : label}
                    slotProps={{
                      textField: {
                        size: 'small',
                        error: Boolean(error),
                        helperText: error?.message,
                        InputLabelProps: { shrink: true }
                      }
                    }}
                    format={DATE_FORMAT}
                    value={typeof value === 'string' ? parseISO(value) : value}
                    onChange={(value) => onChange(value)}
                  />
                )}
              />
            </FormControl>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
