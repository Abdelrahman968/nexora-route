import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line
export const ProfileInfoContext = createContext();

function ProfileInfoContextProvider({ children }) {
  const { userToken } = useContext(AuthContext);

  const fetchProfileInfo = async () => {
    const { data } = await axios.get(`${API_URL}/users/profile-data`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return data;
  };

  const {
    data: profileInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profileInfo', userToken],
    queryFn: fetchProfileInfo,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    cacheTime: 1000 * 60 * 60 * 24 * 30,
  });

  const safeProfileInfo = profileInfo || { data: { user: null } };

  // console.log('profileInfo', safeProfileInfo);

  return (
    <ProfileInfoContext.Provider value={{ safeProfileInfo, isLoading, error }}>
      {children}
    </ProfileInfoContext.Provider>
  );
}

export default ProfileInfoContextProvider;
