import { FC, FormEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  selectorAuthenticated,
  selectorIsLoading,
  selectorUserData
} from '../../services/userSlice';
import { AppDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectorAuthenticated);
  const isLoading = useSelector(selectorIsLoading);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return console.log('no login data');
    }
    dispatch(loginUser({ email, password }));
    console.log('register data sent');
    console.log({ email, password });
  };

  if (isAuthenticated) {
    return <Navigate to={'/profile'} />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
