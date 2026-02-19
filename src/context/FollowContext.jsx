import { createContext, useContext, useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { addToast } from '@heroui/react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line
export const FollowContext = createContext();

function FollowContextProvider({ children }) {
  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const fetchSuggestions = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`${API_URL}/users/suggestions`, {
      params: { limit: 10, page: pageParam },
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return data;
  };

  const suggestionsQuery = useInfiniteQuery({
    queryKey: ['suggestions', userToken],
    queryFn: fetchSuggestions,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: lastPage => {
      const { currentPage, numberOfPages } = lastPage.meta.pagination;
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
  });

  const suggestions =
    suggestionsQuery.data?.pages.flatMap(page => page.data.suggestions) ?? [];

  const isLoadingSuggestions = suggestionsQuery.isLoading;
  const isFetchingMore = suggestionsQuery.isFetchingNextPage;
  const hasNextPage = suggestionsQuery.hasNextPage;

  const loadMore = useCallback(() => {
    if (suggestionsQuery.hasNextPage && !suggestionsQuery.isFetchingNextPage) {
      suggestionsQuery.fetchNextPage();
    }
  }, [suggestionsQuery]);

  const [followedIds, setFollowedIds] = useState(new Set());

  const followMutation = useMutation({
    mutationFn: userId =>
      axios.put(
        `${API_URL}/users/${userId}/follow`,
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      ),
    onMutate: async userId => {
      setFollowedIds(prev => {
        const next = new Set(prev);
        if (next.has(userId)) {
          next.delete(userId);
        } else {
          next.add(userId);
        }
        return next;
      });
    },
    onSuccess: () => {
      addToast({
        color: 'success',
        title: 'Follow',
        description: 'Operation completed successfully',
        icon: <FaCheckCircle />,
        duration: 5000,
      });
    },
    onError: (_err, userId) => {
      addToast({
        color: 'danger',
        title: 'Follow',
        description: 'Operation failed',
        icon: <FaExclamationCircle />,
        duration: 5000,
      });
      setFollowedIds(prev => {
        const next = new Set(prev);
        if (next.has(userId)) {
          next.delete(userId);
        } else {
          next.add(userId);
        }
        return next;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
    },
  });

  const handleFollow = useCallback(
    userId => {
      followMutation.mutate(userId);
    },
    [followMutation]
  );

  const isFollowed = useCallback(
    userId => followedIds.has(userId),
    [followedIds]
  );

  return (
    <FollowContext.Provider
      value={{
        suggestions,
        isLoadingSuggestions,
        isFetchingMore,
        hasNextPage,
        loadMore,
        handleFollow,
        isFollowed,
        followedCount: followedIds.size,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export default FollowContextProvider;
