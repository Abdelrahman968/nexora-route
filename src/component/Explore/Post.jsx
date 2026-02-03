import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaPaperPlane,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaComment,
} from 'react-icons/fa';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const getCurrentUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user;
    } catch {
      return null;
    }
  };
  const currentUserId = getCurrentUserId();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get(
        'https://linked-posts.routemisr.com/users/profile-data',
        { headers: { token } }
      );
      setUserData(res.data.user);
    } catch (err) {
      console.error('Fetch user error:', err);
    }
  };

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view this post.');
        return;
      }
      const res = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        { headers: { token } }
      );
      setPost(res.data.post);
    } catch (err) {
      console.error('Fetch post error:', err);
      setError(err.response?.data?.error || 'Failed to load post.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPost();
  }, [id]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const gradientBorder = {
    background: 'linear-gradient(135deg, #6366f1, #9333ea)',
  };

  const handleSubmitComment = async e => {
    e?.preventDefault();
    const content = newComment.trim();
    if (!content) return;

    try {
      setIsSubmittingComment(true);
      const token = localStorage.getItem('token');

      await axios.post(
        'https://linked-posts.routemisr.com/comments',
        { content, post: id },
        { headers: { token, 'Content-Type': 'application/json' } }
      );

      setNewComment('');
      await fetchPost();
    } catch (err) {
      console.error('Comment submit error:', err);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleUpdateComment = async commentId => {
    if (!editCommentContent.trim()) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios({
        method: 'put',
        url: `https://linked-posts.routemisr.com/comments/${commentId}`,
        headers: { token, 'Content-Type': 'application/json' },
        data: { content: editCommentContent },
      });

      setPost(prev => ({
        ...prev,
        comments: prev.comments.map(c =>
          c._id === commentId ? { ...c, content: editCommentContent } : c
        ),
      }));

      setEditingComment(null);
      setEditCommentContent('');
    } catch (err) {
      console.error('Update comment error:', err);
      alert('Failed to update comment.');
    }
  };

  const handleDeleteComment = async commentId => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios({
        method: 'delete',
        url: `https://linked-posts.routemisr.com/comments/${commentId}`,
        headers: { token },
        data: { post: id },
      });

      // Remove locally
      setPost(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c._id !== commentId),
      }));
    } catch (err) {
      console.error('Delete comment error:', err);
      alert('Failed to delete comment.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Post Details - Nexora</title>
        <meta name="description" content="Post Details on Nexora" />
      </Helmet>
      <div className="w-full min-h-screen py-6 px-4">
        <div className="mx-auto w-full max-w-2xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-5 transition-colors cursor-pointer bg-transparent border-none"
          >
            <FaArrowLeft />
            Back to Explore
          </button>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin absolute top-0"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Loading post...
              </p>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-50 dark:bg-red-900/20 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3 mb-2">
                <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-xl" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                  Error
                </h3>
              </div>
              <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                {error}
              </p>
              <button
                onClick={fetchPost}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors cursor-pointer border-none"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && post && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
              <div className="p-5 flex items-center gap-3">
                <div
                  className="rounded-full p-0.5 shrink-0"
                  style={{ ...gradientBorder, width: 52, height: 52 }}
                >
                  <div
                    className="rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden"
                    style={{ width: 44, height: 44 }}
                  >
                    {post.user.photo &&
                    !post.user.photo.includes('undefined') ? (
                      <img
                        src={post.user.photo}
                        alt={post.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                    {post.user.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <FaClock className="text-[10px]" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 pb-4">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {post.body}
                </p>
              </div>

              {/* Image */}
              {post.image && (
                <div className="w-full">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              )}

              {/* Comment count bar */}
              <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <FaComment className="text-[13px]" />
                  <span className="font-medium">
                    {post.comments?.length || 0}{' '}
                    {post.comments?.length === 1 ? 'comment' : 'comments'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 bg-linear-to-br from-gray-50 to-indigo-50/30 dark:from-gray-900/50 dark:to-indigo-900/10 px-5 py-5">
                <form
                  onSubmit={handleSubmitComment}
                  className="flex gap-3 mb-5"
                >
                  <div
                    className="rounded-full p-0.5 shrink-0"
                    style={{ ...gradientBorder, width: 40, height: 40 }}
                  >
                    <div
                      className="rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden"
                      style={{ width: 32, height: 32 }}
                    >
                      {userData?.photo &&
                      !userData.photo.includes('undefined') ? (
                        <img
                          src={userData.photo}
                          alt="You"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-indigo-600 dark:text-indigo-400 text-sm" />
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-700 shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmittingComment}
                    className="p-3 rounded-full text-white transition-all shadow-lg disabled:shadow-none cursor-pointer border-none"
                    style={
                      !newComment.trim() || isSubmittingComment
                        ? { background: '#9ca3af' }
                        : {
                            background:
                              'linear-gradient(to right, #4f46e5, #9333ea)',
                          }
                    }
                  >
                    {isSubmittingComment ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaPaperPlane />
                    )}
                  </button>
                </form>

                {/* Comments list */}
                {post.comments && post.comments.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {[...post.comments].reverse().map(comment => (
                      <div key={comment._id} className="flex gap-3 group">
                        {/* Avatar */}
                        <div
                          className="rounded-full p-0.5 shrink-0"
                          style={{ ...gradientBorder, width: 40, height: 40 }}
                        >
                          <div
                            className="rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden"
                            style={{ width: 32, height: 32 }}
                          >
                            {comment.commentCreator.photo &&
                            !comment.commentCreator.photo.includes(
                              'undefined'
                            ) ? (
                              <img
                                src={comment.commentCreator.photo}
                                alt={comment.commentCreator.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-indigo-600 dark:text-indigo-400 text-sm" />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {editingComment === comment._id ? (
                            /* Edit mode */
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editCommentContent}
                                onChange={e =>
                                  setEditCommentContent(e.target.value)
                                }
                                className="flex-1 px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-700"
                                autoFocus
                              />
                              <button
                                onClick={() => handleUpdateComment(comment._id)}
                                className="px-4 py-2 text-xs font-semibold text-white rounded-full cursor-pointer border-none"
                                style={{
                                  background:
                                    'linear-gradient(to right, #4f46e5, #9333ea)',
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingComment(null);
                                  setEditCommentContent('');
                                }}
                                className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full cursor-pointer border-none transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            /* View mode */
                            <>
                              <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                                <div className="flex items-start justify-between mb-1">
                                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                                    {comment.commentCreator.name}
                                  </p>
                                  {currentUserId ===
                                    comment.commentCreator._id && (
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => {
                                          setEditingComment(comment._id);
                                          setEditCommentContent(
                                            comment.content
                                          );
                                        }}
                                        className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors bg-transparent border-none cursor-pointer p-0"
                                      >
                                        <FaEdit className="text-xs" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteComment(comment._id)
                                        }
                                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-0"
                                      >
                                        <FaTrash className="text-xs" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {comment.content}
                                </p>
                              </div>
                              <div className="px-4 mt-1.5">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty comments */
                  <div className="flex flex-col items-center py-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                      <FaComment className="text-indigo-500 dark:text-indigo-400 text-xl" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      No comments yet
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Be the first to comment!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
