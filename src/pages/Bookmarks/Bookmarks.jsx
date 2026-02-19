import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardBody, Spinner, Pagination, Button } from '@heroui/react';
import { FaBookmark, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import ProfilePostCard from '../../component/ProfilePostCard/ProfilePostCard';
import SEO from '../../component/SEO/SEO';

function Bookmarks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy] = useState('recent'); // recent, oldest, popular
  const postsPerPage = 12;

  const { userToken } = useContext(AuthContext);

  const {
    data: bookmarksData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['bookmarks', currentPage, sortBy],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            page: currentPage,
            limit: postsPerPage,
          },
        }
      );
      return response.data;
    },
    enabled: !!userToken,
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const bookmarks = bookmarksData?.data?.bookmarks || [];
  const totalPages = bookmarksData?.meta?.pagination?.numberOfPages || 1;
  const totalBookmarks = bookmarksData?.meta?.pagination?.total || 0;

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular':
        return (b.likesCount || 0) - (a.likesCount || 0);
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      <SEO
        title="Bookmarks"
        description="View all your saved posts"
        path="/bookmarks"
      />

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <Spinner size="lg" color="primary" />
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
                Loading your bookmarks...
              </p>
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 max-w-md mx-auto">
                <CardBody className="p-8">
                  <div className="text-6xl mb-4">⚠️</div>
                  <p className="text-red-600 dark:text-red-400 font-semibold mb-2 text-lg">
                    Error loading bookmarks
                  </p>
                  <p className="text-red-500 dark:text-red-300 text-sm mb-4">
                    {error?.message || 'Something went wrong'}
                  </p>
                  <Button
                    size="md"
                    className="bg-red-600 text-white"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </CardBody>
              </Card>
            </div>
          ) : sortedBookmarks.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                {sortedBookmarks.map(post => (
                  <ProfilePostCard key={post._id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pb-12">
                  <Pagination
                    total={totalPages}
                    page={currentPage}
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

              <Card className="bg-linear-to-r from-pink-50 to-indigo-50 dark:from-pink-900/20 dark:to-indigo-900/20 border-2 border-pink-200 dark:border-pink-800">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-r from-pink-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
                        <FaBookmark />
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Total Bookmarks
                        </p>
                        <p className="text-3xl font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                          {totalBookmarks}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Page {currentPage} of {totalPages}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {postsPerPage} posts per page
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          ) : (
            <div className="text-center py-20">
              <Card className="bg-white dark:bg-[#1E2939] max-w-2xl mx-auto">
                <CardBody className="p-12">
                  <div className="text-8xl mb-6">🔖</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    No bookmarks yet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Start saving posts you love! Tap the bookmark icon on any
                    post to save it here for later.
                  </p>
                  <Link to="/">
                    <Button
                      size="lg"
                      className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold"
                      startContent={<FaArrowLeft />}
                    >
                      Explore Posts
                    </Button>
                  </Link>

                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-3xl mb-2">💡</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Quick Save
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click the bookmark icon on any post to save it instantly
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-3xl mb-2">📱</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Access Anywhere
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your bookmarks sync across all your devices
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-3xl mb-2">🎯</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Stay Organized
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sort and find your saved posts easily
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bookmarks;
