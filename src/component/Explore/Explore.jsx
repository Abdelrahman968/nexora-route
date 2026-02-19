import { useContext, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Chip,
  Pagination,
} from '@heroui/react';
import { FaHeart, FaFire, FaClock, FaStar } from 'react-icons/fa';
import CreatePost from '../CreatePost/CreatePost';
import Comments from '../Comment/Comment';
import PostCard from '../PostCard/PostCard';
import { PostContext } from '../../context/PostContext';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import WhoToFollow from '../Whotofollow/Whotofollow';
import SEO from '../SEO/SEO';

const POSTS_PER_PAGE = 5;

function Explore() {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { safeHomeFeedData, isLoading, isError, error, fetchHomeFeedType } =
    useContext(PostContext);

  const posts = safeHomeFeedData?.data?.posts;

  if (isLoading) return <Loading />;
  if (isError) return <Error message={error} />;

  const trendingTopics = [
    { tag: '#Photography', posts: '12.5K', change: '+23%' },
    { tag: '#HealthyLiving', posts: '8.9K', change: '+15%' },
    { tag: '#NewMusic', posts: '15.2K', change: '+45%' },
    { tag: '#TravelGoals', posts: '6.7K', change: '+12%' },
    { tag: '#TechNews', posts: '9.1K', change: '+8%' },
  ];

  const handleLike = postId => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const handleBookmark = postId => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const handleTabChange = key => {
    setSelectedTab(key);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const pagedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <SEO
        title="Explore"
        description="Explore posts from all users and find new content to enjoy"
        path="/explore"
      />
      <div className="min-h-screen w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-19 space-y-4">
                <Card className="bg-white/80 dark:bg-[#1E2939]/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-linear-to-r from-orange-500 to-red-500 rounded-lg">
                        <FaFire className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">Trending Now</h3>
                        <p className="text-xs text-gray-500">
                          Hot topics today
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="gap-2 pt-2">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-linear-to-r from-gray-50 to-white dark:from-[#0F1419] dark:to-[#1a1f2e] hover:shadow-md transition-all cursor-pointer border border-gray-100 dark:border-gray-800"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-sm bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                              {topic.tag}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {topic.posts} posts
                            </div>
                          </div>
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs"
                          >
                            {topic.change}
                          </Chip>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <CreatePost />

              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={handleTabChange}
                variant="light"
                classNames={{
                  base: 'bg-white/80 dark:bg-[#1E2939]/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-1 w-full',
                  tabList: 'w-full gap-2',
                  cursor: 'bg-linear-to-r from-pink-600 to-indigo-600',
                  tab: 'data-[selected=true]:text-white',
                }}
              >
                <Tab
                  key="all"
                  title={
                    <div className="flex items-center gap-2 px-2">
                      <FaFire />
                      <span className="font-semibold">All</span>
                    </div>
                  }
                  onPress={() => fetchHomeFeedType('all')}
                />
                <Tab
                  key="following"
                  title={
                    <div className="flex items-center gap-2 px-2">
                      <FaClock />
                      <span className="font-semibold">Following</span>
                    </div>
                  }
                  onPress={() => fetchHomeFeedType('following')}
                />
                <Tab
                  key="me"
                  title={
                    <div className="flex items-center gap-2 px-2">
                      <FaStar />
                      <span className="font-semibold">Me</span>
                    </div>
                  }
                  onPress={() => fetchHomeFeedType('me')}
                />
              </Tabs>

              <div className="space-y-4">
                {pagedPosts.map(post => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onComment={setSelectedPost}
                    isLiked={likedPosts.has(post._id)}
                    isBookmarked={bookmarkedPosts.has(post._id)}
                  />
                ))}
              </div>

              {posts.length > POSTS_PER_PAGE && (
                <div className="flex justify-center pt-2 pb-4">
                  <Pagination
                    showControls
                    page={currentPage}
                    total={totalPages}
                    onChange={setCurrentPage}
                  />
                </div>
              )}
            </div>

            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-19 space-y-4">
                <WhoToFollow />
              </div>
            </div>
          </div>
        </div>

        {selectedPost && (
          <Comments post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </div>
    </>
  );
}

export default Explore;
