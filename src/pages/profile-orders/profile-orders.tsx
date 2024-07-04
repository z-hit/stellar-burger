import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, selectorProfileOrders } from '../../services/userSlice';
import { AppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const profileOrders = useSelector(selectorProfileOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = profileOrders;

  return <ProfileOrdersUI orders={orders} />;
};
