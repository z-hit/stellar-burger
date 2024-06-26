import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectorFeedData } from '../../services/feedSlice';

export const Feed: FC = () => {
  console.log('test Feed');
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectorFeedData).orders;
  console.log(orders);
  console.log(useSelector(selectorFeedData));

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
