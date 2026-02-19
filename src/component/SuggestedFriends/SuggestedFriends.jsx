import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers,
  FaUserPlus,
  FaUserCheck,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaFilter,
  FaRandom,
  FaFire,
  FaSpinner,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Card, CardBody, Button, Chip, Input, Skeleton } from '@heroui/react';
import SEO from '../SEO/SEO';
import { FollowContext } from '../../context/FollowContext';

function UserCardSkeleton() {
  return (
    <Card className="bg-white dark:bg-[#1E2939] shadow-lg">
      <CardBody className="p-0">
        <Skeleton className="h-24 w-full rounded-t-xl" />
        <div className="px-6 pb-6 pt-4 flex flex-col items-center gap-3">
          <Skeleton className="w-20 h-20 rounded-2xl -mt-12" />
          <Skeleton className="h-5 w-32 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-lg" />
          <Skeleton className="h-4 w-40 rounded-lg" />
          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 w-full mt-1">
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const AVATAR_GRADIENTS = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-indigo-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-orange-500',
  'from-teal-500 to-green-500',
  'from-indigo-500 to-blue-500',
  'from-pink-600 to-purple-600',
];

function getGradient(index) {
  return AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
}

function UserCard({ user, index }) {
  const { handleFollow, isFollowed } = useContext(FollowContext);
  const followed = isFollowed(user._id);
  const gradient = getGradient(index);

  const formatCount = n => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n);

  return (
    <Card className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-[1.03] transition-all duration-200 cursor-pointer group">
      <CardBody className="p-0">
        <div className={`relative h-24 bg-linear-to-r ${gradient}`}>
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white dark:to-[#1E2939]" />
        </div>

        {/* Avatar */}
        <div className="relative -mt-12 px-6 mb-4 flex justify-center">
          {user.photo && !user.photo.includes('default-profile') ? (
            <img
              src={user.photo}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-[#1E2939] shadow-xl"
            />
          ) : (
            <div
              className={`w-24 h-24 rounded-2xl bg-linear-to-r ${gradient} flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-[#1E2939] shadow-xl`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-6 pb-6">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Link
                to={`/profile/${user._id}`}
                className="font-bold text-lg hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                {user.name}
              </Link>
              {user.verified && (
                <MdVerified className="text-blue-500 text-lg" />
              )}
            </div>
            {user.username && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                @{user.username}
              </p>
            )}
            {user.mutualFollowersCount > 0 && (
              <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold">
                {user.mutualFollowersCount} mutual follower
                {user.mutualFollowersCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl py-2">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {formatCount(user.followersCount)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Followers
              </div>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl py-2">
              <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                {user.mutualFollowersCount}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Mutual
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              size="md"
              className={`${
                followed
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'bg-linear-to-r from-pink-600 to-indigo-600 text-white'
              } font-bold hover:scale-105 transition-all`}
              startContent={followed ? <FaUserCheck /> : <FaUserPlus />}
              onClick={() => handleFollow(user._id)}
            >
              {followed ? 'Following' : 'Follow'}
            </Button>
            <Button
              size="md"
              variant="bordered"
              className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold hover:scale-105 transition-all"
              as={Link}
              to={`/profile/${user._id}`}
            >
              Profile
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function SuggestedFriends() {
  const {
    suggestions,
    isLoadingSuggestions,
    isFetchingMore,
    hasNextPage,
    loadMore,
    followedCount,
  } = useContext(FollowContext);

  const [searchQuery, setSearchQuery] = useState('');

  // Client-side search filter on already-fetched pages
  const filteredUsers = searchQuery
    ? suggestions.filter(
        u =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (u.username ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestions;

  const stats = [
    {
      value: suggestions.length,
      label: 'Suggestions',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <FaUsers />,
    },
    {
      value: followedCount,
      label: 'New Follows',
      gradient: 'from-pink-500 to-rose-500',
      icon: <FaUserPlus />,
    },
  ];

  return (
    <>
      <SEO
        title="Suggested Friends"
        description="Discover and connect with new people"
        path="/suggested-friends"
      />

      <div className="w-full min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Suggested Friends
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Discover people you may know based on mutual connections
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all"
              >
                <CardBody className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-linear-to-r ${stat.gradient} flex items-center justify-center text-white shadow-lg`}
                    >
                      <div className="text-3xl">{stat.icon}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Search */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-lg mb-8">
            <CardBody className="p-6">
              <Input
                size="lg"
                placeholder="Search by name or username..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                startContent={<FaUsers className="text-gray-400" />}
                classNames={{
                  input: 'text-base',
                  inputWrapper:
                    'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                }}
              />
            </CardBody>
          </Card>

          {/* Grid */}
          {isLoadingSuggestions ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <UserCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <Card className="bg-white dark:bg-[#1E2939] shadow-lg">
              <CardBody className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-4xl text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No Results Found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search query
                </p>
                <Button
                  size="lg"
                  className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold hover:scale-105 transition-all"
                  startContent={<FaRandom />}
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </CardBody>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredUsers.map((user, index) => (
                <UserCard key={user._id} user={user} index={index} />
              ))}
            </div>
          )}

          {/* Load More */}
          {!isLoadingSuggestions && hasNextPage && !searchQuery && (
            <div className="text-center mt-4">
              <Button
                size="lg"
                variant="bordered"
                isLoading={isFetchingMore}
                spinner={<FaSpinner className="animate-spin" />}
                className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold hover:scale-105 transition-all"
                onClick={loadMore}
              >
                {isFetchingMore ? 'Loading…' : 'Load More Suggestions'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SuggestedFriends;
