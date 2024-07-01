import { FC, FormEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectorAuthenticated } from '../../services/userSlice';
import { AppDispatch } from '../../services/store';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectorAuthenticated);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

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
