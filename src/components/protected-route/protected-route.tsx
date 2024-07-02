import { useSelector } from 'react-redux';
import { selectorUserData } from '../../services/userSlice';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';
import { selectorIsLoading } from '../../services/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isLoading = useSelector(selectorIsLoading);
  const user = useSelector(selectorUserData);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/profile' };
    return <Navigate replace to={from} />;
  }
  return children;
};
