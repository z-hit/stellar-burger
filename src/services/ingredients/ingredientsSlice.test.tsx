import { getIngredients, ingredientsSlice } from './ingredientsSlice';
import { expect, test } from '@jest/globals';
import { mockIngredients } from '../../../mocks/mockData/ingredients';
import { RequestStatus } from '../../utils/request-status';

describe('ingredientsSlice tests:', () => {
  const initialState = {
    data: [],
    isLoading: false,
    status: RequestStatus.Idle
  };

  test('test ingredientsSlice - Loading status', () => {
    const action = getIngredients.pending('', undefined, {});
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: [],
      isLoading: true,
      status: RequestStatus.Loading
    });
  });

  test('test ingredientsSlice - Success status', () => {
    const action = getIngredients.fulfilled(mockIngredients, '', undefined);
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: mockIngredients,
      isLoading: false,
      status: RequestStatus.Success
    });
  });

  test('test ingredientsSlice - Failed status', () => {
    const action = getIngredients.rejected(null, '');
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState).toEqual({
      data: [],
      isLoading: false,
      status: RequestStatus.Failed
    });
  });
});
