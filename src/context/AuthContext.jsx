import { addToast } from '@heroui/react';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

// eslint-disable-next-line
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userToken, setUserToken] = useState(
    () => localStorage.getItem('token') || null
  );

  const userTokenHandler = token => {
    localStorage.setItem('token', token);
    setUserToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    addToast({
      color: 'success',
      title: 'Logout',
      description: 'You have been logged out.',
      icon: <FaCheckCircle />,
      duration: 5000,
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ userToken, userTokenHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
