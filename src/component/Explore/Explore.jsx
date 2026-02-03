import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCompass,
  FaComment,
  FaUser,
  FaImage,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaPaperPlane,
  FaEllipsisH,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { Button } from '@heroui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import { SiSparkpost } from 'react-icons/si';
import { Helmet } from 'react-helmet-async';

function Explore() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [isSubmittingComment, setIsSubmittingComment] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [deletingPost, setDeletingPost] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setIsLoadingUser(true);
      const token = localStorage.getItem('token');

      if (!token) return;

      const response = await axios.get(
        'https://linked-posts.routemisr.com/users/profile-data',
        {
          headers: {
            token,
          },
        }
      );

      setUserData(response.data.user);
    } catch (error) {
      console.error('Fetch user data error:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  // Fetch posts
  const fetchPosts = async (page = null) => {
    try {
      setIsLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login to view posts');
        return;
      }

      if (page === null) {
        const initialResponse = await axios.get(
          `https://linked-posts.routemisr.com/posts?limit=50&page=1`,
          {
            headers: {
              token,
            },
          }
        );
        page = initialResponse.data.paginationInfo.numberOfPages;
      }

      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts?limit=50&page=${page}`,
        {
          headers: {
            token,
          },
        }
      );

      const reversedPosts = [...response.data.posts].reverse();
      setPosts(reversedPosts);
      setCurrentPage(response.data.paginationInfo.currentPage);
      setTotalPages(response.data.paginationInfo.numberOfPages);
    } catch (error) {
      console.error('Fetch posts error:', error);
      setError(
        error.response?.data?.error || 'Failed to load posts. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPosts();
  }, []);

  // Format date
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
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Toggle comments visibility
  const toggleComments = postId => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle comment submission
  const handleSubmitComment = async (postId, e) => {
    e?.preventDefault();

    const content = newComment[postId]?.trim();
    if (!content) return;

    try {
      setIsSubmittingComment(prev => ({ ...prev, [postId]: true }));

      const token = localStorage.getItem('token');

      await axios.post(
        'https://linked-posts.routemisr.com/comments',
        {
          content,
          post: postId,
        },
        {
          headers: {
            token,
            'Content-Type': 'application/json',
          },
        }
      );

      setNewComment(prev => ({ ...prev, [postId]: '' }));

      // Add comment locally to avoid refetching
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post._id === postId) {
            const newCommentObj = {
              _id: Date.now().toString(),
              content,
              commentCreator: {
                _id: currentUserId,
                name: userData?.name || 'You',
                photo: userData?.photo || '',
              },
              createdAt: new Date().toISOString(),
            };
            return {
              ...post,
              comments: [newCommentObj, ...(post.comments || [])],
            };
          }
          return post;
        })
      );

      // Ensure comments are expanded
      setExpandedComments(prev => ({ ...prev, [postId]: true }));
    } catch (error) {
      console.error('Comment submission error:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmittingComment(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Handle comment update
  const handleUpdateComment = async (commentId, postId) => {
    if (!editCommentContent.trim()) return;

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        {
          content: editCommentContent,
        },
        {
          headers: {
            token,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update comment locally
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.map(comment =>
                comment._id === commentId
                  ? { ...comment, content: editCommentContent }
                  : comment
              ),
            };
          }
          return post;
        })
      );

      setEditingComment(null);
      setEditCommentContent('');
    } catch (error) {
      console.error('Update comment error:', error);
      alert('Failed to update comment. Please try again.');
    }
  };

  // Handle comment delete
  const handleDeleteComment = async (commentId, postId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete(
        `https://linked-posts.routemisr.com/comments/${commentId}`,
        {
          headers: {
            token,
          },
        }
      );

      // Delete comment locally
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.filter(
                comment => comment._id !== commentId
              ),
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Delete comment error:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  // Handle post delete
  const handleDeletePost = async postId => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      setDeletingPost(postId);
      const token = localStorage.getItem('token');

      await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
          token,
        },
      });

      // Remove post from local state
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Delete post error:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeletingPost(null);
    }
  };

  // Handle page change
  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPosts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get current user ID from token
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

  return (
    <>
      <Helmet>
        <title>Explore - Nexora</title>
        <meta name="description" content="Explore posts on Nexora" />
      </Helmet>
      <div className="w-full min-h-screen py-6 px-4">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <div className="sticky top-6">
                {!isLoadingUser && userData && (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-1 mb-4">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                          {userData.photo &&
                          !userData.photo.includes('undefined') ? (
                            <img
                              src={userData.photo}
                              alt={userData.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-indigo-600 dark:text-indigo-400 text-3xl" />
                          )}
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {userData.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {userData.email}
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Gender
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-white capitalize">
                            {userData.gender}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Joined
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            {new Date(userData.createdAt).toLocaleDateString(
                              'en-US',
                              { month: 'short', year: 'numeric' }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                      <Link to="/explore/mine" className="mt-6 block w-full">
                        <Button
                          color="secondary"
                          className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                          <SiSparkpost />
                          My Posts
                        </Button>
                      </Link>
                      <Link to="/create-post" className="mt-6 block w-full">
                        <Button
                          color="primary"
                          className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                          <FaEdit />
                          Create Post
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="mb-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                        <FaCompass className="text-2xl text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          Explore Feed
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Discover amazing content
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    Loading posts...
                  </p>
                </div>
              )}

              {error && !isLoading && (
                <div className="bg-red-50 dark:bg-red-900/20 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-3 mb-2">
                    <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-xl" />
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                      Error Loading Posts
                    </h3>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                  <Button
                    color="danger"
                    variant="flat"
                    className="mt-4"
                    onClick={() => fetchPosts(currentPage)}
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {!isLoading && !error && posts.length > 0 && (
                <div className="space-y-6">
                  {posts.map(post => (
                    <div
                      key={post._id}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="p-5 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
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
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                              {post.user.name}
                            </h3>
                            {currentUserId === post.user._id && (
                              <span className="px-2 py-0.5 text-[10px] font-semibold bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-full">
                                Your Post
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <FaClock className="text-[10px]" />
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                        {currentUserId === post.user._id ? (
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            disabled={deletingPost === post._id}
                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                            title="Delete post"
                          >
                            {deletingPost === post._id ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                        ) : (
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <FaEllipsisH />
                          </button>
                        )}
                      </div>

                      {/* Post Body */}
                      <div className="px-5 pb-4">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {post.body}
                        </p>
                      </div>

                      {post.image && (
                        <div className="w-full">
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-full h-auto max-h-[500px] object-cover"
                          />
                        </div>
                      )}

                      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">
                            {post.comments?.length || 0} comments
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 px-2 py-2 flex gap-2">
                        <Button
                          onPress={() => toggleComments(post._id)}
                          className="w-full py-2.5 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 rounded-xl transition-all font-medium"
                        >
                          <FaComment />
                          <span className="text-sm">Comment</span>
                        </Button>
                        <Link to={`/explore/${post._id}`}>
                          <Button className="w-full py-2.5 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 rounded-xl transition-all font-medium">
                            <IoOpenOutline />
                            <span className="text-sm">Open</span>
                          </Button>
                        </Link>
                      </div>

                      {expandedComments[post._id] && (
                        <div className="border-t border-gray-200 dark:border-gray-700 bg-linear-to-br from-gray-50 to-indigo-50/30 dark:from-gray-900/50 dark:to-indigo-900/10 px-5 py-4">
                          <div className="flex gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-0.5 shrink-0">
                              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
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
                            <form
                              onSubmit={e => handleSubmitComment(post._id, e)}
                              className="flex-1 flex gap-2"
                            >
                              <input
                                type="text"
                                value={newComment[post._id] || ''}
                                onChange={e =>
                                  setNewComment(prev => ({
                                    ...prev,
                                    [post._id]: e.target.value,
                                  }))
                                }
                                placeholder="Write a comment..."
                                className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-700 shadow-sm"
                              />
                              <button
                                type="submit"
                                disabled={
                                  !newComment[post._id]?.trim() ||
                                  isSubmittingComment[post._id]
                                }
                                className="p-3 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:shadow-none"
                              >
                                {isSubmittingComment[post._id] ? (
                                  <FaSpinner className="animate-spin" />
                                ) : (
                                  <FaPaperPlane />
                                )}
                              </button>
                            </form>
                          </div>

                          {/* Comments List */}
                          {post.comments && post.comments.length > 0 && (
                            <div className="space-y-3">
                              {[...post.comments].reverse().map(comment => (
                                <div
                                  key={comment._id}
                                  className="flex gap-3 group"
                                >
                                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-0.5 shrink-0">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                      {comment.commentCreator?.photo &&
                                      !comment.commentCreator.photo.includes(
                                        'undefined'
                                      ) ? (
                                        <img
                                          src={comment.commentCreator.photo}
                                          alt={comment.commentCreator.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <FaUser className="text-indigo-600 dark:text-indigo-400" />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    {editingComment === comment._id ? (
                                      <div className="flex gap-2">
                                        <input
                                          type="text"
                                          value={editCommentContent}
                                          onChange={e =>
                                            setEditCommentContent(
                                              e.target.value
                                            )
                                          }
                                          className="flex-1 px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200 dark:border-gray-700"
                                          autoFocus
                                        />
                                        <button
                                          onClick={() =>
                                            handleUpdateComment(
                                              comment._id,
                                              post._id
                                            )
                                          }
                                          className="px-4 py-2 text-xs bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 font-medium"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => {
                                            setEditingComment(null);
                                            setEditCommentContent('');
                                          }}
                                          className="px-4 py-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                                          <div className="flex items-start justify-between mb-1">
                                            <p className="text-sm font-bold text-gray-800 dark:text-white">
                                              {comment.commentCreator?.name ||
                                                'Unknown'}
                                            </p>
                                            {currentUserId ===
                                              comment.commentCreator?._id && (
                                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                  onClick={() => {
                                                    setEditingComment(
                                                      comment._id
                                                    );
                                                    setEditCommentContent(
                                                      comment.content
                                                    );
                                                  }}
                                                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                >
                                                  <FaEdit className="text-xs" />
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    handleDeleteComment(
                                                      comment._id,
                                                      post._id
                                                    )
                                                  }
                                                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
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
                                        <div className="flex items-center gap-2 mt-1.5 px-4">
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
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          color="primary"
                          variant="flat"
                          size="sm"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="bg-linear-to-r from-indigo-600 to-purple-600 text-white disabled:from-gray-300 disabled:to-gray-400"
                        >
                          Newer Posts
                        </Button>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Page {currentPage} of {totalPages}
                          </span>
                        </div>

                        <Button
                          color="primary"
                          variant="flat"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="bg-linear-to-r from-indigo-600 to-purple-600 text-white disabled:from-gray-300 disabled:to-gray-400"
                        >
                          Older Posts
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !error && posts.length === 0 && (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 text-center border border-gray-200/50 dark:border-gray-700/50">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    <FaImage className="text-4xl text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    No Posts Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Be the first to share something amazing!
                  </p>
                  <Link to="/create-post">
                    <Button
                      color="primary"
                      className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Create First Post
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Sidebar - Stats & Info */}
            <div className="lg:col-span-3">
              <div className="sticky top-6 space-y-4">
                {/* Trending Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    Trending
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        #Technology
                      </span>
                      <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">
                        12.5k
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        #Design
                      </span>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                        8.2k
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        #Programming
                      </span>
                      <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-1 rounded-full">
                        6.1k
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Quick Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">✨</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Use images to get more engagement
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">💬</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Reply to comments to build community
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🎯</span>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Post regularly to stay visible
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
