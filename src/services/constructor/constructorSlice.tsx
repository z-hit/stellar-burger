import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
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
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
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
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
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
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;
export const reducer = constructorSlice.reducer;
