import { FC, FormEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch } from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectorIsLoading } from '../../services/userSlice';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectorIsLoading);

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
