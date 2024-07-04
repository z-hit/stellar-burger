import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeed,
  selectorFeedData,
  selectorIsLoading
} from '../../services/feedSlice';
import { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const feedData = useSelector(selectorFeedData);
  const isLoading = useSelector(selectorIsLoading);
  const dispatch: AppDispatch = useDispatch();

  const orders: TOrder[] = feedData.orders;

  return (
    <>
      {isLoading && <Preloader />}
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
    </>
  );
};
