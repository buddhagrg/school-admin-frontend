import { ReactNode, useState } from 'react';
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ScheduleSend } from '@mui/icons-material';

import { DialogModal } from '@/components/dialog-modal';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { API_DATE_FORMAT, getFormattedDate } from '@/utils/helpers/date';
import { LeaveRequestForm, LeaveRequestFormSchema, MyLeavePolicy } from '@/app/leave/types';
import { LeaveDetail, LeaveForm } from '@/app/leave/components';
import { useApplyLeaveRequestMutation, useGetMyLeavePoliciesQuery } from '@/app/leave/leave-api';
import { ERROR_MESSAGE } from '@/components/errors';

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export const LeavePolicyDetail = ({ leavePolicies }: { leavePolicies: MyLeavePolicy[] }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [applyLeaveRequest, { isLoading: isApplyingLeave }] = useApplyLeaveRequestMutation();
  const { data } = useGetMyLeavePoliciesQuery();
  const myLeavePolicies = data?.leavePolicies ?? [];

  const methods = useForm<LeaveRequestForm>({
    defaultValues: {
      policyId: 0,
      from: new Date(),
      to: new Date(),
      note: ''
    },
    resolver: zodResolver(LeaveRequestFormSchema)
  });

  const onBtnClick = (id: number) => {
    const { setValue } = methods;
    setValue('policyId', id);
    toggleModal();
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const onLeaveSubmit = async (data: LeaveRequestForm) => {
    try {
      const { policyId, from, to, note } = data;
      const payload = {
        policyId,
        from: getFormattedDate(from, API_DATE_FORMAT),
        to: getFormattedDate(to, API_DATE_FORMAT),
        note
      };
      const result = await applyLeaveRequest(payload).unwrap();
      toast.success(result.message);
      toggleModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  let content: ReactNode | null = null;
  if (!Array.isArray(leavePolicies) || leavePolicies.length <= 0) {
    content = <>{ERROR_MESSAGE.DATA_NOT_FOUND}</>;
  } else {
    content = (
      <div className='slider-container'>
        <Slider {...settings}>
          {leavePolicies.map((leave) => (
            <div key={leave.id}>
              <LeaveDetail {...leave} />
              <CardActions>
                <Button
                  onClick={() => onBtnClick(leave.id)}
                  variant='contained'
                  sx={{ textAlign: 'center', width: '100%', my: 1 }}
                >
                  Request Leave
                </Button>
              </CardActions>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <>
      <Stack direction='row' spacing={1} marginBottom={1}>
        <ScheduleSend className='section-title' sx={{ paddingTop: '2px' }} />
        <Typography variant='h6' className='section-title'>
          Leave
        </Typography>
      </Stack>
      <Card>
        <CardContent>{content}</CardContent>
      </Card>

      <DialogModal
        isSaving={isApplyingLeave}
        titleText='Submit Request'
        isOpen={modalOpen}
        closeModal={toggleModal}
        handleSave={methods.handleSubmit(onLeaveSubmit)}
      >
        <LeaveForm leavePolicies={myLeavePolicies} methods={methods} />
      </DialogModal>
    </>
  );
};
