import { PrismaService } from '@/prisma.service';
import { Comment } from '@prisma/client';
import { mockComment } from './mock/comment.mock';
import { CommentService } from './comment.service';
import { mockUser } from '@/user/mock/user.mock';
import { shortenedName } from '@/utils/utils';

describe('CommentService', () => {
  let service: CommentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    service = new CommentService(prismaService);
  });

  describe('get comment', () => {
    beforeEach(async () => {
      prismaService.comment.findUniqueOrThrow = jest
        .fn()
        .mockReturnValue(mockComment);
    });

    describe('when getComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await service.getComment(mockComment.id);
      });

      test('then it would call prismaService findUniqueOrThrow method', () => {
        expect(prismaService.comment.findUniqueOrThrow).toBeCalledWith({
          where: { id: mockComment.id },
        });
      });

      test('then it would return value', () => {
        expect(comment).toEqual(mockComment);
      });
    });
  });

  describe('create comment', () => {
    beforeEach(async () => {
      prismaService.comment.create = jest.fn().mockReturnValue(mockComment);
      prismaService.user.findUniqueOrThrow = jest
        .fn()
        .mockResolvedValue(mockUser);
    });

    describe('when createComment is called', () => {
      let comment: Comment;
      const commentersName = shortenedName(
        mockUser.name,
        mockUser.lastName,
        mockUser.patronymic,
      );

      beforeEach(async () => {
        comment = await service.createComment({
          text: mockComment.text,
          userId: mockComment.userId,
          itemId: mockComment.itemId,
        });
      });

      test('then it would call prismaService create method', () => {
        expect(prismaService.comment.create).toBeCalledWith({
          data: {
            text: mockComment.text,
            userId: mockComment.userId,
            itemId: mockComment.itemId,
            commentersName,
          },
        });
      });

      test('then it would return value', () => {
        expect(comment).toEqual({
          ...mockComment,
          commentersName,
        });
      });
    });
  });

  describe('update comment', () => {
    const updatedComment = {
      ...mockComment,
      text: 'This is updated commentary for item 1.',
    };

    beforeEach(async () => {
      prismaService.comment.update = jest.fn().mockReturnValue(updatedComment);
    });

    describe('when updateComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await service.updateComment(updatedComment.id, {
          text: updatedComment.text,
        });
      });

      test('then it would call prismaService update method', () => {
        expect(prismaService.comment.update).toBeCalledWith({
          where: { id: updatedComment.id },
          data: {
            text: updatedComment.text,
          },
        });
      });

      test('then it would return value', () => {
        expect(comment).toEqual(updatedComment);
      });
    });
  });

  describe('delete comment', () => {
    beforeEach(async () => {
      prismaService.comment.delete = jest.fn().mockReturnValue(mockComment);
    });

    describe('when deleteComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await service.deleteComment(mockComment.id);
      });

      test('then it would call prismaService delete method', () => {
        expect(prismaService.comment.delete).toBeCalledWith({
          where: { id: mockComment.id },
        });
      });

      test('then it would return value', () => {
        expect(comment).toEqual(mockComment);
      });
    });
  });
});
