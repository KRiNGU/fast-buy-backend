import { Comment } from '@prisma/client';

export const mockComment: Comment = {
  id: 1,
  userId: 1,
  itemId: 1,
  text: 'This is a commentary for item 1.',
  commentersName: 'Smith U.',
};
