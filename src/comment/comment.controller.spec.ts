import { Comment } from '@prisma/client';
import { mockComment } from './mock/comment.mock';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    service = new CommentService(null);
    controller = new CommentController(service);
  });

  describe('getComment', () => {
    beforeEach(() => {
      service.getComment = jest.fn().mockReturnValue(mockComment);
    });

    describe('when getComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await controller.getComment(mockComment.id);
      });

      test('then it would call commentService getComment method', () => {
        expect(service.getComment).toBeCalledWith(mockComment.id);
      });

      test('then it would return value', () => {
        expect(comment).toEqual(mockComment);
      });
    });
  });

  describe('deleteComment', () => {
    beforeEach(() => {
      service.deleteComment = jest.fn().mockReturnValue(mockComment);
    });

    describe('when deleteComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await controller.deleteComment(mockComment.id);
      });

      test('then it would call commentService deleteComment method', () => {
        expect(service.deleteComment).toBeCalledWith(mockComment.id);
      });

      test('then it would return value', () => {
        expect(comment).toEqual(mockComment);
      });
    });
  });

  describe('createComment', () => {
    beforeEach(() => {
      service.createComment = jest.fn().mockReturnValue(mockComment);
    });

    describe('when createComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await controller.createComment({
          text: mockComment.text,
          userId: mockComment.userId,
          itemId: mockComment.itemId,
        });
      });

      test('then it would call commentService createComment method', () => {
        expect(service.createComment).toBeCalledWith({
          text: mockComment.text,
          userId: mockComment.userId,
          itemId: mockComment.itemId,
        });
      });

      test('then it would return value', () => {
        expect(comment).toEqual(mockComment);
      });
    });
  });

  describe('updateComment', () => {
    const updatedComment: Comment = {
      ...mockComment,
      text: 'This is updated commentary for item 1.',
    };

    beforeEach(() => {
      service.updateComment = jest.fn().mockReturnValue(updatedComment);
    });

    describe('when updateComment is called', () => {
      let comment: Comment;

      beforeEach(async () => {
        comment = await controller.updateComment(
          mockComment.id,
          updatedComment,
        );
      });

      test('then it would call commentService updateComment method', () => {
        expect(service.updateComment).toBeCalledWith(
          mockComment.id,
          updatedComment,
        );
      });

      test('then it would return value', () => {
        expect(comment).toEqual(updatedComment);
      });
    });
  });
});
