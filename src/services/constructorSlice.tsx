import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

function moveIngredient(
  ingredientsArr: TConstructorIngredient[],
  oldIndex: number,
  newIndex: number
) {
  return ingredientsArr.splice(
    newIndex,
    0,
    ingredientsArr.splice(oldIndex, 1)[0]
  );
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    selectorConstructor: (state) => state
  },
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    removeBun: (state) => {
      state.bun = null;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i._id !== action.payload._id
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const ingredientsArr = state.ingredients;
      const oldIndex = action.payload;
      const newIndex = oldIndex - 1;
      moveIngredient(ingredientsArr, oldIndex, newIndex);
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const ingredientsArr = state.ingredients;
      const oldIndex = action.payload;
      const newIndex = oldIndex + 1;
      moveIngredient(ingredientsArr, oldIndex, newIndex);
    }
  },
  extraReducers: (builder) => {}
});

export const { selectorConstructor } = constructorSlice.selectors;
export const {
  addBun,
  removeBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
