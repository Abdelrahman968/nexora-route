import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaImage,
  FaPaperPlane,
  FaTimes,
  FaFileImage,
  FaEdit,
  FaArrowLeft,
} from 'react-icons/fa';
import { Button } from '@heroui/react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function CreatePost() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle image selection
  const handleImageChange = e => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setImage(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Handle post creation
  const handleCreatePost = async e => {
    e.preventDefault();

    if (!body.trim()) {
      setError('Post content is required');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login first');
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('body', body);
      if (image) {
        formData.append('image', image);
      }

      await axios.post('https://linked-posts.routemisr.com/posts', formData, {
        headers: {
          token,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setBody('');
      setImage(null);
      setImagePreview(null);

      setTimeout(() => {
        navigate('/explore');
      }, 1500);
    } catch (error) {
      console.error('Create post error:', error);
      setError(
        error.response?.data?.error ||
          'Failed to create post. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Post - Nexora</title>
        <meta name="description" content="Create a new post on Nexora" />
      </Helmet>
      <div className="w-full py-8 px-4">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium mb-4 transition-all"
            >
              <FaArrowLeft />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 dark:bg-indigo-500 p-3 rounded-xl">
                <FaEdit className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Create Post
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your thoughts with the community
                </p>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <form onSubmit={handleCreatePost}>
              {/* Post Content Area */}
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  What's on your mind?
                </label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="Write something interesting..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-all"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {body.length} characters
                  </p>
                  {body.length > 0 && (
                    <p
                      className={`text-xs ${
                        body.length < 10 ? 'text-orange-500' : 'text-green-500'
                      }`}
                    >
                      {body.length < 10 ? 'Add more content' : 'Looking good!'}
                    </p>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="px-6 pb-6">
                  <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}

              {/* Actions Bar */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between gap-4">
                  {/* Add Image Button */}
                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer transition-colors bg-white dark:bg-gray-700">
                    <FaImage className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {image ? 'Change Image' : 'Add Image'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>

                  {/* Submit Button */}
                  <Button
                    color="primary"
                    variant="flat"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading || !body.trim()}
                    className="px-6"
                  >
                    <FaPaperPlane />
                    Publish Post
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-6 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-300">
                    {error}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mx-6 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    ✓ Post created successfully! Redirecting...
                  </p>
                </div>
              )}
            </form>

            {/* Guidelines */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-indigo-50 dark:bg-indigo-900/20">
              <div className="flex items-start gap-3">
                <FaFileImage className="text-indigo-600 dark:text-indigo-400 text-xl mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 mb-2">
                    Posting Guidelines
                  </h3>
                  <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1">
                    <li>• Be respectful and considerate to others</li>
                    <li>• Keep your content appropriate and safe</li>
                    <li>• Image size should not exceed 5MB</li>
                    <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              💡 Tips for Great Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                  <span className="text-2xl">✍️</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Be Clear
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Express your ideas clearly and concisely
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <span className="text-2xl">📸</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Use Images
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Visual content gets more engagement
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Stay Relevant
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Share content that matters to your audience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Be Authentic
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Share your genuine thoughts and experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
