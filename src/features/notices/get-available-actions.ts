import type { User } from '../auth/types';
import type { Notice } from './types';

export const getAvailableActions = (user: User, notice: Notice) => {
  const isAuthor = user.id === notice.authorId;
  const apiSet = new Set(user.apis.map((user) => user.path));
  const canReview = apiSet.has('api/v1/notices/:id/review');
  const isAdmin = user.roleId === 'ADMIN';

  const actions: string[] = ['view'];
  if (isAuthor) {
    actions.push('edit', 'delete');
    if (notice.statusId === 'APPROVED') {
      actions.push('publish');
    }
  } else if ((canReview || isAdmin) && notice.statusId === 'PENDING') {
    actions.push('approve', 'reject');
  }

  return actions;
};
