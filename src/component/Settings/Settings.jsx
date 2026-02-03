import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaShieldAlt,
  FaCamera,
  FaUser,
  FaCog,
  FaImage,
  FaUpload,
} from 'react-icons/fa';

import { useForm } from 'react-hook-form';
import { Button } from '@heroui/react';
import axios from 'axios';
import avatar from '../../assets/avatar.png';
import { Helmet } from 'react-helmet-async';

function Settings() {
  const [isVisibleOld, setIsVisibleOld] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Profile photo states
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [photoSuccess, setPhotoSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState, watch, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get(
          'https://linked-posts.routemisr.com/users/profile-data',
          {
            headers: { token },
          }
        );
        setProfile(res.data);
        setPreviewUrl(res.data.user?.photo || avatar);
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle file selection
  const handleFileChange = e => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file size (4MB = 4 * 1024 * 1024 bytes)
    if (file.size > 4 * 1024 * 1024) {
      setPhotoError('File size must be less than 4MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file');
      return;
    }

    setSelectedFile(file);
    setPhotoError('');

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle photo upload
  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      setPhotoError('Please select a photo first');
      return;
    }

    try {
      setPhotoLoading(true);
      setPhotoError('');

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('photo', selectedFile);

      await axios.put(
        'https://linked-posts.routemisr.com/users/upload-photo',
        formData,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setPhotoSuccess(true);
      setSelectedFile(null);

      const res = await axios.get(
        'https://linked-posts.routemisr.com/users/profile-data',
        {
          headers: { token },
        }
      );
      setProfile(res.data);
      setPreviewUrl(res.data.user?.photo || avatar);

      setTimeout(() => {
        setPhotoSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Photo upload error:', error);
      setPhotoError(
        error.response?.data?.error ||
          'Failed to upload photo. Please try again.'
      );
    } finally {
      setPhotoLoading(false);
    }
  };

  const parseServerError = error => {
    if (!error) return 'Something went wrong';

    if (error.includes('password') && error.includes('regex')) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (error.includes('incorrect') || error.includes('wrong')) {
      return 'Current password is incorrect';
    }

    if (error.includes('same')) {
      return 'New password must be different from current password';
    }

    return 'Failed to change password. Please try again.';
  };

  const handleChangePassword = async data => {
    try {
      setIsLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please login first');
        navigate('/login');
        return;
      }

      const response = await axios.patch(
        'https://linked-posts.routemisr.com/users/change-password',
        {
          password: data.password,
          newPassword: data.newPassword,
        },
        {
          headers: { token },
        }
      );

      setSuccess(true);
      reset();
      console.log('Response:', response.data);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Change password error:', error);
      setError(parseServerError(error.response?.data?.error || error.message));
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
      setTimeout(() => {
        setIsLoading(false);
        if (!success) {
          setError('');
        }
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Settings - Nexora</title>
        <meta name="description" content="Settings - Nexora" />
      </Helmet>
      <div className="w-full py-8 px-4">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-600 dark:bg-indigo-500 p-3 rounded-xl">
                <FaCog className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Settings
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-6">
                <div className="p-4 bg-linear-to-r from-indigo-600 to-purple-600">
                  <h2 className="text-white font-semibold text-lg">
                    Account Settings
                  </h2>
                </div>
                <nav className="p-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'profile'
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <FaUser className="text-xl" />
                    <span>Profile Photo</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mt-1 cursor-pointer ${
                      activeTab === 'security'
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <FaShieldAlt className="text-xl" />
                    <span>Security</span>
                  </button>
                </nav>
                <div className="text-center my-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-all"
                  >
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                {/* Profile Photo Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                        Profile Photo
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Upload and manage your profile picture
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column - Photo Preview */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          <img
                            src={previewUrl || avatar}
                            alt="Profile"
                            className="w-48 h-48 rounded-2xl object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
                          />
                          <div className="absolute -bottom-3 -right-3 bg-indigo-600 rounded-full p-4 shadow-lg">
                            <FaCamera className="text-white text-2xl" />
                          </div>
                        </div>

                        {profile && (
                          <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {profile.user?.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {profile.user?.email}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Upload Controls */}
                      <div className="flex flex-col gap-4">
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors bg-gray-50 dark:bg-gray-700/50">
                          <div className="flex flex-col items-center justify-center">
                            <FaImage className="text-5xl text-gray-400 dark:text-gray-500 mb-3" />
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                              Click to upload
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              PNG, JPG, GIF up to 4MB
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>

                        {selectedFile && (
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
                            <p className="text-sm text-indigo-800 dark:text-indigo-300 font-medium truncate">
                              📎 {selectedFile.name}
                            </p>
                          </div>
                        )}

                        <Button
                          color="primary"
                          variant="flat"
                          className="w-full"
                          onPress={handlePhotoUpload}
                          isLoading={photoLoading}
                          disabled={!selectedFile || photoLoading}
                        >
                          <FaUpload />
                          Upload Photo
                        </Button>

                        {photoError && (
                          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                            <p className="text-sm text-red-800 dark:text-red-300">
                              {photoError}
                            </p>
                          </div>
                        )}

                        {photoSuccess && (
                          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">
                              ✓ Profile photo updated successfully!
                            </p>
                          </div>
                        )}

                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                          <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium mb-2">
                            Photo Requirements:
                          </p>
                          <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1">
                            <li>• Maximum file size: 4MB</li>
                            <li>• Supported formats: JPG, PNG, GIF</li>
                            <li>• Recommended: Square images work best</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab (Change Password) */}
                {activeTab === 'security' && (
                  <div>
                    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-indigo-600 p-3 rounded-xl">
                          <FaKey className="text-2xl text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Change Password
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Update your account password to keep it secure
                          </p>
                        </div>
                      </div>
                    </div>

                    <form
                      onSubmit={handleSubmit(handleChangePassword)}
                      className="space-y-5"
                    >
                      {/* Current Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Current Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={isVisibleOld ? 'text' : 'password'}
                            placeholder="Enter current password"
                            className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                            {...register('password', {
                              required: 'Current password is required',
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            onClick={() => setIsVisibleOld(!isVisibleOld)}
                          >
                            {isVisibleOld ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {formState.errors.password && (
                          <p className="text-red-500 text-xs">
                            {formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={isVisibleNew ? 'text' : 'password'}
                            placeholder="Enter new password"
                            className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                            {...register('newPassword', {
                              required: 'New password is required',
                              minLength: {
                                value: 8,
                                message:
                                  'Password must be at least 8 characters',
                              },
                              pattern: {
                                value:
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                message:
                                  'Password must include uppercase, lowercase, number, and special character',
                              },
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            onClick={() => setIsVisibleNew(!isVisibleNew)}
                          >
                            {isVisibleNew ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {formState.errors.newPassword && (
                          <p className="text-red-500 text-xs">
                            {formState.errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      {/* Confirm New Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={isVisibleConfirm ? 'text' : 'password'}
                            placeholder="Confirm new password"
                            className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                            {...register('confirmPassword', {
                              required: 'Please confirm your new password',
                              validate: value =>
                                value === newPassword ||
                                'Passwords do not match',
                            })}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            onClick={() =>
                              setIsVisibleConfirm(!isVisibleConfirm)
                            }
                          >
                            {isVisibleConfirm ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        {formState.errors.confirmPassword && (
                          <p className="text-red-500 text-xs">
                            {formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      {/* Password Requirements Info */}
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                        <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium mb-2">
                          Password must contain:
                        </p>
                        <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1">
                          <li>• At least 8 characters</li>
                          <li>• One uppercase letter (A-Z)</li>
                          <li>• One lowercase letter (a-z)</li>
                          <li>• One number (0-9)</li>
                          <li>• One special character (@$!%*?&)</li>
                        </ul>
                      </div>

                      {/* Change Password Button */}
                      <Button
                        color="primary"
                        variant="flat"
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                        disabled={isLoading}
                      >
                        <FaKey />
                        Change Password
                      </Button>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <p className="text-sm text-red-800 dark:text-red-300">
                            {error}
                          </p>
                        </div>
                      )}

                      {/* Success Message */}
                      {success && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                          <p className="text-sm font-medium text-green-800 dark:text-green-300">
                            ✓ Password changed successfully!
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
