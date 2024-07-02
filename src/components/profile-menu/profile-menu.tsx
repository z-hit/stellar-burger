import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectorUserData } from '../../services/userSlice';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  //const isAuthenticated = useSelector(selectorAuthenticated);
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log('logout button works');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
