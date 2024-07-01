import { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch } from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectorAuthenticated } from '../../services/userSlice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectorAuthenticated);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return console.log('no register data');
    }
    dispatch(registerUser({ name, email, password }));
    console.log('register data sent');
  };

  if (isAuthenticated) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <RegisterUI
      errorText=''
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
