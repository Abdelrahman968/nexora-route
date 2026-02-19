import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { addToast } from '@heroui/react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ProtectedRoute = ({ children, requireAuth = false }) => {
  const { userToken } = useContext(AuthContext);
  const location = useLocation();

  if (requireAuth && !userToken) {
    addToast({
      color: 'danger',
      title: 'Protected Route',
      description: 'You are not logged in',
      icon: <FaExclamationCircle />,
      duration: 5000,
    });
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    userToken &&
    (location.pathname === '/login' || location.pathname === '/register')
  ) {
    addToast({
      color: 'success',
      title: 'Protected Route',
      description: 'You are already logged in',
      icon: <FaCheckCircle />,
      duration: 5000,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
