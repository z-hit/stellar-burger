import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  getIngredients,
  selectorIngredients
} from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { getFeed, selectorFeedData } from '../../services/feedSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const ingredientsData = useAppSelector(selectorIngredients);
  const orders = useAppSelector(selectorFeedData).orders;
  const { number } = useParams();

  useEffect(() => {
    dispatch(getFeed());
    dispatch(getIngredients());
  }, []);

  const ingredients: TIngredient[] = ingredientsData;

  const orderData = orders.find((o) => o.number === Number(number));

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
