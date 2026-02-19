import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react';
import { FaUserPlus, FaUserCheck, FaChevronRight } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { FollowContext } from '../../context/FollowContext';

const GRADIENTS = [
  ['#f97316', '#ec4899'],
  ['#6366f1', '#8b5cf6'],
  ['#10b981', '#06b6d4'],
  ['#f59e0b', '#ef4444'],
  ['#3b82f6', '#6366f1'],
];

function getGradient(index) {
  return GRADIENTS[index % GRADIENTS.length];
}

function SuggestionRow({ user, index }) {
  const { handleFollow, isFollowed } = useContext(FollowContext);
  const followed = isFollowed(user._id);
  const [start, end] = getGradient(index);

  const hasRealPhoto = user.photo && !user.photo.includes('default-profile');

  return (
    <div className="flex items-center gap-3 group">
      {/* Avatar */}
      <Link to={`/profile/${user._id}`} className="shrink-0 relative">
        {hasRealPhoto ? (
          <img
            src={user.photo}
            alt={user.name}
            className="w-11 h-11 rounded-xl object-cover shadow-md ring-2 ring-white dark:ring-[#1E2939] group-hover:ring-pink-400 transition-all duration-200"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md ring-2 ring-white dark:ring-[#1E2939] group-hover:ring-pink-400 transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${start}, ${end})`,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Mutual dot */}
        {user.mutualFollowersCount > 0 && (
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border-2 border-white dark:border-[#1E2939] text-white text-[8px] font-bold flex items-center justify-center">
            {user.mutualFollowersCount > 9 ? '9+' : user.mutualFollowersCount}
          </span>
        )}
      </Link>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/profile/${user._id}`}
          className="flex items-center gap-1 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
        >
          <span className="font-semibold text-sm truncate leading-tight">
            {user.name}
          </span>
          {user.verified && (
            <MdVerified className="text-blue-500 text-xs shrink-0" />
          )}
        </Link>
        <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
          {user.followersCount?.toLocaleString()} followers
        </p>
      </div>

      {/* Follow button */}
      <button
        onClick={() => handleFollow(user._id)}
        title={followed ? 'Unfollow' : 'Follow'}
        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm
          ${
            followed
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
              : 'text-white hover:scale-110 active:scale-95'
          }`}
        style={
          !followed
            ? { background: `linear-gradient(135deg, ${start}, ${end})` }
            : {}
        }
      >
        {followed ? (
          <FaUserCheck className="text-xs" />
        ) : (
          <FaUserPlus className="text-xs" />
        )}
      </button>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-11 h-11 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-28" />
        <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
      </div>
      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
    </div>
  );
}

const PREVIEW_COUNT = 5;

function WhoToFollow() {
  const {
    suggestions,
    isLoadingSuggestions,
    isFetchingMore,
    hasNextPage,
    loadMore,
  } = useContext(FollowContext);

  const [showAll, setShowAll] = useState(false);

  // Show up to PREVIEW_COUNT unless expanded
  const displayed = showAll ? suggestions : suggestions.slice(0, PREVIEW_COUNT);

  return (
    <Card className="bg-white/90 dark:bg-[#1E2939]/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-lg overflow-visible">
      <CardHeader className="pb-0 pt-4 px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            {/* Icon pill */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #6366f1)',
              }}
            >
              <FaUserPlus className="text-white text-xs" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-gray-900 dark:text-white">
                Who to Follow
              </h3>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-tight">
                People you might know
              </p>
            </div>
          </div>

          {/* See all link */}
          <Link
            to="/suggestions"
            className="flex items-center gap-1 text-[11px] font-semibold text-pink-600 dark:text-pink-400 hover:underline shrink-0"
          >
            See all
            <FaChevronRight className="text-[9px]" />
          </Link>
        </div>
      </CardHeader>

      <CardBody className="px-4 pt-4 pb-4 gap-0">
        {/* Accent bar */}
        <div
          className="h-0.5 w-full rounded-full mb-4 opacity-30"
          style={{
            background: 'linear-gradient(90deg, #ec4899, #6366f1, transparent)',
          }}
        />

        <div className="space-y-4">
          {isLoadingSuggestions ? (
            <>
              {[...Array(PREVIEW_COUNT)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </>
          ) : suggestions.length === 0 ? (
            <p className="text-xs text-center text-gray-400 py-4">
              No suggestions right now
            </p>
          ) : (
            displayed.map((user, index) => (
              <div key={user._id}>
                <SuggestionRow user={user} index={index} />
                {index < displayed.length - 1 && (
                  <Divider className="mt-4 opacity-30" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Show more / load more */}
        {!isLoadingSuggestions && suggestions.length > PREVIEW_COUNT && (
          <button
            onClick={() => {
              if (!showAll) {
                setShowAll(true);
              } else if (hasNextPage) {
                loadMore();
              }
            }}
            disabled={isFetchingMore}
            className="mt-4 w-full py-2 rounded-xl text-xs font-semibold text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-900/40 hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-all disabled:opacity-60"
          >
            {!showAll
              ? `Show ${suggestions.length - PREVIEW_COUNT} more`
              : isFetchingMore
                ? 'Loading…'
                : hasNextPage
                  ? 'Load more suggestions'
                  : 'All caught up ✓'}
          </button>
        )}
      </CardBody>
    </Card>
  );
}

export default WhoToFollow;
