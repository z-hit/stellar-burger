import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
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
import { AppDispatch } from '../../services/store';
import { addOrder, selectorAuthenticated } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const constructorData = useSelector(selectorConstructor);
  const orderRequest = useSelector(selectorisLoading);
  const isAuthenticated = useSelector(selectorAuthenticated);
  const navigate = useNavigate();
  const order = useSelector(selectorGetOrder);

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
