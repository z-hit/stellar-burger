import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../hooks/hooks';
import { selectorUserData } from '../../services/user/userSlice';

export const AppHeader: FC = () => {
  const userData = useAppSelector(selectorUserData);
  const name = userData ? userData.name : '';

  return <AppHeaderUI userName={name} />;
};
