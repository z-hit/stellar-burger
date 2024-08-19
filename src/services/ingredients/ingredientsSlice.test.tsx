import { getIngredients, ingredientsSlice } from './ingredientsSlice';
import { expect, test } from '@jest/globals';
import { RequestStatus } from '../../utils/request-status';
import { mockIngredients } from '../../mocks/mockData/mockIngredients';

describe('ingredientsSlice tests:', () => {
  const initialState = {
    data: [],
    isLoading: false,
    status: RequestStatus.Idle,
    error: undefined
  };

  test('test getIngredients - Loading status', () => {
    const action = getIngredients.pending('', undefined, {});
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
    expect(newState.status).toEqual(RequestStatus.Loading);
  });

  test('test getIngredients - Success status', () => {
    const action = getIngredients.fulfilled(mockIngredients, '', undefined);
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Success);
    expect(newState.data).toEqual(mockIngredients);
  });

  test('test getIngredients - Failed status', () => {
    const action = getIngredients.rejected(null, '');
    const newState = ingredientsSlice.reducer(initialState, action);

    expect(newState.isLoading).toEqual(false);
    expect(newState.status).toEqual(RequestStatus.Failed);
    expect(newState.error).toEqual(expect.any(String));
  });
});
