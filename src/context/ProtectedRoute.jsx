import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children, requireAuth = false }) => {
  const { userToken } = useContext(AuthContext);
  const location = useLocation();

  if (requireAuth && !userToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (
    userToken &&
    (location.pathname === '/login' || location.pathname === '/register')
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
