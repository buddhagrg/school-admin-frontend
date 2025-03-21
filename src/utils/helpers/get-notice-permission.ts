import { NoticeStatusType } from '@/app/notice/types';

export const isEditPermissionAvailable = (
  authorId: number,
  statusId: NoticeStatusType,
  userId: number | undefined
) => {
  if (authorId === userId) {
    return statusId == 'DELETED';
  }
  return authorId !== userId;
};

export const isApprovePermissionAvailable = (status: NoticeStatusType) => {
  switch (status) {
    case 'REVIEW_REQUESTED':
      return false;
    default:
      return true;
  }
};

export const isRejectPermissionAvailable = (status: NoticeStatusType) => {
  switch (status) {
    case 'REVIEW_REQUESTED':
    case 'REJECTED':
    case 'APPROVED':
      return false;
    default:
      return true;
  }
};

export const isDeletePermissionAvailable = (
  authorId: number,
  status: NoticeStatusType,
  userId: number | undefined
) => {
  if (authorId === userId) {
    switch (status) {
      case 'DRAFTED':
      case 'DELETED':
        return true;
      default:
        return false;
    }
  }
  return authorId !== userId;
};
