import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectorUserData } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(selectorUserData);
  const name = userData ? userData.name : '';

  return <AppHeaderUI userName={name} />;
};
