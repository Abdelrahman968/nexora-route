import { useState, useContext, useRef } from 'react';
import {
  Button,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from '@heroui/react';
import {
  FaReply,
  FaEllipsisH,
  FaPaperPlane,
  FaTimes,
  FaTrash,
  FaLink,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaRegCopy,
  FaCheck,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';
import { CommentContext } from '../../context/CommentContext';

function Avatar({ photo, name, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-11 h-11 text-base',
  };
  if (photo?.startsWith('http'))
    return (
      <img
        src={photo}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover shrink-0 ring-2 ring-white dark:ring-gray-800`}
      />
    );
  return (
    <div
      className={`${sizes[size]} rounded-full bg-linear-to-br from-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0 ring-2 ring-white dark:ring-gray-800`}
    >
      {name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
}

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  label = 'comment',
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      hideCloseButton
      classNames={{
        base: 'bg-white dark:bg-[#1a2335] rounded-3xl border border-gray-100 dark:border-gray-800',
        backdrop: 'bg-black/60 backdrop-blur-sm',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-2">
                <FaTrash className="text-red-500 text-xl" />
              </div>
              <h3 className="text-center font-extrabold text-gray-900 dark:text-white text-lg">
                Delete {label}?
              </h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-normal">
                This action cannot be undone.
              </p>
            </ModalHeader>
            <ModalFooter className="gap-2 pt-2">
              <Button
                variant="flat"
                radius="full"
                className="flex-1 font-semibold"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                radius="full"
                className="flex-1 bg-red-500 text-white font-bold hover:bg-red-600"
                onPress={onConfirm}
                isLoading={isLoading}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export function ShareModal({ isOpen, onClose, post }) {
  const [copied, setCopied] = useState(false);
  const postUrl = `${window.location.origin}/posts/${post?._id || post?.id}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      icon: FaTwitter,
      label: 'X / Twitter',
      color: 'bg-black text-white',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`,
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      color: 'bg-green-500 text-white',
      href: `https://wa.me/?text=${encodeURIComponent(postUrl)}`,
    },
    {
      icon: FaFacebook,
      label: 'Facebook',
      color: 'bg-blue-600 text-white',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      hideCloseButton
      classNames={{
        base: 'bg-white dark:bg-[#1a2335] rounded-3xl border border-gray-100 dark:border-gray-800',
        backdrop: 'bg-black/60 backdrop-blur-sm',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center justify-between pb-2">
              <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
                Share Post
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all"
              >
                <FaTimes className="text-xs" />
              </button>
            </ModalHeader>
            <ModalBody className="py-3 gap-3">
              <div className="grid grid-cols-3 gap-2">
                {shareOptions.map(opt => (
                  <a
                    key={opt.label}
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${opt.color} hover:opacity-90 hover:scale-105 transition-all`}
                  >
                    <opt.icon className="text-xl" />
                    <span className="text-[10px] font-bold">{opt.label}</span>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <FaLink className="text-gray-400 text-sm shrink-0" />
                <span className="flex-1 text-xs text-gray-600 dark:text-gray-400 truncate">
                  {postUrl}
                </span>
                <button
                  onClick={copyLink}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-xs" /> Copied!
                    </>
                  ) : (
                    <>
                      <FaRegCopy className="text-xs" /> Copy
                    </>
                  )}
                </button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

function CommentRow({ comment, postId, currentUserId, onReply }) {
  const { deleteComment, isDeletingComment, toggleCommentLike, useReplies } =
    useContext(CommentContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [showReplies, setShowReplies] = useState(false);

  const isOwner =
    currentUserId &&
    (comment.commentCreator?._id === currentUserId ||
      comment.commentCreator?.id === currentUserId);
  const creator = comment.commentCreator || {};

  const repliesQuery = useReplies(postId, comment._id, 5);
  const replies =
    repliesQuery.data?.pages.flatMap(p => p.data?.replies ?? []) ?? [];

  const handleLike = () => {
    setLiked(p => !p);
    setLikesCount(p => (liked ? p - 1 : p + 1));
    toggleCommentLike(postId, comment._id);
  };

  const handleShowReplies = () => {
    setShowReplies(p => !p);
  };

  return (
    <>
      <div className="flex gap-3 group">
        <Avatar photo={creator.photo} name={creator.name} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 dark:bg-gray-800/70 rounded-2xl rounded-tl-sm px-4 py-2.5 inline-block max-w-full">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-bold text-xs text-gray-900 dark:text-white">
                {creator.name || 'Unknown'}
              </span>
              {creator.verified && (
                <MdVerified className="text-blue-500 text-xs" />
              )}
              <span className="text-[10px] text-gray-400">
                @{creator.username || creator.name}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
              {comment.content}
            </p>
            {comment.image && (
              <img
                src={comment.image}
                alt="comment"
                className="mt-2 max-h-40 rounded-xl object-cover"
              />
            )}
          </div>

          <div className="flex items-center gap-3 mt-1.5 ml-1">
            <span className="text-[10px] text-gray-400">
              {timeAgo(comment.createdAt)}
            </span>
            <button
              onClick={handleLike}
              className={`text-[11px] font-bold transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}
            >
              {liked ? '❤️' : 'Like'}{' '}
              {likesCount > 0 && <span>{likesCount}</span>}
            </button>
            <button
              onClick={() => onReply(comment._id, creator.name)}
              className="text-[11px] font-bold text-gray-500 hover:text-pink-500 transition-colors"
            >
              Reply
            </button>
            {(comment.repliesCount > 0 || replies.length > 0) && (
              <button
                onClick={handleShowReplies}
                className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                {showReplies
                  ? 'Hide'
                  : `${comment.repliesCount || replies.length} replies`}
              </button>
            )}
          </div>

          {/* Replies */}
          {showReplies && (
            <div className="mt-3 space-y-2 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
              {repliesQuery.isLoading ? (
                <div className="flex justify-center py-2">
                  <Spinner size="sm" />
                </div>
              ) : (
                replies.map(reply => (
                  <div key={reply._id || reply.id} className="flex gap-2">
                    <Avatar
                      photo={reply.commentCreator?.photo}
                      name={reply.commentCreator?.name}
                      size="sm"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-800/70 rounded-2xl rounded-tl-sm px-3 py-2 inline-block">
                        <span className="font-bold text-xs text-gray-900 dark:text-white mr-1">
                          {reply.commentCreator?.name}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {reply.content}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 ml-1">
                        {timeAgo(reply.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {repliesQuery.hasNextPage && (
                <button
                  onClick={() => repliesQuery.fetchNextPage()}
                  className="text-[11px] font-bold text-indigo-500 hover:text-indigo-600 ml-1"
                >
                  {repliesQuery.isFetchingNextPage
                    ? 'Loading...'
                    : 'Load more replies'}
                </button>
              )}
            </div>
          )}
        </div>

        {isOwner && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1">
            <Dropdown>
              <DropdownTrigger>
                <button className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-all">
                  <FaEllipsisH className="text-[10px]" />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  className="text-red-500"
                  onPress={onDeleteOpen}
                  startContent={<FaTrash className="text-xs" />}
                >
                  Delete comment
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
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

function Comments({ post, onClose }) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const textareaRef = useRef(null);

  const { safeProfileInfo } = useContext(ProfileInfoContext);
  const {
    useComments,
    createComment,
    isCreatingComment,
    createReply,
    isCreatingReply,
  } = useContext(CommentContext);

  const currentUser = safeProfileInfo?.data?.user || {};
  const postId = post?._id || post?.id;

  const commentsQuery = useComments(postId, 15);
  const comments =
    commentsQuery.data?.pages.flatMap(p => p.data?.comments ?? []) ?? [];
  const totalComments =
    commentsQuery.data?.pages[0]?.meta?.pagination?.total ?? comments.length;

  const handleReply = (commentId, name) => {
    setReplyingTo({ commentId, name });
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const submitComment = () => {
    if (replyingTo) {
      if (!replyText.trim()) return;
      createReply(postId, replyingTo.commentId, { content: replyText.trim() });
      setReplyText('');
      setReplyingTo(null);
    } else {
      if (!newComment.trim()) return;
      createComment(postId, { content: newComment.trim() });
      setNewComment('');
    }
  };

  const isPending = isCreatingComment || isCreatingReply;
  const inputValue = replyingTo ? replyText : newComment;
  const hasInput = inputValue.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full sm:max-w-xl bg-white dark:bg-[#1a2335] sm:rounded-3xl rounded-t-3xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden max-h-[92vh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <h3 className="font-extrabold text-lg bg-linear-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
              Comments
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalComments} comment{totalComments !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Post preview */}
        <div className="flex gap-3 items-start px-5 py-3 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <Avatar photo={post?.user?.photo} name={post?.user?.name} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-gray-900 dark:text-white">
                {post?.user?.name}
              </span>
              <span className="text-[10px] text-gray-400">
                {timeAgo(post?.createdAt)}
              </span>
            </div>
            {post?.body && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
                {post.body}
              </p>
            )}
          </div>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {commentsQuery.isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Spinner size="lg" color="primary" />
              <p className="text-sm text-gray-400">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <span className="text-5xl">💬</span>
              <p className="font-bold text-gray-500 dark:text-gray-400">
                No comments yet
              </p>
              <p className="text-sm text-gray-400">Be the first to comment!</p>
            </div>
          ) : (
            <>
              {comments.map(comment => (
                <CommentRow
                  key={comment._id}
                  comment={comment}
                  postId={postId}
                  currentUserId={currentUser._id || currentUser.id}
                  onReply={handleReply}
                />
              ))}
              {commentsQuery.hasNextPage && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => commentsQuery.fetchNextPage()}
                    className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
                    {commentsQuery.isFetchingNextPage
                      ? 'Loading...'
                      : 'Load more comments'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Reply banner */}
        {replyingTo && (
          <div className="flex items-center justify-between px-5 py-2 bg-indigo-50 dark:bg-indigo-900/20 border-t border-indigo-100 dark:border-indigo-800 shrink-0">
            <div className="flex items-center gap-2">
              <FaReply className="text-indigo-400 text-xs" />
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Replying to {replyingTo.name}
              </span>
            </div>
            <button
              onClick={() => {
                setReplyingTo(null);
                setReplyText('');
              }}
              className="text-indigo-400 hover:text-indigo-600 transition-colors"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        )}

        {/* Compose */}
        <div className="flex gap-3 items-end px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2335] shrink-0">
          <Avatar photo={currentUser.photo} name={currentUser.name} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-end gap-2 bg-gray-100 dark:bg-gray-800/60 rounded-2xl px-3 py-2">
              <Textarea
                ref={textareaRef}
                placeholder={
                  replyingTo
                    ? `Reply to ${replyingTo.name}...`
                    : 'Write a comment...'
                }
                value={inputValue}
                onChange={e =>
                  replyingTo
                    ? setReplyText(e.target.value)
                    : setNewComment(e.target.value)
                }
                minRows={1}
                maxRows={4}
                classNames={{
                  input: 'text-sm bg-transparent',
                  inputWrapper:
                    'bg-transparent border-none shadow-none p-0 min-h-0',
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submitComment();
                  }
                }}
              />
              <button
                onClick={submitComment}
                disabled={isPending || !hasInput}
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${hasInput ? 'bg-linear-to-r from-pink-500 to-indigo-500 text-white hover:scale-110 shadow-lg' : 'bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                {isPending ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <FaPaperPlane className="text-xs" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
