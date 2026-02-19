import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FaCog,
  FaMapMarkerAlt,
  FaCalendar,
  FaCheckCircle,
  FaUserPlus,
  FaUserCheck,
  FaEnvelope,
  FaCamera,
  FaImage,
  FaBookmark,
  FaArrowLeft,
  FaStar,
  FaChartLine,
  FaTrash,
  FaGlobe,
  FaUserFriends,
  FaLock,
  FaUser,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import {
  Card,
  CardBody,
  Button,
  Tabs,
  Tab,
  Chip,
  Pagination,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio,
} from '@heroui/react';
import SEO from '../SEO/SEO';
import ProfilePostCard from '../ProfilePostCard/ProfilePostCard';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Profile() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarksPage, setBookmarksPage] = useState(1);
  const postsPerPage = 9;
  const navigate = useNavigate();

  const {
    isOpen: isCoverModalOpen,
    onOpen: onCoverModalOpen,
    onClose: onCoverModalClose,
  } = useDisclosure();
  const {
    isOpen: isPhotoModalOpen,
    onOpen: onPhotoModalOpen,
    onClose: onPhotoModalClose,
  } = useDisclosure();
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverPrivacy, setCoverPrivacy] = useState('public');
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { safeProfileInfo } = useContext(ProfileInfoContext);
  const { userToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const user = safeProfileInfo?.data?.user || {};
  const isFollowingFromAPI = safeProfileInfo?.data?.isFollowing || false;

  const {
    data: postsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userPosts', user._id, currentPage],
    queryFn: async () => {
      if (!user._id) throw new Error('User ID not available');

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/feed`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            page: currentPage,
            limit: postsPerPage,
            only: 'me',
          },
        }
      );

      return response.data;
    },
    enabled: !!user._id && !!userToken && activeTab === 'posts',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const {
    data: bookmarksData,
    isLoading: isLoadingBookmarks,
    isError: isErrorBookmarks,
    error: errorBookmarks,
  } = useQuery({
    queryKey: ['userBookmarks', bookmarksPage],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            page: bookmarksPage,
            limit: postsPerPage,
          },
        }
      );

      return response.data;
    },
    enabled: !!userToken && activeTab === 'bookmarks',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const uploadCoverMutation = useMutation({
    mutationFn: async ({ file, privacy }) => {
      const formData = new FormData();
      formData.append('cover', file);
      formData.append('privacy', privacy);

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/upload-cover`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo']);
      queryClient.invalidateQueries(['userPosts']);
      onCoverModalClose();
      setSelectedCoverFile(null);
      setCoverPreview(null);
      setCoverPrivacy('public');
    },
    onError: error => {
      console.error('Error uploading cover:', error);
      alert(error.response?.data?.message || 'Failed to upload cover photo');
    },
  });

  const deleteCoverMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users/cover`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo']);
    },
    onError: error => {
      console.error('Error deleting cover:', error);
      alert(error.response?.data?.message || 'Failed to delete cover photo');
    },
  });

  const handleCoverFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setSelectedCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverUpload = async () => {
    if (!selectedCoverFile) return;
    setIsUploading(true);
    try {
      await uploadCoverMutation.mutateAsync({
        file: selectedCoverFile,
        privacy: coverPrivacy,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCoverDelete = async () => {
    if (confirm('Are you sure you want to delete your cover photo?')) {
      await deleteCoverMutation.mutateAsync();
    }
  };

  const uploadPhotoMutation = useMutation({
    mutationFn: async file => {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/users/upload-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profileInfo']);
      onPhotoModalClose();
      setSelectedPhotoFile(null);
      setPhotoPreview(null);
    },
    onError: error => {
      console.error('Error uploading photo:', error);
      alert(error.response?.data?.message || 'Failed to upload profile photo');
    },
  });

  const handlePhotoFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setSelectedPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhotoFile) return;
    setIsUploading(true);
    try {
      await uploadPhotoMutation.mutateAsync(selectedPhotoFile);
    } finally {
      setIsUploading(false);
    }
  };

  useState(() => {
    setIsFollowing(isFollowingFromAPI);
  }, [isFollowingFromAPI]);

  const formatJoinDate = dateString => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const posts = postsData?.data?.posts || [];
  const totalPages = postsData?.meta?.pagination?.numberOfPages || 1;
  const totalPosts = postsData?.meta?.pagination?.total || 0;

  const bookmarks = bookmarksData?.data?.bookmarks || [];
  const bookmarksTotalPages =
    bookmarksData?.meta?.pagination?.numberOfPages || 1;
  const totalBookmarks = bookmarksData?.meta?.pagination?.total || 0;

  const currentData = activeTab === 'bookmarks' ? bookmarks : posts;
  const currentTotalPages =
    activeTab === 'bookmarks' ? bookmarksTotalPages : totalPages;
  const currentLoading =
    activeTab === 'bookmarks' ? isLoadingBookmarks : isLoading;
  const currentError = activeTab === 'bookmarks' ? isErrorBookmarks : isError;
  const currentErrorMessage =
    activeTab === 'bookmarks' ? errorBookmarks : error;

  const stats = [
    {
      value: totalPosts,
      label: 'Posts',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      value: user.followersCount || 0,
      label: 'Followers',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      value: user.followingCount || 0,
      label: 'Following',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      value: totalBookmarks || user.bookmarksCount || 0,
      label: 'Bookmarks',
      gradient: 'from-red-500 to-pink-500',
    },
  ];

  const badges = [
    {
      name: 'Route Posts member',
      icon: <FaUser />,
      color: 'from-blue-500 to-cyan-500',
    },
    user.verified && {
      name: 'Verified',
      icon: <MdVerified />,
      color: 'from-blue-500 to-cyan-500',
    },
    user.followersCount > 1000 && {
      name: 'Top Creator',
      icon: <FaStar />,
      color: 'from-yellow-500 to-orange-500',
    },
    user.createdAt &&
      new Date(user.createdAt).getFullYear() === 2026 && {
        name: 'Early Adopter',
        icon: <FaCheckCircle />,
        color: 'from-green-500 to-emerald-500',
      },
  ].filter(Boolean);

  // Get initials for avatar
  const getInitials = name => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Default gradient for avatar/cover
  const defaultAvatarGradient = 'from-pink-500 to-purple-600';
  const defaultCoverGradient = 'from-blue-500 to-purple-600';

  // Handle page change
  const handlePageChange = page => {
    if (activeTab === 'bookmarks') {
      setBookmarksPage(page);
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = key => {
    setActiveTab(key);
    if (key === 'bookmarks') {
      setBookmarksPage(1);
    } else {
      setCurrentPage(1);
    }
  };

  if (!user._id) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <h2 className="text-2xl font-bold mb-4 mt-4">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${user.name || 'User'} - Profile`}
        description={user.bio || `View ${user.name}'s profile`}
        path={`/profile/${id || user._id}`}
      />

      <div className="w-full min-h-screen">
        {/* Cover Photo */}
        <div
          className={`w-full h-64 md:h-80 bg-linear-to-r ${user.cover || defaultCoverGradient} relative`}
          style={
            user.cover && user.cover.startsWith('http')
              ? {
                  backgroundImage: `url(${user.cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-4 left-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back</span>
            </Link>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            {user.cover && (
              <Button
                className="bg-red-500/80 backdrop-blur-md text-white hover:bg-red-600 transition-all"
                startContent={<FaTrash />}
                onPress={handleCoverDelete}
                isLoading={deleteCoverMutation.isPending}
              >
                Delete Cover
              </Button>
            )}
            <Button
              className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
              startContent={<FaCamera />}
              onPress={onCoverModalOpen}
            >
              {user.cover ? 'Change Cover' : 'Add Cover'}
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="relative">
                {user.photo && user.photo.startsWith('http') ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-40 h-40 rounded-3xl object-cover border-8 border-white dark:border-gray-800 shadow-2xl"
                  />
                ) : (
                  <div
                    className={`w-40 h-40 rounded-3xl bg-linear-to-r ${defaultAvatarGradient} flex items-center justify-center text-white text-6xl font-bold border-8 border-white dark:border-gray-800 shadow-2xl`}
                  >
                    {getInitials(user.name)}
                  </div>
                )}
                <button
                  onClick={onPhotoModalOpen}
                  className="absolute bottom-2 right-2 w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all"
                >
                  <FaCamera className="text-xl" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="bg-white dark:bg-[#1E2939] rounded-2xl shadow-xl p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-extrabold">
                          <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                            {user.name || 'Anonymous'}
                          </span>
                        </h1>
                        {user.verified && (
                          <MdVerified className="text-blue-500 text-2xl" />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">
                        @{user.email?.split('@')[0] || id || 'user'}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        Active on Route Posts
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {user.gender && (
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-pink-600 dark:text-pink-400" />
                            <span className="capitalize">{user.gender}</span>
                          </div>
                        )}
                        {user.dateOfBirth && (
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-pink-600 dark:text-pink-400" />
                            <span>
                              Born{' '}
                              {new Date(user.dateOfBirth).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-pink-600 dark:text-pink-400" />
                          <span>Joined {formatJoinDate(user.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button
                        size="lg"
                        className={`${
                          isFollowing
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'bg-linear-to-r from-pink-600 to-indigo-600 text-white'
                        } font-bold shadow-lg hover:scale-105 transition-all`}
                        startContent={
                          isFollowing ? <FaUserCheck /> : <FaUserPlus />
                        }
                        onPress={() => setIsFollowing(!isFollowing)}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button
                        size="lg"
                        variant="bordered"
                        className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold hover:scale-105 transition-all"
                        startContent={<FaEnvelope />}
                      >
                        Message
                      </Button>
                      <Button
                        size="lg"
                        variant="flat"
                        className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        isIconOnly
                        onClick={() => navigate('/settings')}
                      >
                        <FaCog className="text-xl" />
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 ">
                      {badges.map((badge, index) => (
                        <Chip
                          key={index}
                          size="md"
                          className={`bg-linear-to-r ${badge.color} text-white font-bold p-2 `}
                          startContent={badge.icon}
                        >
                          {badge.name}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <CardBody className="p-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-r ${stat.gradient} flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                  >
                    <FaChartLine className="text-xl" />
                  </div>
                  <div className="text-3xl font-extrabold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Content Tabs */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl mb-8">
            <CardBody className="p-6">
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={handleTabChange}
                size="lg"
                classNames={{
                  tabList: 'gap-6 w-full',
                  cursor: 'bg-linear-to-r from-pink-600 to-indigo-600',
                  tab: 'px-6',
                  tabContent: 'group-data-[selected=true]:text-white font-bold',
                }}
              >
                <Tab
                  key="posts"
                  title={
                    <div className="flex items-center gap-2">
                      <FaImage />
                      <span>Posts</span>
                    </div>
                  }
                />
                <Tab
                  key="bookmarks"
                  title={
                    <div className="flex items-center gap-2">
                      <FaBookmark />
                      <span>Bookmarks</span>
                    </div>
                  }
                />
              </Tabs>
            </CardBody>
          </Card>

          {/* Posts/Bookmarks Grid */}
          {currentLoading ? (
            <div className="text-center py-12">
              <Spinner size="lg" color="primary" />
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Loading {activeTab === 'bookmarks' ? 'bookmarks' : 'posts'}...
              </p>
            </div>
          ) : currentError ? (
            <div className="text-center py-12">
              <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 max-w-md mx-auto">
                <CardBody className="p-6">
                  <p className="text-red-600 dark:text-red-400 font-semibold mb-2">
                    Error loading{' '}
                    {activeTab === 'bookmarks' ? 'bookmarks' : 'posts'}
                  </p>
                  <p className="text-red-500 dark:text-red-300 text-sm">
                    {currentErrorMessage?.message || 'Something went wrong'}
                  </p>
                  <Button
                    size="sm"
                    className="mt-4 bg-red-600 text-white"
                    onPress={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </CardBody>
              </Card>
            </div>
          ) : currentData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                {currentData.map(post => (
                  <ProfilePostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {currentTotalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pb-12">
                  <Pagination
                    total={currentTotalPages}
                    page={
                      activeTab === 'bookmarks' ? bookmarksPage : currentPage
                    }
                    onChange={handlePageChange}
                    showControls
                    color="primary"
                    size="lg"
                    classNames={{
                      cursor: 'bg-linear-to-r from-pink-600 to-indigo-600',
                      item: 'hover:bg-gray-100 dark:hover:bg-gray-800',
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Card className="bg-gray-50 dark:bg-gray-800 max-w-md mx-auto">
                <CardBody className="p-8">
                  <div className="text-6xl mb-4">
                    {activeTab === 'bookmarks' ? '🔖' : '📝'}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                    No {activeTab === 'bookmarks' ? 'bookmarks' : 'posts'} yet
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                    {activeTab === 'bookmarks'
                      ? 'Bookmarked posts will appear here'
                      : 'Posts will appear here once they are created'}
                  </p>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Cover Photo Upload Modal */}
      <Modal
        isOpen={isCoverModalOpen}
        onClose={onCoverModalClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Upload Cover Photo
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {/* File Input */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-pink-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverFileChange}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-full bg-linear-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white text-3xl">
                        <FaCamera />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          Click to upload cover photo
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Preview */}
                  {coverPreview && (
                    <div className="relative rounded-lg overflow-hidden border-2 border-pink-500">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          isIconOnly
                          size="sm"
                          className="bg-red-500 text-white"
                          onPress={() => {
                            setSelectedCoverFile(null);
                            setCoverPreview(null);
                          }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedCoverFile && (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Selected file:</strong> {selectedCoverFile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Size:{' '}
                        {(selectedCoverFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Cover post privacy
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Choose who can see the post generated for your new cover
                      photo.
                    </p>
                    <RadioGroup
                      orientation="horizontal"
                      value={coverPrivacy}
                      onValueChange={setCoverPrivacy}
                      classNames={{
                        base: 'w-full',
                        wrapper: 'flex justify-center gap-6 flex-wrap',
                      }}
                    >
                      <Radio
                        value="public"
                        classNames={{
                          base: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 cursor-pointer transition-all data-[selected=true]:border-pink-500',
                          wrapper: 'group-data-[selected=true]:border-pink-500',
                          control: 'bg-pink-600',
                        }}
                        description="Anyone can see this post"
                      >
                        <div className="flex items-center gap-2">
                          <FaGlobe className="text-blue-500" />
                          <span className="font-semibold">Public</span>
                        </div>
                      </Radio>
                      <Radio
                        value="following"
                        classNames={{
                          base: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 cursor-pointer transition-all data-[selected=true]:border-pink-500',
                          wrapper: 'group-data-[selected=true]:border-pink-500',
                          control: 'bg-pink-600',
                        }}
                        description="Only your followers can see"
                      >
                        <div className="flex items-center gap-2">
                          <FaUserFriends className="text-green-500" />
                          <span className="font-semibold">Followers</span>
                        </div>
                      </Radio>
                      <Radio
                        value="private"
                        classNames={{
                          base: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 cursor-pointer transition-all data-[selected=true]:border-pink-500',
                          wrapper: 'group-data-[selected=true]:border-pink-500',
                          control: 'bg-pink-600',
                        }}
                        description="Only you can see this post"
                      >
                        <div className="flex items-center gap-2">
                          <FaLock className="text-gray-500" />
                          <span className="font-semibold">Only me</span>
                        </div>
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold"
                  onPress={handleCoverUpload}
                  isDisabled={!selectedCoverFile || isUploading}
                  isLoading={isUploading}
                >
                  Upload Cover
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Profile Photo Upload Modal */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={onPhotoModalClose}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Upload Profile Photo
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {/* File Input */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-pink-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-full bg-linear-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white text-3xl">
                        <FaCamera />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          Click to upload profile photo
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Preview */}
                  {photoPreview && (
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="w-48 h-48 rounded-full object-cover border-4 border-pink-500"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            isIconOnly
                            size="sm"
                            className="bg-red-500 text-white rounded-full"
                            onClick={() => {
                              setSelectedPhotoFile(null);
                              setPhotoPreview(null);
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPhotoFile && (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Selected file:</strong> {selectedPhotoFile.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Size:{' '}
                        {(selectedPhotoFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold"
                  onPress={handlePhotoUpload}
                  isDisabled={!selectedPhotoFile || isUploading}
                  isLoading={isUploading}
                >
                  Upload Photo
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
