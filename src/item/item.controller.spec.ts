import { Item } from '@prisma/client';
import { mockItem } from './mock/item.mock';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('UserController', () => {
  let controller: ItemController;
  let service: ItemService;

  beforeEach(async () => {
    service = new ItemService(null);
    controller = new ItemController(service);
  });

  describe('getItem', () => {
    beforeEach(() => {
      service.getItem = jest.fn().mockReturnValue(mockItem);
    });

    describe('when getItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await controller.getItem(mockItem.id);
      });

      test('then it would call itemService getItem method', () => {
        expect(service.getItem).toBeCalledWith(mockItem.id);
      });

      test('then it would return value', () => {
        expect(item).toEqual(mockItem);
      });
    });
  });

  describe('deleteItem', () => {
    beforeEach(() => {
      service.deleteItem = jest.fn().mockReturnValue(mockItem);
    });

    describe('when deleteItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await controller.deleteItem(mockItem.id);
      });

      test('then it would call itemService deleteItem method', () => {
        expect(service.deleteItem).toBeCalledWith(mockItem.id);
      });

      test('then it would return value', () => {
        expect(item).toEqual(mockItem);
      });
    });
  });

  describe('createItem', () => {
    beforeEach(() => {
      service.createItem = jest.fn().mockReturnValue(mockItem);
    });

    describe('when createItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await controller.createItem({
          name: mockItem.name,
          description: mockItem.description,
        });
      });

      test('then it would call itemService createItem method', () => {
        expect(service.createItem).toBeCalledWith({
          name: mockItem.name,
          description: mockItem.description,
        });
      });

      test('then it would return value', () => {
        expect(item).toEqual(mockItem);
      });
    });
  });

  describe('updateItem', () => {
    const updatedItem: Item = { ...mockItem, name: 'Pencil' };

    beforeEach(() => {
      service.updateItem = jest.fn().mockReturnValue(updatedItem);
    });

    describe('when updateItem is called', () => {
      let item: Item;

      beforeEach(async () => {
        item = await controller.updateItem(mockItem.id, updatedItem);
      });

      test('then it would call itemService updateItem method', () => {
        expect(service.updateItem).toBeCalledWith(mockItem.id, updatedItem);
      });

      test('then it would return value', () => {
        expect(item).toEqual(updatedItem);
      });
    });
  });
});
