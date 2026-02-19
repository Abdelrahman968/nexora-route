import { useState, useContext } from 'react';
import {
  Card,
  CardBody,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
} from '@heroui/react';
import {
  FaHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaRegHeart,
  FaRegBookmark,
  FaExpand,
  FaTimes,
  FaDownload,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { QuickActionsContext } from '../../context/QuickActionsContext';

function ProfilePostCard({ post }) {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked || false);
  const [showActions, setShowActions] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showRepostBox, setShowRepostBox] = useState(false);
  const [repostBody, setRepostBody] = useState('');
  const [localSharesCount, setLocalSharesCount] = useState(
    post.sharesCount || 0
  );

  const { userToken } = useContext(AuthContext);
  const { toggleLike, toggleBookmark } = useContext(QuickActionsContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postId = post._id || post.id;

  const formatNumber = num => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 7)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleLike = e => {
    e?.stopPropagation();
    setIsLiked(p => !p);
    toggleLike(postId);
  };

  const handleBookmark = e => {
    e?.stopPropagation();
    setIsBookmarked(p => !p);
    toggleBookmark(postId);
  };

  const repostMutation = useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}/share`,
        { body: repostBody },
        { headers: { Authorization: `Bearer ${userToken}` } }
      ),
    onSuccess: () => {
      setLocalSharesCount(p => p + 1);
      setRepostBody('');
      setShowRepostBox(false);
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });

  const likesCount = post.likesCount || 0;
  const commentsCount = post.commentsCount || 0;

  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3EImage unavailable%3C/text%3E%3C/svg%3E`;

  return (
    <>
      <Card
        className="bg-white dark:bg-[#1E2939] overflow-hidden group cursor-pointer border-2 border-transparent hover:border-pink-600 dark:hover:border-pink-400 transition-all duration-300"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={() => post.image && !imageError && setIsImageOpen(true)}
      >
        <CardBody className="p-0 relative">
          <div className="relative w-full aspect-square overflow-hidden">
            {post.image && !imageError ? (
              <img
                src={post.image}
                alt={post.body || 'Post image'}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : !post.image ? (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <div className="text-center">
                  <span className="text-6xl mb-2 block">📝</span>
                  <p className="text-gray-400 dark:text-gray-600 font-semibold text-sm">
                    Text Post
                  </p>
                </div>
              </div>
            ) : (
              <img
                src={placeholderImage}
                alt="Image unavailable"
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-linear-to-b from-black/0 via-black/10 to-black/70 transition-opacity duration-500 ${showActions ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Top Bar */}
            <div
              className={`absolute top-0 left-0 right-0 p-3 flex items-center justify-between transition-all duration-300 z-10 ${showActions ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            >
              <Chip
                size="sm"
                className="bg-black/60 backdrop-blur-xl text-white font-semibold border border-white/20"
              >
                {formatDate(post.createdAt)}
              </Chip>
              <div className="flex items-center gap-1">
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-black/60 backdrop-blur-xl text-white border border-white/20 hover:bg-indigo-500/80"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/posts/${postId}`);
                  }}
                >
                  <FaExternalLinkAlt className="text-xs" />
                </Button>
                {post.image && !imageError && (
                  <Button
                    isIconOnly
                    size="sm"
                    className="bg-black/60 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20"
                    onClick={e => {
                      e.stopPropagation();
                      setIsImageOpen(true);
                    }}
                  >
                    <FaExpand />
                  </Button>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 z-10 ${showActions ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            >
              {post.body && (
                <p className="text-white font-bold text-sm mb-3 line-clamp-2 drop-shadow-lg">
                  {post.body}
                </p>
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    radius="full"
                    className={`min-w-[70px] font-bold backdrop-blur-xl border transition-all ${isLiked ? 'bg-red-500/90 text-white border-red-400' : 'bg-black/60 text-white border-white/20 hover:bg-red-500/90'}`}
                    startContent={isLiked ? <FaHeart /> : <FaRegHeart />}
                    onClick={handleLike}
                    isLoading={false}
                  >
                    {formatNumber(likesCount)}
                  </Button>
                  <Button
                    size="sm"
                    radius="full"
                    className="min-w-[70px] bg-black/60 backdrop-blur-xl text-white border border-white/20 hover:bg-blue-500/90 font-bold transition-all"
                    startContent={<FaComment />}
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/posts/${postId}`);
                    }}
                  >
                    {formatNumber(commentsCount)}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    className={`backdrop-blur-xl border transition-all ${showRepostBox ? 'bg-emerald-500/90 text-white border-emerald-400' : 'bg-black/60 text-white border-white/20 hover:bg-emerald-500/90'}`}
                    onClick={e => {
                      e.stopPropagation();
                      setShowRepostBox(p => !p);
                    }}
                  >
                    <FaShare />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    className={`backdrop-blur-xl border transition-all ${isBookmarked ? 'bg-pink-500/90 text-white border-pink-400' : 'bg-black/60 text-white border-white/20 hover:bg-pink-500/90'}`}
                    onClick={handleBookmark}
                  >
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  </Button>
                </div>
              </div>

              {showRepostBox && (
                <div
                  className="mt-3 p-3 bg-black/70 backdrop-blur-xl rounded-2xl border border-white/20 space-y-2"
                  onClick={e => e.stopPropagation()}
                >
                  <Textarea
                    placeholder="Add a comment... (optional)"
                    value={repostBody}
                    onValueChange={setRepostBody}
                    minRows={2}
                    size="sm"
                    classNames={{
                      input: 'text-white text-xs placeholder:text-white/50',
                      inputWrapper: 'bg-white/10 border border-white/20',
                    }}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      className="text-white bg-white/10 font-semibold text-xs"
                      onPress={() => setShowRepostBox(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-xs"
                      onPress={() => repostMutation.mutate()}
                      isLoading={repostMutation.isPending}
                      startContent={
                        !repostMutation.isPending && (
                          <FaShare className="text-xs" />
                        )
                      }
                    >
                      Repost
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Idle: engagement pill */}
            <div
              className={`absolute bottom-3 left-3 right-3 transition-all duration-500 ${showActions ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
            >
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
                <div className="flex items-center gap-1.5">
                  <FaHeart className="text-red-400 text-sm" />
                  <span className="text-white font-bold text-sm">
                    {formatNumber(likesCount)}
                  </span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <FaComment className="text-blue-400 text-sm" />
                  <span className="text-white font-bold text-sm">
                    {formatNumber(commentsCount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Type badge */}
            <div
              className={`absolute top-3 right-3 transition-all duration-300 ${showActions ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            >
              <div
                className={`w-10 h-10 rounded-xl ${post.image && !imageError ? 'bg-linear-to-br from-blue-500 to-cyan-600' : 'bg-linear-to-br from-purple-500 to-pink-600'} flex items-center justify-center shadow-lg border-2 border-white/20`}
              >
                {post.image && !imageError ? (
                  <div className="w-3 h-3 rounded bg-white" />
                ) : (
                  <span className="text-white text-sm">📝</span>
                )}
              </div>
            </div>

            {likesCount > 10 && (
              <div
                className={`absolute top-3 left-3 transition-all duration-300 ${showActions ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              >
                <Chip
                  size="sm"
                  className="bg-linear-to-r from-yellow-500 to-orange-500 text-white font-bold shadow-lg animate-pulse"
                  startContent={<span className="text-lg">🔥</span>}
                >
                  Trending
                </Chip>
              </div>
            )}
          </div>

          {/* Quick info bar */}
          <div className="p-3 bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold">
                {formatDate(post.createdAt)}
              </span>
              <div className="flex items-center gap-3">
                <span>{formatNumber(localSharesCount)} shares</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/posts/${postId}`);
                  }}
                  className="flex items-center gap-1 text-indigo-500 hover:text-indigo-600 font-semibold transition-colors"
                >
                  <FaExternalLinkAlt className="text-[10px]" /> View
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Image Modal */}
      {post.image && !imageError && (
        <Modal
          isOpen={isImageOpen}
          onClose={() => setIsImageOpen(false)}
          size="5xl"
          scrollBehavior="inside"
          classNames={{
            base: 'bg-transparent shadow-none',
            backdrop: 'bg-black/90 backdrop-blur-md',
            wrapper: 'overflow-hidden',
          }}
        >
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1 bg-transparent text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                        {post.user?.photo ? (
                          <img
                            src={post.user.photo}
                            alt={post.user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                            {post.user?.name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold">
                          {post.user?.name || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        className="text-white bg-white/10 hover:bg-indigo-500/80 font-semibold"
                        startContent={<FaExternalLinkAlt className="text-xs" />}
                        onPress={() => {
                          onClose();
                          navigate(`/posts/${postId}`);
                        }}
                      >
                        Open Post
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        className="text-white hover:bg-white/10"
                        onPress={onClose}
                      >
                        <FaTimes className="text-xl" />
                      </Button>
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody className="p-0">
                  <div className="w-full h-[70vh] bg-black flex items-center justify-center">
                    <img
                      src={post.image}
                      alt={post.body || 'Post image'}
                      className="max-w-full max-h-full object-contain"
                      onError={e => {
                        e.target.src = placeholderImage;
                      }}
                    />
                  </div>
                  <div className="bg-white dark:bg-[#1E2939] p-6">
                    {post.body && (
                      <p className="text-gray-900 dark:text-white text-lg mb-4 leading-relaxed whitespace-pre-wrap">
                        {post.body}
                      </p>
                    )}
                    <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4">
                      <div className="flex items-center gap-3">
                        <Button
                          size="lg"
                          radius="full"
                          className={`min-w-[100px] font-bold transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white'}`}
                          startContent={isLiked ? <FaHeart /> : <FaRegHeart />}
                          onClick={handleLike}
                        >
                          {formatNumber(likesCount)}
                        </Button>
                        <Button
                          size="lg"
                          radius="full"
                          className="min-w-[100px] bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white font-bold transition-all"
                          startContent={<FaComment />}
                          onPress={() => {
                            onClose();
                            navigate(`/posts/${postId}`);
                          }}
                        >
                          {formatNumber(commentsCount)}
                        </Button>
                        <Button
                          size="lg"
                          radius="full"
                          className={`min-w-[100px] font-bold transition-all ${showRepostBox ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-emerald-500 hover:text-white'}`}
                          startContent={<FaShare />}
                          onPress={() => setShowRepostBox(p => !p)}
                        >
                          {formatNumber(localSharesCount)}
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          isIconOnly
                          size="lg"
                          radius="full"
                          className={`transition-all ${isBookmarked ? 'bg-pink-500 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-pink-500 hover:text-white'}`}
                          onClick={handleBookmark}
                        >
                          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        </Button>
                        <Button
                          isIconOnly
                          size="lg"
                          radius="full"
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white transition-all"
                          as="a"
                          href={post.image}
                          download
                        >
                          <FaDownload />
                        </Button>
                      </div>
                    </div>

                    {showRepostBox && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
                        <Textarea
                          placeholder="Add a comment to your repost... (optional)"
                          value={repostBody}
                          onValueChange={setRepostBody}
                          minRows={2}
                          classNames={{
                            input: 'dark:text-white text-sm',
                            inputWrapper:
                              'dark:bg-gray-800 border dark:border-gray-700',
                          }}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={() => setShowRepostBox(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold"
                            onPress={() => repostMutation.mutate()}
                            isLoading={repostMutation.isPending}
                            startContent={
                              !repostMutation.isPending && <FaShare />
                            }
                          >
                            Repost
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          {formatNumber(likesCount)}
                        </strong>{' '}
                        likes
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          {formatNumber(commentsCount)}
                        </strong>{' '}
                        comments
                      </span>
                      <span>
                        <strong className="text-gray-900 dark:text-white">
                          {formatNumber(localSharesCount)}
                        </strong>{' '}
                        shares
                      </span>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ProfilePostCard;
