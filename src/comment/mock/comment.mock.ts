import { mockItem } from '@/item/mock/item.mock';
import { mockUser } from '@/user/mock/user.mock';
import { shortenedName } from '@/utils/utils';
import { Comment } from '@prisma/client';

export const mockComment: Comment = {
  id: 1,
  userId: mockUser.id,
  itemId: mockItem.id,
  text: 'This is a commentary for item 1.',
  commentersName: shortenedName(
    mockUser.name,
    mockUser.lastName,
    mockUser.patronymic,
  ),
};
