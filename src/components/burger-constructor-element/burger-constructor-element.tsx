import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { constructorSlice } from '../../services/constructorSlice';
import { useAppDispatch } from '../app/hooks';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {
      dispatch(constructorSlice.actions.moveIngredientDown(index));
    };

    const handleMoveUp = () => {
      dispatch(constructorSlice.actions.moveIngredientUp(index));
    };

    const handleClose = () => {
      dispatch(constructorSlice.actions.removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
