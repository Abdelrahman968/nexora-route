import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaMapMarkerAlt,
  FaCalendar,
  FaCheckCircle,
  FaUserPlus,
  FaUserCheck,
  FaEnvelope,
  FaImage,
  FaUsers,
  FaArrowLeft,
  FaStar,
  FaChartLine,
  FaUser,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import {
  Card,
  CardBody,
  Button,
  Tabs,
  Tab,
  Chip,
  Pagination,
  Spinner,
} from '@heroui/react';
import SEO from '../SEO/SEO';
import ProfilePostCard from '../ProfilePostCard/ProfilePostCard';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function UserProfile() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('posts');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const postsPerPage = 9;

  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/${id}/profile`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    },
    enabled: !!id && !!userToken,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const user = profileData?.data?.user || {};

  // Sync follow state once profile data arrives
  useEffect(() => {
    if (profileData) {
      // eslint-disable-next-line
      setIsFollowing(profileData?.data?.isFollowing ?? false);
    }
  }, [profileData]);

  const followMutation = useMutation({
    mutationFn: async () => {
      if (isFollowing) {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/users/${id}/unfollow`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/${id}/follow`,
          {},
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      }
    },
    onMutate: () => {
      // Optimistic toggle
      setIsFollowing(prev => !prev);
    },
    onError: () => {
      // Rollback on error
      setIsFollowing(prev => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile', id]);
    },
  });

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = useQuery({
    queryKey: ['otherUserPosts', id, currentPage],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/${id}/posts`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
          params: {
            currentPage,
            limit: postsPerPage,
          },
        }
      );
      return response.data;
    },
    enabled: !!id && !!userToken && activeTab === 'posts',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const formatJoinDate = dateString => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const getInitials = name => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const posts = postsData?.data?.posts || [];
  const totalPages = postsData?.meta?.pagination?.numberOfPages || 1;
  const totalPosts = postsData?.meta?.pagination?.total || 0;

  const defaultAvatarGradient = 'from-pink-500 to-purple-600';
  const defaultCoverGradient = 'from-blue-500 to-purple-600';

  const stats = [
    {
      value: totalPosts,
      label: 'Posts',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      value: user.followersCount || 0,
      label: 'Followers',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      value: user.followingCount || 0,
      label: 'Following',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      value: user.bookmarksCount || 0,
      label: 'Bookmarks',
      gradient: 'from-red-500 to-pink-500',
    },
  ];

  const badges = [
    {
      name: 'Route Posts member',
      icon: <FaUser />,
      color: 'from-blue-500 to-cyan-500',
    },
    user.verified && {
      name: 'Verified',
      icon: <MdVerified />,
      color: 'from-blue-500 to-cyan-500',
    },
    user.followersCount > 1000 && {
      name: 'Top Creator',
      icon: <FaStar />,
      color: 'from-yellow-500 to-orange-500',
    },
    user.createdAt &&
      new Date(user.createdAt).getFullYear() === 2026 && {
        name: 'Early Adopter',
        icon: <FaCheckCircle />,
        color: 'from-green-500 to-emerald-500',
      },
  ].filter(Boolean);

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoadingProfile) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <h2 className="text-2xl font-bold mb-4 mt-4">Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (isErrorProfile) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 max-w-md">
          <CardBody className="p-6 text-center">
            <p className="text-red-600 dark:text-red-400 font-semibold mb-2">
              Failed to load profile
            </p>
            <Button
              size="sm"
              className="mt-4 bg-red-600 text-white"
              onPress={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${user.name || 'User'} - Profile`}
        description={user.bio || `View ${user.name}'s profile`}
        path={`/profile/${id}`}
      />

      <div className="w-full min-h-screen">
        {/* Cover Photo */}
        <div
          className={`w-full h-64 md:h-80 ${
            user.cover && user.cover.startsWith('http')
              ? ''
              : `bg-linear-to-r ${defaultCoverGradient}`
          } relative`}
          style={
            user.cover && user.cover.startsWith('http')
              ? {
                  backgroundImage: `url(${user.cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-4 left-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="relative">
                {user.photo && user.photo.startsWith('http') ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-40 h-40 rounded-3xl object-cover border-8 border-white dark:border-gray-800 shadow-2xl"
                  />
                ) : (
                  <div
                    className={`w-40 h-40 rounded-3xl bg-linear-to-r ${defaultAvatarGradient} flex items-center justify-center text-white text-6xl font-bold border-8 border-white dark:border-gray-800 shadow-2xl`}
                  >
                    {getInitials(user.name)}
                  </div>
                )}
              </div>

              {/* User Info Card */}
              <div className="flex-1">
                <div className="bg-white dark:bg-[#1E2939] rounded-2xl shadow-xl p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                      {/* Name + Verified */}
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-extrabold">
                          <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                            {user.name || 'Anonymous'}
                          </span>
                        </h1>
                        {user.verified && (
                          <MdVerified className="text-blue-500 text-2xl" />
                        )}
                      </div>

                      {/* Handle */}
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">
                        @
                        {user.username ||
                          user.email?.split('@')[0] ||
                          id ||
                          'user'}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        Active on Route Posts
                      </p>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {user.gender && (
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-pink-600 dark:text-pink-400" />
                            <span className="capitalize">{user.gender}</span>
                          </div>
                        )}
                        {user.dateOfBirth && (
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-pink-600 dark:text-pink-400" />
                            <span>
                              Born{' '}
                              {new Date(user.dateOfBirth).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-pink-600 dark:text-pink-400" />
                          <span>Joined {formatJoinDate(user.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button
                        size="lg"
                        className={`${
                          isFollowing
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'bg-linear-to-r from-pink-600 to-indigo-600 text-white'
                        } font-bold shadow-lg hover:scale-105 transition-all`}
                        startContent={
                          isFollowing ? <FaUserCheck /> : <FaUserPlus />
                        }
                        isLoading={followMutation.isPending}
                        onPress={() => followMutation.mutate()}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button
                        size="lg"
                        variant="bordered"
                        className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold hover:scale-105 transition-all"
                        startContent={<FaEnvelope />}
                      >
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {badges.map((badge, index) => (
                        <Chip
                          key={index}
                          size="md"
                          className={`bg-linear-to-r ${badge.color} text-white font-bold p-2`}
                          startContent={badge.icon}
                        >
                          {badge.name}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <CardBody className="p-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-r ${stat.gradient} flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                  >
                    <FaChartLine className="text-xl" />
                  </div>
                  <div className="text-3xl font-extrabold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Content Tabs */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl mb-8">
            <CardBody className="p-6">
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={key => {
                  setActiveTab(key);
                  setCurrentPage(1);
                }}
                size="lg"
                classNames={{
                  tabList: 'gap-6 w-full',
                  cursor: 'bg-linear-to-r from-pink-600 to-indigo-600',
                  tab: 'px-6',
                  tabContent: 'group-data-[selected=true]:text-white font-bold',
                }}
              >
                <Tab
                  key="posts"
                  title={
                    <div className="flex items-center gap-2">
                      <FaImage />
                      <span>Posts</span>
                    </div>
                  }
                />
                <Tab
                  key="followers"
                  title={
                    <div className="flex items-center gap-2">
                      <FaUsers />
                      <span>Followers</span>
                    </div>
                  }
                />
              </Tabs>
            </CardBody>
          </Card>

          {activeTab === 'posts' && (
            <>
              {isLoadingPosts ? (
                <div className="text-center py-12">
                  <Spinner size="lg" color="primary" />
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    Loading posts...
                  </p>
                </div>
              ) : isErrorPosts ? (
                <div className="text-center py-12">
                  <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 max-w-md mx-auto">
                    <CardBody className="p-6">
                      <p className="text-red-600 dark:text-red-400 font-semibold mb-2">
                        Error loading posts
                      </p>
                      <p className="text-red-500 dark:text-red-300 text-sm">
                        {errorPosts?.message || 'Something went wrong'}
                      </p>
                      <Button
                        size="sm"
                        className="mt-4 bg-red-600 text-white"
                        onPress={() =>
                          queryClient.invalidateQueries(['otherUserPosts', id])
                        }
                      >
                        Retry
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              ) : posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {posts.map(post => (
                      <ProfilePostCard key={post._id} post={post} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pb-12">
                      <Pagination
                        total={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        showControls
                        color="primary"
                        size="lg"
                        classNames={{
                          cursor: 'bg-linear-to-r from-pink-600 to-indigo-600',
                          item: 'hover:bg-gray-100 dark:hover:bg-gray-800',
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Card className="bg-gray-50 dark:bg-gray-800 max-w-md mx-auto">
                    <CardBody className="p-8">
                      <div className="text-6xl mb-4">📝</div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                        No posts yet
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                        Posts will appear here once they are created
                      </p>
                    </CardBody>
                  </Card>
                </div>
              )}
            </>
          )}

          {activeTab === 'followers' && (
            <div className="pb-12">
              {user.followers && user.followers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.followers.map(follower => (
                    <Card
                      key={follower._id || follower.id}
                      className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all"
                    >
                      <CardBody className="p-4 flex flex-row items-center gap-4">
                        {follower.photo && follower.photo.startsWith('http') ? (
                          <img
                            src={follower.photo}
                            alt={follower.name}
                            className="w-14 h-14 rounded-2xl object-cover shadow-md"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            {getInitials(follower.name)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white truncate">
                            {follower.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {follower.followersCount || 0} followers
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold"
                          startContent={<FaUserPlus />}
                        >
                          Follow
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Card className="bg-gray-50 dark:bg-gray-800 max-w-md mx-auto">
                    <CardBody className="p-8">
                      <div className="text-6xl mb-4">👥</div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                        No followers yet
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                        Followers will appear here
                      </p>
                    </CardBody>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
