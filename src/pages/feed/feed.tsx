import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import {
  getFeed,
  selectorFeedData,
  selectorIsLoading
} from '../../services/feedSlice';
import { useAppDispatch, useAppSelector } from '../../components/app/hooks';

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
