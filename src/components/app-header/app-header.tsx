import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectorUserData } from '../../services/userSlice';
import { useAppSelector } from '../../hooks/hooks';

export const AppHeader: FC = () => {
  const userData = useAppSelector(selectorUserData);
  const name = userData ? userData.name : '';

  return <AppHeaderUI userName={name} />;
};
