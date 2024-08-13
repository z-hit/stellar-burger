import { expect, test, describe } from '@jest/globals';
import {
  addIngredient,
  moveIngredientUp,
  reducer,
  removeIngredient
} from '../src/services/constructorSlice';

jest.mock('nanoid', () => ({ nanoid: () => '4' }));

describe('test constructorSlice reducers', () => {
  const initialContsructorSliceState = {
    bun: null,
    ingredients: [
      {
        id: '1',
        _id: '111',
        name: 'Слойка',
        type: 'souce',
        proteins: 11,
        fat: 31,
        carbohydrates: 21,
        calories: 31,
        price: 121,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '2',
        _id: '222',
        name: 'Булка',
        type: 'top',
        proteins: 12,
        fat: 32,
        carbohydrates: 22,
        calories: 32,
        price: 122,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '3',
        _id: '333',
        name: 'Икра',
        type: 'greens',
        proteins: 13,
        fat: 33,
        carbohydrates: 23,
        calories: 33,
        price: 123,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ]
  };

  test('test addIngredient reducer', () => {
    const newState = reducer(
      initialContsructorSliceState,
      addIngredient({
        id: '4',
        _id: '444',
        name: 'Булка',
        type: 'top',
        proteins: 14,
        fat: 34,
        carbohydrates: 24,
        calories: 34,
        price: 124,
        image: '',
        image_large: '',
        image_mobile: ''
      })
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([
      {
        id: '1',
        _id: '111',
        name: 'Слойка',
        type: 'souce',
        proteins: 11,
        fat: 31,
        carbohydrates: 21,
        calories: 31,
        price: 121,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '2',
        _id: '222',
        name: 'Булка',
        type: 'top',
        proteins: 12,
        fat: 32,
        carbohydrates: 22,
        calories: 32,
        price: 122,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '3',
        _id: '333',
        name: 'Икра',
        type: 'greens',
        proteins: 13,
        fat: 33,
        carbohydrates: 23,
        calories: 33,
        price: 123,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: expect.any(String),
        _id: '444',
        name: 'Булка',
        type: 'top',
        proteins: 14,
        fat: 34,
        carbohydrates: 24,
        calories: 34,
        price: 124,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ]);
  });

  test('test removeIngredient reducer', () => {
    const newState = reducer(
      initialContsructorSliceState,
      removeIngredient({
        id: '2',
        _id: '222',
        name: 'Булка',
        type: 'top',
        proteins: 12,
        fat: 32,
        carbohydrates: 22,
        calories: 32,
        price: 122,
        image: '',
        image_large: '',
        image_mobile: ''
      })
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([
      {
        id: '1',
        _id: '111',
        name: 'Слойка',
        type: 'souce',
        proteins: 11,
        fat: 31,
        carbohydrates: 21,
        calories: 31,
        price: 121,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '3',
        _id: '333',
        name: 'Икра',
        type: 'greens',
        proteins: 13,
        fat: 33,
        carbohydrates: 23,
        calories: 33,
        price: 123,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ]);
  });

  test('test moveIngredientUp reducer', () => {
    const newState = reducer(initialContsructorSliceState, moveIngredientUp(1));

    const { ingredients } = newState;

    expect(ingredients).toEqual([
      {
        id: '2',
        _id: '222',
        name: 'Булка',
        type: 'top',
        proteins: 12,
        fat: 32,
        carbohydrates: 22,
        calories: 32,
        price: 122,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '1',
        _id: '111',
        name: 'Слойка',
        type: 'souce',
        proteins: 11,
        fat: 31,
        carbohydrates: 21,
        calories: 31,
        price: 121,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        id: '3',
        _id: '333',
        name: 'Икра',
        type: 'greens',
        proteins: 13,
        fat: 33,
        carbohydrates: 23,
        calories: 33,
        price: 123,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ]);
  });
});
