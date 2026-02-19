import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Textarea,
  Spinner,
} from '@heroui/react';
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaEllipsisH,
  FaTrash,
  FaEdit,
  FaFlag,
  FaLock,
  FaUserFriends,
  FaGlobe,
  FaArrowLeft,
  FaPaperPlane,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';
import { QuickActionsContext } from '../../context/QuickActionsContext';
import { CommentContext } from '../../context/CommentContext';
import { DeleteModal, ShareModal } from '../Comment/Comment';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function fmtNum(n = 0) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

const PRIVACY_ICON = {
  public: { icon: FaGlobe, label: 'Public', cls: 'text-sky-400' },
  following: {
    icon: FaUserFriends,
    label: 'Followers',
    cls: 'text-emerald-400',
  },
  private: { icon: FaLock, label: 'Only me', cls: 'text-gray-400' },
};

function Avatar({ photo, name, size = 'md' }) {
  const s = { sm: 'w-8 h-8', md: 'w-11 h-11', lg: 'w-14 h-14' };
  if (photo?.startsWith('http'))
    return (
      <img
        src={photo}
        alt={name}
        className={`${s[size]} rounded-full object-cover shrink-0`}
      />
    );
  return (
    <div
      className={`${s[size]} rounded-full bg-linear-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0`}
    >
      {name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}

function SharedPostPreview({ sharedPost }) {
  if (!sharedPost) return null;
  return (
    <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/40 mt-3">
      <div className="flex gap-2 items-center px-3 pt-3 pb-1">
        <Avatar
          photo={sharedPost.user?.photo}
          name={sharedPost.user?.name}
          size="sm"
        />
        <div>
          <p className="text-xs font-bold text-gray-800 dark:text-white">
            {sharedPost.user?.name}
          </p>
          <p className="text-[10px] text-gray-400">
            @{sharedPost.user?.username}
          </p>
        </div>
      </div>
      {sharedPost.body && (
        <p className="text-sm text-gray-600 dark:text-gray-400 px-3 pb-2 leading-relaxed">
          {sharedPost.body}
        </p>
      )}
      {sharedPost.image && (
        <img
          src={sharedPost.image}
          alt="shared"
          className="w-full max-h-64 object-cover"
        />
      )}
    </div>
  );
}

function CommentRow({ comment, postId }) {
  const { toggleCommentLike, deleteComment, isDeletingComment } =
    useContext(CommentContext);
  const { safeProfileInfo } = useContext(ProfileInfoContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const currentUserId =
    safeProfileInfo?.data?.user?._id || safeProfileInfo?.data?.user?.id;
  const isOwner =
    currentUserId &&
    (comment.commentCreator?._id === currentUserId ||
      comment.commentCreator?.id === currentUserId);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);

  const handleLike = () => {
    setLiked(p => !p);
    setLikesCount(p => (liked ? p - 1 : p + 1));
    toggleCommentLike(postId, comment._id);
  };

  return (
    <>
      <div className="flex gap-3 items-start py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 group">
        <Avatar
          photo={comment.commentCreator?.photo}
          name={comment.commentCreator?.name}
          size="sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {comment.commentCreator?.name}
            </span>
            <span className="text-xs text-gray-400">
              @{comment.commentCreator?.username}
            </span>
            <span className="text-xs text-gray-400">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {comment.content}
          </p>
          {comment.image && (
            <img
              src={comment.image}
              alt="comment"
              className="mt-2 max-h-40 rounded-xl object-cover"
            />
          )}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleLike}
              className={`text-[11px] font-bold transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
            >
              {liked ? '❤️' : 'Like'}{' '}
              {likesCount > 0 && <span>{likesCount}</span>}
            </button>
            {isOwner && (
              <button
                onClick={onDeleteOpen}
                className="text-[11px] font-bold text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={() => {
          deleteComment(postId, comment._id);
          onDeleteClose();
        }}
        isLoading={isDeletingComment}
        label="comment"
      />
    </>
  );
}

function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { userToken } = useContext(AuthContext);
  const { safeProfileInfo } = useContext(ProfileInfoContext);
  const { toggleLike, toggleBookmark } = useContext(QuickActionsContext);
  const { useComments, createComment, isCreatingComment } =
    useContext(CommentContext);

  const [commentText, setCommentText] = useState('');
  const [localLiked, setLocalLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [localBookmarked, setLocalBookmarked] = useState(false);
  const [localSharesCount, setLocalSharesCount] = useState(0);
  const [repostBody, setRepostBody] = useState('');
  const [showRepostBox, setShowRepostBox] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { isOpen: isShareOpen, onClose: onShareClose } = useDisclosure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return data;
    },
    enabled: !!postId && !!userToken,
  });

  const post = data?.data?.post || data?.post || data;

  // Sync local state once after first load
  useEffect(() => {
    if (post && !initialized) {
      setLocalLiked(post.liked || false);
      setLocalLikes(post.likesCount || 0);
      setLocalBookmarked(post.bookmarked || false);
      setLocalSharesCount(post.sharesCount || 0);
      setInitialized(true);
    }
  }, [post, initialized]);

  // Paginated comments via CommentContext
  const commentsQuery = useComments(postId, 20);
  const comments =
    commentsQuery.data?.pages.flatMap(p => p.data?.comments ?? []) ?? [];

  const currentUserId =
    safeProfileInfo?.data?.user?._id || safeProfileInfo?.data?.user?.id;
  const isOwner =
    currentUserId &&
    (post?.user?._id === currentUserId || post?.user?.id === currentUserId);
  const privacyInfo = PRIVACY_ICON[post?.privacy] || PRIVACY_ICON.public;
  const PrivacyIcon = privacyInfo.icon;

  const handleLike = () => {
    setLocalLiked(p => !p);
    setLocalLikes(p => (localLiked ? p - 1 : p + 1));
    toggleLike(postId);
  };

  const handleBookmark = () => {
    setLocalBookmarked(p => !p);
    toggleBookmark(postId);
  };

  const deleteMutation = useMutation({
    mutationFn: () =>
      axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      navigate(-1);
    },
  });

  const repostMutation = useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}/share`,
        { body: repostBody },
        { headers: { Authorization: `Bearer ${userToken}` } }
      ),
    onSuccess: () => {
      setRepostBody('');
      setShowRepostBox(false);
      setLocalSharesCount(p => p + 1);
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
    },
  });

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    createComment(postId, { content: commentText.trim() });
    setCommentText('');
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error?.message} />;
  if (!post) return <Error message="Post not found" />;

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 font-semibold text-sm mb-6 transition-colors"
        >
          <FaArrowLeft className="text-xs" /> Back
        </button>

        <div className="bg-white dark:bg-[#1E2939] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden mb-4">
          <div className="flex items-start justify-between px-5 pt-5 pb-3">
            <div className="flex gap-3 items-start">
              <Link to={`/profile/${post.user?._id || post.user?.id}`}>
                <Avatar
                  photo={post.user?.photo}
                  name={post.user?.name}
                  size="lg"
                />
              </Link>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Link
                    to={`/profile/${post.user?._id || post.user?.id}`}
                    className="font-extrabold text-base text-gray-900 dark:text-white hover:text-pink-500 transition-colors"
                  >
                    {post.user?.name}
                  </Link>
                  {post.user?.verified && (
                    <MdVerified className="text-blue-500" />
                  )}
                  {post.isShare && (
                    <Chip
                      size="sm"
                      variant="flat"
                      className="h-4 text-[9px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500"
                    >
                      Shared
                    </Chip>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-xs text-gray-400">
                    @{post.user?.username || post.user?.name}
                  </span>
                  <span className="text-gray-300 dark:text-gray-700">·</span>
                  <span className="text-xs text-gray-400">
                    {timeAgo(post.createdAt)}
                  </span>
                  <span className="text-gray-300 dark:text-gray-700">·</span>
                  <PrivacyIcon
                    className={`text-xs ${privacyInfo.cls}`}
                    title={privacyInfo.label}
                  />
                </div>
              </div>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <FaEllipsisH className="text-sm" />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                {isOwner ? (
                  <>
                    <DropdownItem
                      key="edit"
                      startContent={<FaEdit className="text-indigo-400" />}
                    >
                      Edit Post
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-red-500"
                      onPress={onDeleteOpen}
                      startContent={<FaTrash className="text-red-400" />}
                    >
                      Delete Post
                    </DropdownItem>
                  </>
                ) : (
                  <DropdownItem
                    key="report"
                    className="text-orange-500"
                    startContent={<FaFlag className="text-orange-400" />}
                  >
                    Report Post
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {post.body && (
            <p className="px-5 pb-4 text-gray-800 dark:text-gray-100 text-base leading-relaxed">
              {post.body}
            </p>
          )}
          {post.isShare && post.sharedPost && (
            <div className="px-5 pb-4">
              <SharedPostPreview sharedPost={post.sharedPost} />
            </div>
          )}
          {post.image && (
            <div className="mx-5 mb-4 rounded-2xl overflow-hidden shadow-md">
              <img
                src={post.image}
                alt="post"
                className="w-full object-cover max-h-[520px]"
              />
            </div>
          )}

          {/* Stats */}
          <div className="px-5 py-3 flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
            <span>
              <strong className="text-gray-700 dark:text-gray-200">
                {fmtNum(localLikes)}
              </strong>{' '}
              Likes
            </span>
            <span>
              <strong className="text-gray-700 dark:text-gray-200">
                {fmtNum(post.commentsCount || comments.length)}
              </strong>{' '}
              Comments
            </span>
            <span>
              <strong className="text-gray-700 dark:text-gray-200">
                {fmtNum(localSharesCount)}
              </strong>{' '}
              Reposts
            </span>
          </div>

          {/* Actions */}
          <div className="px-3 pb-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2">
            <div className="flex items-center gap-1">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 ${localLiked ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
              >
                {localLiked ? (
                  <FaHeart className="animate-bounce" />
                ) : (
                  <FaRegHeart />
                )}
                <span>Like</span>
              </button>
              <button
                onClick={() =>
                  document.getElementById('comment-input')?.focus()
                }
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-500 transition-all hover:scale-105"
              >
                <FaRegComment />
                <span>Comment</span>
              </button>
              <button
                onClick={() => setShowRepostBox(p => !p)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold transition-all hover:scale-105 active:scale-95 ${showRepostBox ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-500'}`}
              >
                <FaShare />
                <span>Repost</span>
              </button>
            </div>
            <button
              onClick={handleBookmark}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${localBookmarked ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-500' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-400'}`}
            >
              {localBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>

          {showRepostBox && (
            <div className="mx-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3">
              <Textarea
                placeholder="Add a comment to your repost... (optional)"
                value={repostBody}
                onValueChange={setRepostBody}
                minRows={2}
                classNames={{
                  input: 'dark:text-white text-sm',
                  inputWrapper: 'dark:bg-gray-800 border dark:border-gray-700',
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
                  startContent={!repostMutation.isPending && <FaShare />}
                >
                  Repost
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#1E2939] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-extrabold text-base mb-3 text-gray-900 dark:text-white">
              Comments{' '}
              <span className="text-pink-500">
                ({fmtNum(post.commentsCount || comments.length)})
              </span>
            </h2>
            <div className="flex gap-3 items-start">
              <Avatar
                photo={safeProfileInfo?.data?.user?.photo}
                name={safeProfileInfo?.data?.user?.name}
                size="sm"
              />
              <div className="flex-1 flex gap-2 items-end">
                <Textarea
                  id="comment-input"
                  placeholder="Write a comment..."
                  value={commentText}
                  onValueChange={setCommentText}
                  minRows={1}
                  maxRows={4}
                  classNames={{
                    input: 'dark:text-white text-sm',
                    inputWrapper:
                      'dark:bg-gray-800 border dark:border-gray-700',
                  }}
                  onKeyDown={e => {
                    if (
                      e.key === 'Enter' &&
                      !e.shiftKey &&
                      commentText.trim()
                    ) {
                      e.preventDefault();
                      handleSubmitComment();
                    }
                  }}
                />
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-linear-to-r from-pink-600 to-indigo-600 text-white shrink-0 mb-0.5"
                  onPress={handleSubmitComment}
                  isLoading={isCreatingComment}
                >
                  {!isCreatingComment && <FaPaperPlane className="text-xs" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="px-5 divide-y divide-gray-100 dark:divide-gray-800">
            {commentsQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="md" />
              </div>
            ) : comments.length === 0 ? (
              <div className="py-12 text-center">
                <FaRegComment className="text-3xl text-gray-300 dark:text-gray-700 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  No comments yet. Be the first!
                </p>
              </div>
            ) : (
              comments.map((comment, i) => (
                <CommentRow
                  key={comment._id || i}
                  comment={comment}
                  postId={postId}
                />
              ))
            )}
          </div>

          {commentsQuery.hasNextPage && (
            <div className="flex justify-center pb-5 pt-2">
              <Button
                size="sm"
                variant="flat"
                isLoading={commentsQuery.isFetchingNextPage}
                onPress={() => commentsQuery.fetchNextPage()}
              >
                Load more comments
              </Button>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={() => deleteMutation.mutate()}
        isLoading={deleteMutation.isPending}
        label="post"
      />
      <ShareModal isOpen={isShareOpen} onClose={onShareClose} post={post} />
    </div>
  );
}

export default PostPage;
