import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBell,
  FaHeart,
  FaComment,
  FaUserPlus,
  FaUsers,
  FaCheckCircle,
  FaTrash,
  FaClock,
  FaFilter,
  FaArrowLeft,
  FaShare,
} from 'react-icons/fa';
import { Card, CardBody, Button, Chip, Pagination } from '@heroui/react';
import SEO from '../SEO/SEO';
import { NotificationContext } from '../../context/NotificationContext';

import logoImage from '../../assets/logo.png';

function Notifications() {
  const [activeFilter, setActiveFilter] = useState('all');

  const { notifications, markAsRead, markAllAsRead, unreadNotifications } =
    useContext(NotificationContext);

  const notificationsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fix: filter FIRST, then paginate the filtered result
  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(n => n.isRead === false);
      case 'likes':
        return notifications.filter(n => n.type === 'like_post');
      case 'comments':
        return notifications.filter(n => n.type === 'comment_post');
      case 'follows':
        return notifications.filter(n => n.type === 'follow_user');
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / notificationsPerPage)
  );

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  // ✅ Fix: slice filteredNotifications, not notifications
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    endIndex
  );

  const unreadCount = unreadNotifications > 99 ? '99+' : unreadNotifications;

  const filterOptions = [
    { key: 'all', label: 'All', count: notifications.length },
    {
      key: 'unread',
      label: 'Unread',
      count: unreadNotifications > 99 ? '99+' : unreadNotifications,
    },
    {
      key: 'likes',
      label: 'Likes',
      count: notifications.filter(n => n.type === 'like_post').length,
    },
    {
      key: 'comments',
      label: 'Comments',
      count: notifications.filter(n => n.type === 'comment_post').length,
    },
    {
      key: 'follows',
      label: 'Follows',
      count: notifications.filter(n => n.type === 'follow_user').length,
    },
  ];

  // ✅ Fix: reset to page 1 when filter changes
  const handleFilterChange = key => {
    setActiveFilter(key);
    setCurrentPage(1);
  };

  const getProfileUrl = userId => {
    return `/profile/${userId}`;
  };

  return (
    <>
      <SEO
        title="Notifications"
        description="View and manage your notifications"
        path="/notifications"
      />

      <div className="w-full min-h-screen">
        <div className="max-w-5xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <FaBell className="text-3xl" />
                  </div>
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {unreadCount}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold">
                    <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Notifications
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {unreadCount > 0
                      ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                      : 'You are all caught up!'}
                  </p>
                </div>
              </div>

              {unreadCount && (
                <Button
                  size="lg"
                  className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 transition-all"
                  startContent={<FaCheckCircle />}
                  onPress={markAllAsRead}
                >
                  Mark All as Read
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: 'Total',
                count: notifications.length,
                gradient: 'from-blue-500 to-cyan-500',
                icon: <FaBell />,
              },
              {
                label: 'Unread',
                count: unreadCount,
                gradient: 'from-red-500 to-pink-500',
                icon: <FaClock />,
              },
              {
                label: 'Likes',
                count: notifications.filter(n => n.type === 'like_post').length,
                gradient: 'from-pink-500 to-rose-500',
                icon: <FaHeart />,
              },
              {
                label: 'Follows',
                count: notifications.filter(n => n.type === 'follow_user')
                  .length,
                gradient: 'from-green-500 to-emerald-500',
                icon: <FaUserPlus />,
              },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all cursor-pointer"
              >
                <CardBody className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-r ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
                    >
                      <div className="text-xl">{stat.icon}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.count}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Filter Tabs */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-lg mb-6">
            <CardBody className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <FaFilter className="text-pink-600 dark:text-pink-400 text-xl" />
                <h2 className="text-xl font-bold">Filter Notifications</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(option => (
                  <button
                    key={option.key}
                    onClick={() => handleFilterChange(option.key)}
                    className="group"
                  >
                    <Chip
                      size="lg"
                      variant={
                        activeFilter === option.key ? 'solid' : 'bordered'
                      }
                      className={`${
                        activeFilter === option.key
                          ? 'bg-linear-to-r from-pink-600 to-indigo-600 text-white border-transparent'
                          : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-600 dark:hover:border-pink-400'
                      } font-semibold cursor-pointer transition-all group-hover:scale-105`}
                    >
                      {option.label} ({option.count})
                    </Chip>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {currentNotifications.length === 0 ? (
              <Card className="bg-white dark:bg-[#1E2939] shadow-lg">
                <CardBody className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                    <FaBell className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No Notifications</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You don't have any notifications in this category yet.
                  </p>
                </CardBody>
              </Card>
            ) : (
              currentNotifications.map(notification => (
                <Card
                  key={notification._id}
                  className={`${
                    !notification.isRead
                      ? 'bg-linear-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 border-2 border-pink-200 dark:border-pink-800'
                      : 'bg-white dark:bg-[#1E2939]'
                  } shadow-lg hover:scale-102 transition-all cursor-pointer`}
                >
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar with Icon Badge */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold`}
                        >
                          <img
                            src={notification.actor.photo}
                            alt={notification.actor.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        {!notification.isRead && (
                          <div
                            className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-gray-800`}
                          >
                            <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              to={getProfileUrl(notification.actor._id)}
                              className="font-bold text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                            >
                              {notification.actor.name}
                            </Link>
                            <span className="text-gray-600 dark:text-gray-400">
                              {notification.type
                                ? notification.type.includes('like')
                                  ? 'liked'
                                  : notification.type.includes('comment')
                                    ? 'commented'
                                    : notification.type.includes('follow')
                                      ? 'followed'
                                      : 'interacted'
                                : 'interacted'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        </div>

                        {notification.entity && (
                          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={notification.entity.image || logoImage}
                                alt="Notification Short Image"
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {notification.entity.body}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                                <FaHeart className="text-xs" />
                                <span>{notification.entity.likesCount}</span>
                              </div>
                              <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                                <FaComment className="text-xs" />
                                <span>{notification.entity.commentsCount}</span>
                              </div>
                              <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                                <FaShare className="text-xs" />
                                <span>{notification.entity.sharesCount}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <FaClock className="text-xs" />
                            <span>{notification.createdAt.split('T')[0]}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="flat"
                                className="text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                                startContent={<FaCheckCircle />}
                                onPress={() => markAsRead(notification._id)}
                              >
                                Mark as Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="flat"
                              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              startContent={<FaTrash />}
                              onPress={() =>
                                alert(`no api for delete notification`)
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredNotifications.length > notificationsPerPage && (
            <div className="text-center mt-8">
              <Pagination
                showControls
                page={currentPage}
                total={totalPages}
                onChange={page => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notifications;
