import { PrismaService } from '@/prisma.service';
import { Item } from '@prisma/client';
import { mockItem } from './mock/item.mock';
import { ItemService } from './item.service';

describe('UserService', () => {
  let service: ItemService;
  const prismaService: PrismaService = new PrismaService();

  beforeEach(async () => {
    service = new ItemService(prismaService);
  });

  describe('get item', () => {
    beforeEach(async () => {
      prismaService.item.findUniqueOrThrow = jest
        .fn()
        .mockReturnValue(mockItem);
    });

    describe('when getItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await service.getItem(mockItem.id);
      });

      test('then it would call prismaService findUniqueOrThrow method', () => {
        expect(prismaService.item.findUniqueOrThrow).toBeCalledWith({
          where: { id: mockItem.id },
        });
      });

      test('then it would return value', () => {
        expect(item).toEqual(mockItem);
      });
    });
  });

  describe('create user', () => {
    beforeEach(async () => {
      prismaService.item.create = jest.fn().mockReturnValue(mockItem);
    });

    describe('when createItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await service.createItem({
          name: mockItem.name,
          description: mockItem.description,
        });
      });

      test('then it would call prismaService create method', () => {
        expect(prismaService.item.create).toBeCalledWith({
          data: {
            name: mockItem.name,
            description: mockItem.description,
          },
        });
      });

      test('then it would return value', () => {
        expect(item).toEqual(mockItem);
      });
    });
  });

  describe('update item', () => {
    const updatedItem = { ...mockItem, name: 'Pencil' };

    beforeEach(async () => {
      prismaService.item.update = jest.fn().mockReturnValue(updatedItem);
    });

    describe('when updateItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await service.updateItem(updatedItem.id, {
          name: updatedItem.name,
          description: updatedItem.description,
          numberOfPurchases: updatedItem.numberOfPurchases,
        });
      });

      test('then it would call prismaService update method', () => {
        expect(prismaService.item.update).toBeCalledWith({
          where: { id: updatedItem.id },
          data: {
            name: updatedItem.name,
            description: updatedItem.description,
            numberOfPurchases: updatedItem.numberOfPurchases,
          },
        });
      });

      test('then it would return value', () => {
        expect(item).toEqual(updatedItem);
      });
    });
  });

  describe('delete item', () => {
    beforeEach(async () => {
      prismaService.item.delete = jest.fn().mockReturnValue(mockItem);
    });

    describe('when deleteItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await service.deleteItem(mockItem.id);
      });

      test('then it would call prismaService delete method', () => {
        expect(prismaService.item.delete).toBeCalledWith({
          where: { id: mockItem.id },
        });
      });

      test('then it would return value', () => {
        expect(item).toEqual(mockItem);
      });
    });
  });
});
