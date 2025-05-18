import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import {
  useDeleteNoticeMutation,
  usePublishNoticeMutation,
  useReviewNoticeStatusMutation
} from '../notice-api';
import type { NoticeStatusCode } from '../types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { DialogModal } from '@/shared/components';

type ReviewNoticeProps = {
  action: string;
  id: number;
  closeModal: () => void;
};
export const ReviewNotice: React.FC<ReviewNoticeProps> = ({ action, id, closeModal }) => {
  const [reviewNoticeStatus, { isLoading: isUpdating }] = useReviewNoticeStatusMutation();
  const [deleteNotice, { isLoading: isDeleting }] = useDeleteNoticeMutation();
  const [publishNotice, { isLoading: isPublishing }] = usePublishNoticeMutation();

  const titles: Record<string, string> = {
    approve: 'Approve Notice',
    reject: 'Reject Notice',
    delete: 'Delete Notice',
    publish: 'Publish Notice'
  };

  const onSave = async () => {
    try {
      const actionToStatus: Record<string, NoticeStatusCode> = {
        approve: 'APPROVED',
        reject: 'REJECTED'
      };

      let result: null | ApiResponseSuccessMessage = null;
      switch (action) {
        case 'delete':
          result = await deleteNotice(id).unwrap();
          break;
        case 'publish':
          result = await publishNotice(id).unwrap();
          break;
        case 'approve':
        case 'reject':
          result = await reviewNoticeStatus({ id, status: actionToStatus[action] }).unwrap();
          break;
        default:
          throw new Error('Unknown action type');
      }

      toast.info(result.message);
      closeModal();
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  const title = titles[action];
  return (
    <DialogModal
      isOpen={true}
      closeModal={closeModal}
      isSaving={isDeleting || isUpdating || isPublishing}
      titleText={title}
      contextText={`Are you sure you want to ${action} this notice?`}
      handleSave={onSave}
      actionFooterSaveText={title}
    />
  );
};
