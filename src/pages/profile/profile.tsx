import { ProfileUI } from '@ui-pages';
import { FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import {
  selectorIsLoading,
  selectorUserData,
  updateUser
} from '../../services/userSlice';
import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const Profile: FC = () => {
  const userData = useAppSelector(selectorUserData);
  const isLoading = useAppSelector(selectorIsLoading);
  const dispatch = useAppDispatch();
  const user = userData ? userData : { name: '', email: '' };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user.name || '',
      email: user.email || ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ ...formValue }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    <Preloader />;
  }
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
