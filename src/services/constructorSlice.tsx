import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  selectors: {
    selectorConstructor: (state) => state
  },
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorState>) => {
      state.bun = action.payload.bun;
    }
  }
});

export const { selectorConstructor } = constructorSlice.selectors;
export const reducer = constructorSlice.reducer;
