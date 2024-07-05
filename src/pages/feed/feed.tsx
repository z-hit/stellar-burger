import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  getFeed,
  selectorFeedData,
  selectorIsLoading
} from '../../services/feedSlice';
import { useAppDispatch } from '../../components/app/hooks';

export const Feed: FC = () => {
  const feedData = useSelector(selectorFeedData);
  const isLoading = useSelector(selectorIsLoading);
  const dispatch = useAppDispatch();

  const orders: TOrder[] = feedData.orders;

  return (
    <>
      {isLoading && <Preloader />}
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
    </>
  );
};
