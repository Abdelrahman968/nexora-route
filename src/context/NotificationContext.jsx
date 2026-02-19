import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line
export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const fetchNotifications = async () => {
    const { data } = await axios.get(`${API_URL}/notifications`, {
      params: {
        limit: 50,
      },
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return data;
  };

  const notificationsQuery = useQuery({
    queryKey: ['notifications', userToken],
    queryFn: fetchNotifications,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  const notifications = notificationsQuery.data?.data?.notifications || [];

  const fetchUnreadCount = async () => {
    const { data } = await axios.get(`${API_URL}/notifications/unread-count`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return data;
  };

  const unreadQuery = useQuery({
    queryKey: ['unreadNotifications', userToken],
    queryFn: fetchUnreadCount,
    enabled: !!userToken,
    staleTime: 1000 * 60 * 5,
  });

  const unreadNotifications = unreadQuery.data?.data?.unreadCount || 0;

  const markAsReadMutation = useMutation({
    mutationFn: notificationId =>
      axios.patch(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unreadNotifications']);
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () =>
      axios.patch(
        `${API_URL}/notifications/read-all`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unreadNotifications']);
    },
  });

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotifications,

        markAsRead: markAsReadMutation.mutate,
        markAllAsRead: markAllAsReadMutation.mutate,

        isUpdating:
          markAsReadMutation.isPending || markAllAsReadMutation.isPending,

        isLoading: notificationsQuery.isLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
