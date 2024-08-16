import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import {
  getFeed,
  selectorFeedData,
  selectorIsLoading
} from '../../services/feed/feedSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const Feed: FC = () => {
  const feedData = useAppSelector(selectorFeedData);
  const isLoading = useAppSelector(selectorIsLoading);
  const dispatch = useAppDispatch();

  const orders: TOrder[] = feedData.orders;

  return (
    <>
      {isLoading && <Preloader />}
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
    </>
  );
};
