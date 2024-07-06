import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  selectorConstructor
} from '../../services/constructorSlice';
import {
  clearOrder,
  orderBurger,
  selectorGetOrder,
  selectorisLoading
} from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';
import { addOrder, selectorAuthenticated } from '../../services/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const constructorData = useAppSelector(selectorConstructor);
  const orderRequest = useAppSelector(selectorisLoading);
  const isAuthenticated = useAppSelector(selectorAuthenticated);
  const navigate = useNavigate();
  const order = useAppSelector(selectorGetOrder);

  const constructorItems = {
    bun: constructorData.bun,
    ingredients: constructorData.ingredients
  };

  const orderModalData = order ? order : null;

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }

    if (
      constructorItems.bun &&
      constructorItems.ingredients &&
      isAuthenticated
    ) {
      const orderIngredientsIDs: string[] = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id)
      ];
      dispatch(orderBurger(orderIngredientsIDs));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
    order && dispatch(addOrder(order));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
