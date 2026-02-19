import { Link } from 'react-router-dom';
import {
  FaRocket,
  FaUsers,
  FaComments,
  FaImage,
  FaHeart,
  FaArrowRight,
  FaStar,
  FaBolt,
  FaShieldAlt,
  FaCheckCircle,
  FaGlobe,
  FaMobile,
  FaChartLine,
} from 'react-icons/fa';
import { MdVerified, MdTrendingUp } from 'react-icons/md';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import { BiLogoMagento } from 'react-icons/bi';
import SEO from '../../component/SEO/SEO';

function Home() {
  const features = [
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Connect Authentically',
      description:
        'Build meaningful relationships with people who share your passions and values.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FaComments className="text-4xl" />,
      title: 'Real-time Engagement',
      description:
        'Instant messaging, live comments, and dynamic conversations at your fingertips.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FaImage className="text-4xl" />,
      title: 'Share Your Story',
      description:
        'Express yourself through photos, videos, and creative content that resonates.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <FaBolt className="text-4xl" />,
      title: 'Lightning Fast',
      description:
        'Optimized performance with instant loading and seamless navigation.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Privacy First',
      description:
        'Enterprise-grade security with full control over your data and privacy.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FaGlobe className="text-4xl" />,
      title: 'Global Community',
      description:
        'Connect with millions of users from over 100 countries worldwide.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const stats = [
    {
      number: '10M+',
      label: 'Active Users',
      icon: <FaUsers />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '50M+',
      label: 'Posts Shared',
      icon: <FaImage />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '100M+',
      label: 'Interactions',
      icon: <FaHeart />,
      color: 'from-pink-500 to-rose-500',
    },
    {
      number: '100+',
      label: 'Countries',
      icon: <FaGlobe />,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const benefits = [
    'No ads, ever',
    'Unlimited posts',
    'HD photo & video uploads',
    'Advanced privacy controls',
    'Verified badge for creators',
    'Priority support',
  ];

  const trendingPosts = [
    {
      user: {
        name: 'Sarah Martinez',
        username: '@sarahmtz',
        verified: true,
        avatar: 'from-pink-500 to-rose-500',
      },
      content: 'Just launched my new photography portfolio! 📸✨',
      likes: 2847,
      comments: 156,
      time: '2h ago',
    },
    {
      user: {
        name: 'Alex Chen',
        username: '@alexchen',
        verified: false,
        avatar: 'from-blue-500 to-cyan-500',
      },
      content: 'Morning coffee and code ☕💻',
      likes: 1523,
      comments: 92,
      time: '4h ago',
    },
    {
      user: {
        name: 'Emma Wilson',
        username: '@emmawilson',
        verified: true,
        avatar: 'from-green-500 to-emerald-500',
      },
      content: 'Healthy meal prep for the week! 🥗',
      likes: 4521,
      comments: 234,
      time: '6h ago',
    },
  ];

  return (
    <>
      <SEO
        title={`${import.meta.env.VITE_APP_TITLE || 'Nexora'} - The Next Generation Social Platform`}
        description="Connect authentically, share your story, and build meaningful relationships on the next generation social platform."
        path="/"
      />

      <div className="w-full min-h-screen">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1E2939] px-4 py-2 rounded-full shadow-lg">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-semibold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  #1 Social Platform 2026
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Connect, Share,
                </span>
                <br />
                <span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                  Thrive Together
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The next generation social platform where authentic connections
                thrive and creativity flourishes.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  as={Link}
                  to="/explore"
                  size="lg"
                  className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-lg px-8 py-6 hover:scale-105 transition-all shadow-lg"
                  startContent={<FaRocket />}
                >
                  Start Exploring
                </Button>
                <Button
                  as={Link}
                  to="/about"
                  size="lg"
                  variant="bordered"
                  className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold text-lg px-8 py-6 hover:scale-105 transition-all"
                  endContent={<FaArrowRight />}
                >
                  Learn More
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    10M+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    4.8★
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    100+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Countries
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Trending Posts Preview */}
            <div className="hidden lg:block">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <MdTrendingUp className="text-2xl text-pink-600" />
                  <h3 className="text-xl font-bold">Trending Now</h3>
                </div>
                {trendingPosts.map((post, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all cursor-pointer"
                  >
                    <CardBody className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-linear-to-r ${post.user.avatar} flex items-center justify-center text-white font-bold`}
                        >
                          {post.user.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">
                              {post.user.name}
                            </span>
                            {post.user.verified && (
                              <MdVerified className="text-blue-500 text-xs" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {post.user.username} · {post.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{post.content}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaHeart className="text-red-500" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComments className="text-blue-500" />{' '}
                          {post.comments}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
            <CardBody className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      <div className="text-3xl">{stat.icon}</div>
                    </div>
                    <div className="text-4xl font-extrabold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Why Choose {import.meta.env.VITE_APP_TITLE || 'Nexora'}?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the future of social networking with powerful features
              designed for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all cursor-pointer"
              >
                <CardBody className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Everything You Need, Nothing You Don't
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join millions of users enjoying a cleaner, faster, and more
                authentic social experience.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 text-xl shrink-0" />
                    <span className="text-lg font-semibold">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white">
                <CardBody className="p-12 text-center">
                  <BiLogoMagento className="text-8xl mx-auto mb-6 opacity-50" />
                  <h3 className="text-3xl font-bold mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join the community and start connecting today
                  </p>
                  <Button
                    as={Link}
                    to="/register"
                    size="lg"
                    className="bg-white text-pink-600 font-bold hover:scale-105 transition-all"
                  >
                    Create Free Account
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <Card className="bg-linear-to-r from-blue-600 to-cyan-600 text-white">
            <CardBody className="p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <FaMobile className="text-6xl mb-6" />
                  <h2 className="text-4xl font-extrabold mb-4">
                    Take {import.meta.env.VITE_APP_TITLE || 'Nexora'} Anywhere
                  </h2>
                  <p className="text-xl mb-6 opacity-90">
                    Download our mobile app and stay connected on the go.
                    Available on iOS and Android.
                  </p>
                  <Button
                    as={Link}
                    to="/download"
                    size="lg"
                    className="bg-white text-blue-600 font-bold hover:scale-105 transition-all"
                    endContent={<FaArrowRight />}
                  >
                    Download App
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                    <FaChartLine className="text-4xl mx-auto mb-3" />
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-sm opacity-90">Uptime</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                    <FaBolt className="text-4xl mx-auto mb-3" />
                    <div className="text-2xl font-bold">&lt;1s</div>
                    <div className="text-sm opacity-90">Load Time</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                    <FaUsers className="text-4xl mx-auto mb-3" />
                    <div className="text-2xl font-bold">10M+</div>
                    <div className="text-sm opacity-90">Users</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
                    <FaStar className="text-4xl mx-auto mb-3" />
                    <div className="text-2xl font-bold">4.8/5</div>
                    <div className="text-sm opacity-90">Rating</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <Card className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
            <CardBody className="p-16 text-center relative">
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                  <FaRocket className="text-5xl" />
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                  Ready to Transform Your Social Experience?
                </h2>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-95">
                  Join millions of users experiencing the future of social
                  networking
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    as={Link}
                    to="/register"
                    size="lg"
                    className="bg-white text-pink-600 font-bold text-lg px-10 py-7 hover:scale-105 transition-all shadow-xl"
                  >
                    Get Started Free
                    <FaArrowRight className="ml-2" />
                  </Button>
                  <Button
                    as={Link}
                    to="/explore"
                    size="lg"
                    variant="bordered"
                    className="border-2 border-white text-white font-bold text-lg px-10 py-7 hover:bg-white/10 hover:scale-105 transition-all"
                  >
                    Explore Platform
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </>
  );
}

export default Home;
