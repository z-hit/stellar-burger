import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  Button,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const navigateTo = (path: string) => navigate(path);

  const location = useLocation();
  const isActive = (path: string) => path === location.pathname;
  const linkClasses = clsx('link', { link_active: isActive });

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              clsx(styles.link, {
                [styles.link_active]: isActive
              })
            }
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              clsx(styles.link, {
                [styles.link_active]: isActive
              })
            }
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <NavLink to={'/'} className={styles.logo}>
          <Logo className='' />
        </NavLink>
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            clsx(styles.link_position_last, {
              [styles.link_active]: isActive
            })
          }
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2' data-cy='user-name'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
