import React, { useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, Grid2, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@mui/x-date-pickers';

import { PageContentHeader } from '@/components/page-content-header';
import { UserSearch } from './components/user-search';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import {
  useApplyLeaveForOtherMutation,
  useLazyGetUserDetailWithLeavePoliciesQuery
} from '../../leave-api';
import { LeaveForm } from '../../components';
import { LeaveRequestForm, LeaveRequestFormSchema } from '../../types';
import { UserDetail } from './components/user-detail';

const initialState = {
  policyId: '',
  from: new Date(),
  to: new Date(),
  note: ''
};
export const ApplyLeaveForOthers = () => {
  const [userId, setUserId] = useState<number>(0);
  const [searchUser, { data: userWithLeavePolicies, isLoading: isFetchingUser, isError, error }] =
    useLazyGetUserDetailWithLeavePoliciesQuery();
  const [applyLeave, { isLoading: isApplying }] = useApplyLeaveForOtherMutation();
  const methods = useForm<LeaveRequestForm>({
    defaultValues: initialState,
    resolver: zodResolver(LeaveRequestFormSchema)
  });

  const onSearchUser = async () => {
    try {
      await searchUser(userId);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(event.target.value));
  };
  const onApplyLeave = async (data: LeaveRequestForm) => {
    try {
      if (!userWithLeavePolicies?.user.id) {
        return;
      }

      const payload = { ...data, userId: userWithLeavePolicies.user.id };
      const result = await applyLeave(payload).unwrap();
      toast.info(result.message);
      methods.reset(initialState);
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };
  const leaveRequestForm = () => {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6' component='div' gutterBottom>
            Leave Request Form
          </Typography>
          <FormControl>
            <LeaveForm
              methods={methods}
              leavePolicies={userWithLeavePolicies?.leavePolicies || []}
            />
            <Button
              size='small'
              type='button'
              variant='contained'
              sx={{ mt: 2 }}
              loading={isApplying}
              onClick={methods.handleSubmit(onApplyLeave)}
            >
              Apply Leave
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <PageContentHeader
        title='Apply Leave for others'
        subtitle='Search user and apply leave'
        icon={CalendarIcon}
      />
      <UserSearch
        userId={userId}
        isLoading={isFetchingUser}
        onSave={onSearchUser}
        handleChange={handleChange}
      />
      <Box sx={{ mt: 3 }} />
      <>
        {!isError ? (
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <UserDetail
                user={userWithLeavePolicies?.user || null}
                leaveHistory={userWithLeavePolicies?.leaveHistory || []}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>{leaveRequestForm()}</Grid2>
          </Grid2>
        ) : isError ? (
          getErrorMsg(error).message
        ) : (
          <>User Id not provided</>
        )}
      </>
    </>
  );
};
