import { expect, test, describe } from '@jest/globals';
import { getIngredients, reducer } from '../src/services/ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'Idle',
  isLoading: false
};

const expectedData = [
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

describe('test ingredientsSlice reducers', () => {
  test('test getIngredients reducer - Success status', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedData)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: reducer
    });

    await store.dispatch(getIngredients());

    const newState = store.getState();

    expect(newState).toEqual({
      data: expectedData,
      status: 'Success',
      isLoading: false
    });
  });

  test('test getIngredients reducer - Failed status', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: reducer
    });

    await store.dispatch(getIngredients());

    const newState = store.getState();

    expect(newState).toEqual({
      data: [],
      status: 'Failed',
      isLoading: false
    });
  });

  test('test getIngredients reducer - Loading status', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(expectedData)
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: reducer
    });

    jest.setTimeout(15000);

    await store.dispatch(getIngredients());

    const newState = store.getState();

    expect(newState).toEqual({
      data: [],
      status: 'Loading',
      isLoading: true
    });
  });
});
