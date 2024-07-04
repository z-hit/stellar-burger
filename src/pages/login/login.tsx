import { FC, FormEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectorIsLoading } from '../../services/userSlice';
import { AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectorIsLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return setError('Пожалуйста, заполните все поля');
    }

    dispatch(loginUser({ email, password }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
