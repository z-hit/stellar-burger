import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders, selectorProfileOrders } from '../../services/userSlice';
import { useAppDispatch, useAppSelector } from '../../components/app/hooks';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const profileOrders = useAppSelector(selectorProfileOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = profileOrders;

  return <ProfileOrdersUI orders={orders} />;
};
