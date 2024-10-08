import { FC, FormEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser, selectorIsLoading } from '../../services/user/userSlice';
import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectorIsLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return setError('Пожалуйста, заполните все поля');
    }
    dispatch(registerUser({ name, email, password }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
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
