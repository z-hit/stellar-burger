import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser } from '../../services/user/userSlice';
import { useAppDispatch } from '../../hooks/hooks';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
