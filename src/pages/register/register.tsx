import { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch } from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUser,
  selectorAuthenticated,
  selectorIsLoading,
  selectorRegisterError
} from '../../services/userSlice';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  type TRegisterErrorText = undefined | string;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectorAuthenticated);
  const isLoading = useSelector(selectorIsLoading);
  const registerError = useSelector(selectorRegisterError);

  var registerErrorText: TRegisterErrorText = undefined;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (registerError) {
      registerErrorText = registerError;
    }

    if (!name || !email || !password) {
      registerErrorText = 'Пожалуйста, заполните все поля.';
      return registerErrorText;
    }
    dispatch(registerUser({ name, email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to={'/profile'} />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={registerErrorText}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
