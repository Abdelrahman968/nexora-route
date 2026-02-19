import React, { useContext, useCallback } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line
export const QuickActionsContext = React.createContext();

function QuickActionsProvider({ children }) {
  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const authHeaders = { Authorization: `Bearer ${userToken}` };

  const likeMutation = useMutation({
    mutationFn: postId =>
      axios.put(
        `${API_URL}/posts/${postId}/like`,
        {},
        { headers: authHeaders }
      ),
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['postLikes', postId] });
    },
  });

  const toggleLike = useCallback(
    postId => likeMutation.mutate(postId),
    [likeMutation]
  );

  const usePostLikes = (postId, page = 1, limit = 10) =>
    useQuery({
      queryKey: ['postLikes', postId, page, limit],
      queryFn: async () => {
        const { data } = await axios.get(`${API_URL}/posts/${postId}/likes`, {
          params: { page, limit },
          headers: authHeaders,
        });
        return data;
      },
      enabled: !!postId && !!userToken,
      staleTime: 1000 * 60 * 2,
    });

  const bookmarkMutation = useMutation({
    mutationFn: postId =>
      axios.put(
        `${API_URL}/posts/${postId}/bookmark`,
        {},
        { headers: authHeaders }
      ),
    onSuccess: (_data, postId) => {
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });

  const toggleBookmark = useCallback(
    postId => bookmarkMutation.mutate(postId),
    [bookmarkMutation]
  );

  return (
    <QuickActionsContext.Provider
      value={{
        toggleLike,
        isLiking: likeMutation.isPending,
        usePostLikes,
        toggleBookmark,
        isBookmarking: bookmarkMutation.isPending,
      }}
    >
      {children}
    </QuickActionsContext.Provider>
  );
}

export default QuickActionsProvider;
