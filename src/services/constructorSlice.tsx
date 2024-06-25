import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: { price: number };
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: {
    price: 0
  },
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  selectors: {
    selectorConstructor: (state) => state
  },
  reducers: {}
});

export const { selectorConstructor } = constructorSlice.selectors;
export const reducer = constructorSlice.reducer;
