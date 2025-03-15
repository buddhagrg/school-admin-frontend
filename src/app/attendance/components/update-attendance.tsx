import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

import { DialogModal } from '@/components/dialog-modal';
import {
  useUpdateStaffAttendanceRecordMutation,
  useUpdateStudentAttendanceRecordMutation
} from '../attendance-api';
import { AttendanceFormPropsWithId } from '../types';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { attendanceStatus } from '@/constants';

type UpdateAttendanceProps = {
  type: 'staff' | 'students';
  title: string;
  methods: UseFormReturn<AttendanceFormPropsWithId>;
  closeModal: () => void;
};
export const UpdateAttendance: React.FC<UpdateAttendanceProps> = ({
  title,
  type,
  methods,
  closeModal
}) => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit
  } = methods;
  const [updateStaffAttendanceRecord, { isLoading: isUpdatingStaffAttendance }] =
    useUpdateStaffAttendanceRecordMutation();
  const [updateStudentAttendanceRecord, { isLoading: isUpdatingStudentAttendance }] =
    useUpdateStudentAttendanceRecordMutation();
  const onSave = async (data: AttendanceFormPropsWithId) => {
    try {
      const payload = { ...data };
      const result =
        type === 'staff'
          ? await updateStaffAttendanceRecord(payload).unwrap()
          : await updateStudentAttendanceRecord({ ...data }).unwrap();
      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const { name, userId } = methods.getValues();
  const userType = type === 'staff' ? 'Staff' : 'Student';
  return (
    <DialogModal
      isOpen={true}
      titleText={title}
      closeModal={closeModal}
      isSaving={isUpdatingStaffAttendance || isUpdatingStudentAttendance}
      handleSave={handleSubmit(onSave)}
      actionFooterSaveText='Update Status'
    >
      <Typography>{userType}</Typography>
      <Typography>Name: {name}</Typography>
      <Typography>ID: {userId}</Typography>
      <FormControl fullWidth size='small' sx={{ my: 3 }}>
        <FormLabel>Status</FormLabel>
        <RadioGroup>
          <Controller
            name='status'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                {attendanceStatus.map(({ id, name }) => (
                  <FormControlLabel
                    key={id}
                    label={name}
                    value={id}
                    checked={value === id}
                    control={<Radio onChange={() => onChange(id)} />}
                  />
                ))}
              </>
            )}
          />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth size='small'>
        <TextField
          size='small'
          label='Remarks'
          multiline
          minRows={3}
          fullWidth
          {...register('remarks')}
          error={!!errors?.remarks}
          helperText={errors?.remarks?.message}
        />
      </FormControl>
    </DialogModal>
  );
};
