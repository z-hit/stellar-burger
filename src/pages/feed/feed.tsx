import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectorFeedData } from '../../services/feedSlice';

export const Feed: FC = () => {
  const feedData = useSelector(selectorFeedData);
  console.log('test Feed');
  console.log(feedData);

  /** TODO: взять переменную из стора */

  const orders: TOrder[] = feedData.orders;
  console.log(orders);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
