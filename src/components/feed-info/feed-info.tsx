import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeed, selectorFeedData } from '../../services/feedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector(selectorFeedData);

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  const orders: TOrder[] = feedData.orders;
  const feed = {
    total: feedData.total,
    totalToday: feedData.totalToday
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
