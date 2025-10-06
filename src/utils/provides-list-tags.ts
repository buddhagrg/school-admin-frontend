import { Tag } from '@/api';

export const providesListTags = <T extends { id: number | string }>(
  items: T[] | null | undefined,
  type: Tag
) => {
  return [...(items?.map(({ id }) => ({ type, id })) || []), { type, id: Tag.LIST }];
};
