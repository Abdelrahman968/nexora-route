import React, { useContext, useCallback } from 'react';
import {
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { addToast } from '@heroui/react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line
export const CommentContext = React.createContext();

function CommentProvider({ children }) {
  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const authHeaders = { Authorization: `Bearer ${userToken}` };

  const invalidateComments = postId =>
    queryClient.invalidateQueries({ queryKey: ['comments', postId] });

  const invalidateReplies = (postId, commentId) =>
    queryClient.invalidateQueries({ queryKey: ['replies', postId, commentId] });

  const useComments = (postId, limit = 10) =>
    useInfiniteQuery({
      queryKey: ['comments', postId],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axios.get(
          `${API_URL}/posts/${postId}/comments`,
          {
            params: { page: pageParam, limit },
            headers: authHeaders,
          }
        );
        return data;
      },
      enabled: !!postId && !!userToken,
      staleTime: 1000 * 60 * 2,
      getNextPageParam: lastPage => {
        const { currentPage, numberOfPages } = lastPage.meta?.pagination ?? {};
        return currentPage < numberOfPages ? currentPage + 1 : undefined;
      },
    });

  const createCommentMutation = useMutation({
    mutationFn: ({ postId, payload }) =>
      axios.post(`${API_URL}/posts/${postId}/comments`, payload, {
        headers: {
          ...authHeaders,
          'Content-Type':
            payload instanceof FormData
              ? 'multipart/form-data'
              : 'application/json',
        },
      }),
    onSuccess: (_data, { postId }) => {
      invalidateComments(postId);
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });

      addToast({
        color: 'success',
        title: 'Comment Created',
        description: 'Comment created successfully',
        icon: <FaCheckCircle />,
        duration: 5000,
      });
    },
    onError: () => {
      addToast({
        color: 'danger',
        title: 'Comment Creation Failed',
        description: 'Failed to create comment',
        icon: <FaExclamationCircle />,
        duration: 5000,
      });
    },
  });

  const createComment = useCallback(
    (postId, payload) => createCommentMutation.mutate({ postId, payload }),
    [createCommentMutation]
  );

  const useReplies = (postId, commentId, limit = 5) =>
    useInfiniteQuery({
      queryKey: ['replies', postId, commentId],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await axios.get(
          `${API_URL}/posts/${postId}/comments/${commentId}/replies`,
          {
            params: { page: pageParam, limit },
            headers: authHeaders,
          }
        );
        return data;
      },
      enabled: !!postId && !!commentId && !!userToken,
      staleTime: 1000 * 60 * 2,
      getNextPageParam: lastPage => {
        const { currentPage, numberOfPages } = lastPage.meta?.pagination ?? {};
        return currentPage < numberOfPages ? currentPage + 1 : undefined;
      },
    });

  const createReplyMutation = useMutation({
    mutationFn: ({ postId, commentId, payload }) =>
      axios.post(
        `${API_URL}/posts/${postId}/comments/${commentId}/replies`,
        payload,
        {
          headers: {
            ...authHeaders,
            'Content-Type':
              payload instanceof FormData
                ? 'multipart/form-data'
                : 'application/json',
          },
        }
      ),
    onSuccess: (_data, { postId, commentId }) => {
      invalidateReplies(postId, commentId);
      invalidateComments(postId);
    },
  });

  const createReply = useCallback(
    (postId, commentId, payload) =>
      createReplyMutation.mutate({ postId, commentId, payload }),
    [createReplyMutation]
  );

  const editCommentMutation = useMutation({
    mutationFn: ({ postId, commentId, payload }) =>
      axios.put(`${API_URL}/posts/${postId}/comments/${commentId}`, payload, {
        headers: authHeaders,
      }),
    onSuccess: (_data, { postId }) => invalidateComments(postId),
  });

  const editComment = useCallback(
    (postId, commentId, payload) =>
      editCommentMutation.mutate({ postId, commentId, payload }),
    [editCommentMutation]
  );

  const deleteCommentMutation = useMutation({
    mutationFn: ({ postId, commentId }) =>
      axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`, {
        headers: authHeaders,
      }),
    onSuccess: (_data, { postId }) => {
      invalidateComments(postId);
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
    },
  });

  const deleteComment = useCallback(
    (postId, commentId) => deleteCommentMutation.mutate({ postId, commentId }),
    [deleteCommentMutation]
  );

  const likeCommentMutation = useMutation({
    mutationFn: ({ postId, commentId }) =>
      axios.put(
        `${API_URL}/posts/${postId}/comments/${commentId}/like`,
        {},
        { headers: authHeaders }
      ),
    onSuccess: (_data, { postId }) => invalidateComments(postId),
  });

  const toggleCommentLike = useCallback(
    (postId, commentId) => likeCommentMutation.mutate({ postId, commentId }),
    [likeCommentMutation]
  );

  return (
    <CommentContext.Provider
      value={{
        useComments,
        useReplies,
        createComment,
        isCreatingComment: createCommentMutation.isPending,
        editComment,
        isEditingComment: editCommentMutation.isPending,
        deleteComment,
        isDeletingComment: deleteCommentMutation.isPending,
        createReply,
        isCreatingReply: createReplyMutation.isPending,
        toggleCommentLike,
        isLikingComment: likeCommentMutation.isPending,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export default CommentProvider;
