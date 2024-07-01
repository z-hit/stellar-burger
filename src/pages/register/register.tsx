import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch } from 'src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectorAuthenticated } from '../../services/userSlice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectorAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      return console.log('no register data');
    }
    dispatch(
      registerUser({ name: userName, email: email, password: password })
    );
  };

  if (isAuthenticated) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
