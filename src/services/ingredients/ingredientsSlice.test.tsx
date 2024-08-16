import { getIngredients, ingredientsSlice } from './ingredientsSlice';
import { expect, test } from '@jest/globals';
import { RequestStatus } from '../../utils/request-status';

const mockIngredients = [
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
];

describe('ingredientsSlice tests:', () => {
  const initialState = {
    data: [],
    isLoading: false,
    status: RequestStatus.Idle,
    error: undefined
  };

  test('test ingredientsSlice - Loading status', () => {
    const action = getIngredients.pending('', undefined, {});
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: [],
      isLoading: true,
      status: RequestStatus.Loading,
      error: undefined
    });
  });

  test('test ingredientsSlice - Success status', () => {
    const action = getIngredients.fulfilled(mockIngredients, '', undefined);
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: mockIngredients,
      isLoading: false,
      status: RequestStatus.Success,
      error: undefined
    });
  });

  test('test ingredientsSlice - Failed status', () => {
    const action = getIngredients.rejected(null, '');
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: [],
      isLoading: false,
      status: RequestStatus.Failed,
      error: expect.any(String)
    });
  });
});
