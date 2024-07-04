import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { constructorSlice } from '../../services/constructorSlice';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    const handleAdd = () => {
      const newId = nanoid();

      ingredient.type === 'bun'
        ? dispatch(
            constructorSlice.actions.addBun({ ...ingredient, id: newId })
          )
        : dispatch(
            constructorSlice.actions.addIngredient({
              ...ingredient,
              id: newId
            })
          );
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
