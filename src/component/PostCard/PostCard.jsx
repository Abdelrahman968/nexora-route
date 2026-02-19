import { useState, useContext } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
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
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Comments, { DeleteModal, ShareModal } from '../Comment/Comment';
import { AuthContext } from '../../context/AuthContext';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';
import { QuickActionsContext } from '../../context/QuickActionsContext';

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
      className={`${s[size]} rounded-full bg-linear-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold text-base shrink-0`}
    >
      {name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}

function SharedPostPreview({ sharedPost }) {
  if (!sharedPost) return null;
  return (
    <div className="mx-4 mb-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/40">
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
          className="w-full max-h-48 object-cover"
        />
      )}
    </div>
  );
}

function RePostModal({ isOpen, onClose, post, userToken }) {
  const [repostBody, setRepostBody] = useState('');
  const queryClient = useQueryClient();
  const postId = post?._id || post?.id;

  const repostMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}/share`,
        { body: repostBody || 'Look at this post!😊' },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      setRepostBody('');
      onClose();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      classNames={{
        base: 'dark:bg-[#1E2939]',
        header: 'border-b border-gray-200 dark:border-gray-700',
        footer: 'border-t border-gray-200 dark:border-gray-700',
      }}
    >
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-2">
            <FaShare className="text-pink-500" />
            <span className="font-bold">Repost</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/40 mb-3">
            <div className="flex gap-2 items-center px-3 pt-3 pb-1">
              <Avatar
                photo={post?.user?.photo}
                name={post?.user?.name}
                size="sm"
              />
              <div>
                <p className="text-xs font-bold text-gray-800 dark:text-white">
                  {post?.user?.name}
                </p>
                <p className="text-[10px] text-gray-400">
                  @{post?.user?.username}
                </p>
              </div>
            </div>
            {post?.body && (
              <p className="text-sm text-gray-600 dark:text-gray-400 px-3 pb-2 leading-relaxed line-clamp-3">
                {post.body}
              </p>
            )}
            {post?.image && (
              <img
                src={post.image}
                alt="post"
                className="w-full max-h-40 object-cover"
              />
            )}
          </div>
          <Textarea
            placeholder="Add a comment..."
            value={repostBody}
            onValueChange={setRepostBody}
            minRows={3}
            classNames={{
              input: 'dark:text-white',
              inputWrapper: 'dark:bg-gray-800 border dark:border-gray-700',
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose} className="font-semibold">
            Cancel
          </Button>
          <Button
            className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold shadow-lg"
            onPress={() => repostMutation.mutate()}
            isLoading={repostMutation.isPending}
            startContent={!repostMutation.isPending && <FaShare />}
          >
            Repost
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function PostCard({ post }) {
  const {
    _id,
    id,
    body,
    image,
    bookmarked,
    commentsCount,
    createdAt,
    isShare,
    likesCount,
    liked,
    privacy,
    sharedPost,
    sharesCount,
    topComment,
    user,
  } = post;
  const postId = _id || id;
  const navigate = useNavigate();

  const [showComments, setShowComments] = useState(false);
  const [localLiked, setLocalLiked] = useState(liked || false);
  const [localLikes, setLocalLikes] = useState(likesCount || 0);
  const [localBookmarked, setLocalBookmarked] = useState(bookmarked || false);
  const [localSharesCount] = useState(sharesCount || 0);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { isOpen: isShareOpen, onClose: onShareClose } = useDisclosure();
  const {
    isOpen: isRepostOpen,
    onOpen: onRepostOpen,
    onClose: onRepostClose,
  } = useDisclosure();

  const { userToken } = useContext(AuthContext);
  const { safeProfileInfo } = useContext(ProfileInfoContext);
  const { toggleLike, toggleBookmark } = useContext(QuickActionsContext);
  const queryClient = useQueryClient();

  const currentUserId =
    safeProfileInfo?.data?.user?._id || safeProfileInfo?.data?.user?.id;
  const isOwner =
    currentUserId &&
    (user?._id === currentUserId || user?.id === currentUserId);

  const privacyInfo = PRIVACY_ICON[privacy] || PRIVACY_ICON.public;
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
      onDeleteClose();
    },
  });

  return (
    <>
      <div className="bg-white dark:bg-[#1E2939] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-4 pb-2">
          <div className="flex gap-3 items-start">
            <Link to={`/profile/${user?._id || user?.id}`}>
              <Avatar photo={user?.photo} name={user?.name} />
            </Link>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link
                  to={`/profile/${user?._id || user?.id}`}
                  className="font-extrabold text-sm text-gray-900 dark:text-white hover:text-pink-500 transition-colors"
                >
                  {user?.name}
                </Link>
                {user?.verified && (
                  <MdVerified className="text-blue-500 text-sm" />
                )}
                {isShare && (
                  <Chip
                    size="sm"
                    variant="flat"
                    className="h-4 text-[9px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500"
                  >
                    Shared
                  </Chip>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-gray-400">
                  @{user?.username || user?.name}
                </span>
                <span className="text-gray-300 dark:text-gray-700">·</span>
                <span className="text-[11px] text-gray-400">
                  {timeAgo(createdAt)}
                </span>
                <span className="text-gray-300 dark:text-gray-700">·</span>
                <PrivacyIcon
                  className={`text-[10px] ${privacyInfo.cls}`}
                  title={privacyInfo.label}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(`/posts/${postId}`)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-500 transition-all opacity-0 group-hover:opacity-100"
            >
              <FaExternalLinkAlt className="text-xs" />
            </button>
            <Dropdown>
              <DropdownTrigger>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100">
                  <FaEllipsisH className="text-xs" />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                {isOwner ? (
                  <>
                    <DropdownItem
                      key="open"
                      startContent={
                        <FaExternalLinkAlt className="text-indigo-400" />
                      }
                      onPress={() => navigate(`/posts/${postId}`)}
                    >
                      Open Post
                    </DropdownItem>
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
                  <>
                    <DropdownItem
                      key="open"
                      startContent={
                        <FaExternalLinkAlt className="text-indigo-400" />
                      }
                      onPress={() => navigate(`/posts/${postId}`)}
                    >
                      Open Post
                    </DropdownItem>
                    <DropdownItem
                      key="report"
                      className="text-orange-500"
                      startContent={<FaFlag className="text-orange-400" />}
                    >
                      Report Post
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {body && (
          <p
            className="px-4 pb-3 text-gray-700 dark:text-gray-200 text-sm leading-relaxed cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={() => navigate(`/posts/${postId}`)}
          >
            {body}
          </p>
        )}

        {isShare && sharedPost && <SharedPostPreview sharedPost={sharedPost} />}

        {image && (
          <div
            className="mx-4 mb-3 rounded-2xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => navigate(`/posts/${postId}`)}
          >
            <img
              src={image}
              alt="post"
              className="w-full object-cover max-h-96 hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
        )}

        {topComment && (
          <div className="mx-4 mb-3 px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex gap-2 items-start">
            <Avatar
              photo={topComment.commentCreator?.photo}
              name={topComment.commentCreator?.name}
              size="sm"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-gray-800 dark:text-white mr-1.5">
                {topComment.commentCreator?.name}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                {topComment.content}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105 active:scale-95 ${localLiked ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
            >
              {localLiked ? (
                <FaHeart className="text-sm animate-bounce" />
              ) : (
                <FaRegHeart className="text-sm" />
              )}
              <span>{fmtNum(localLikes)}</span>
            </button>

            <button
              onClick={() => setShowComments(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-500 transition-all hover:scale-105"
            >
              <FaRegComment className="text-sm" />
              <span>{fmtNum(commentsCount)}</span>
            </button>

            <button
              onClick={onRepostOpen}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-500 transition-all hover:scale-105"
            >
              <FaShare className="text-sm" />
              <span>{fmtNum(localSharesCount)}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(`/posts/${postId}`)}
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-400"
            >
              <FaExternalLinkAlt className="text-xs" />
            </button>
            <button
              onClick={handleBookmark}
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${localBookmarked ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-500' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-400'}`}
            >
              {localBookmarked ? (
                <FaBookmark className="text-sm" />
              ) : (
                <FaRegBookmark className="text-sm" />
              )}
            </button>
          </div>
        </div>
      </div>

      {showComments && (
        <Comments post={post} onClose={() => setShowComments(false)} />
      )}

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={() => deleteMutation.mutate()}
        isLoading={deleteMutation.isPending}
        label="post"
      />
      <ShareModal isOpen={isShareOpen} onClose={onShareClose} post={post} />
      <RePostModal
        isOpen={isRepostOpen}
        onClose={onRepostClose}
        post={post}
        userToken={userToken}
      />
    </>
  );
}

export default PostCard;
