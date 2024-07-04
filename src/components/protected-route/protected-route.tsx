import { useSelector } from 'react-redux';
import {
  selectorIsAuthChecked,
  selectorUserData
} from '../../services/userSlice';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectorIsAuthChecked);
  const user = useSelector(selectorUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate replace to={from} />;
  }

  return children;
};
