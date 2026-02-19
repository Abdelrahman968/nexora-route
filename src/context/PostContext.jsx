import { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line
export const PostContext = createContext();

function PostContextProvider({ children }) {
  const [feedType, setFeedType] = useState('all');
  const { userToken } = useContext(AuthContext);

  const {
    data: homeFeedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['Home Feed', userToken, feedType],
    queryFn: () => {
      return axios.get(`${API_URL}/posts/feed`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params: {
          only: feedType,
        },
      });
    },
    enabled: !!userToken,
  });

  const fetchHomeFeedType = type => {
    setFeedType(type);
  };

  const safeHomeFeedData = homeFeedData?.data || [];

  // console.log('Home Feed Data:', safeHomeFeedData);

  return (
    <PostContext.Provider
      value={{
        homeFeedData,
        fetchHomeFeedType,
        feedType,
        safeHomeFeedData,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
