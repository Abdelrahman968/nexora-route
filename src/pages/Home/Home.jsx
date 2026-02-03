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
} from 'react-icons/fa';
import { Button } from '@heroui/react';
import './style.css';
import { Helmet } from 'react-helmet-async';

function Home() {
  const features = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Connect with People',
      description:
        'Build meaningful connections with people who share your interests and passions.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: 'Real-time Conversations',
      description:
        'Engage in dynamic conversations with instant comments and replies.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FaImage className="text-3xl" />,
      title: 'Share Your Moments',
      description:
        'Post photos and stories to share your experiences with the community.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: 'Spread Positivity',
      description:
        'Create a supportive environment where everyone feels valued and heard.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: <FaBolt className="text-3xl" />,
      title: 'Lightning Fast',
      description:
        'Experience blazing fast performance with instant loading and smooth interactions.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Secure & Private',
      description:
        'Your data is protected with enterprise-grade security and privacy controls.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    {
      number: '50K+',
      label: 'Active Users',
      icon: <FaUsers />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '1M+',
      label: 'Posts Shared',
      icon: <FaImage />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '5M+',
      label: 'Comments',
      icon: <FaComments />,
      color: 'from-orange-500 to-red-500',
    },
    {
      number: '10M+',
      label: 'Connections',
      icon: <FaHeart />,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      quote:
        'Nexora has transformed the way I connect with my audience. The features are incredible!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Digital Marketer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      quote:
        'The best social platform I&apos;ve used. Clean, intuitive, and powerful.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Photographer',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      quote:
        'Perfect for sharing my photography portfolio and connecting with other artists.',
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nexora – Modern Social Network</title>
        <meta
          name="description"
          content="Join Nexora: Share thoughts, photos, videos, connect with friends, and discover trending content from around the world."
        />
        <meta
          name="keywords"
          content="nexora, social network, social media, connect, share posts, trending, friends"
        />
        <meta property="og:title" content="Nexora – Modern Social Network" />
        <meta
          property="og:description"
          content="Join Nexora: Share thoughts, photos, videos, connect with friends, and discover trending content."
        />
        <meta property="og:image" content="/og-home-1200x630.png" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="w-full min-h-screen">
        {/* Hero Section - New Layout */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>

          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl px-5 py-2.5 rounded-full mb-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <FaStar className="text-yellow-500 text-lg" />
                  <span className="text-sm font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    #1 Social Platform 2026
                  </span>
                </div>

                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                  <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome to
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Nexora
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  The next generation social platform where authentic
                  connections thrive and creativity flourishes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/explore">
                    <Button
                      size="lg"
                      className="bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-7 text-lg font-bold shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <FaRocket className="mr-2" />
                      Start Exploring
                    </Button>
                  </Link>
                  <Link to="/create-post">
                    <Button
                      size="lg"
                      variant="bordered"
                      className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 px-10 py-7 text-lg font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all duration-300 hover:scale-105"
                    >
                      Create Post
                      <FaArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Content - Floating Cards */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-[600px]">
                  {/* Floating Card 1 */}
                  <div className="absolute top-0 right-0 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl animate-float">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">
                          Sarah J.
                        </h4>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Just joined Nexora and loving the vibe! 🎉
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-red-500" /> 234
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComments className="text-blue-500" /> 45
                      </span>
                    </div>
                  </div>

                  {/* Floating Card 2 */}
                  <div className="absolute top-40 left-0 w-72 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl animate-float animation-delay-2000">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">
                          Michael C.
                        </h4>
                        <p className="text-sm text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
                      alt="Post"
                      className="w-full h-32 object-cover rounded-2xl mb-3"
                    />
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaHeart className="text-red-500" /> 567
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComments className="text-blue-500" /> 89
                      </span>
                    </div>
                  </div>

                  {/* Floating Card 3 */}
                  <div className="absolute bottom-0 right-10 w-64 bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 shadow-2xl animate-float animation-delay-4000">
                    <div className="text-white text-center">
                      <FaUsers className="text-5xl mx-auto mb-3" />
                      <h4 className="font-bold text-2xl mb-2">50K+</h4>
                      <p className="text-sm opacity-90">Active Users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>

        {/* Stats Section - New Horizontal Layout */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - New Card Grid */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Why Nexora Stands Out
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover the features that make Nexora the preferred choice for
              millions of users worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer"
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-linear-to-r ${feature.gradient} flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <div
                    className={`absolute inset-0 w-20 h-20 rounded-2xl bg-linear-to-r ${feature.gradient} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                  ></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section - New Design */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Loved by Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what our community has to say about their Nexora experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xl" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-600"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - New Bold Design */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="relative bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-16 sm:p-20 text-center text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 animate-bounce">
                <FaRocket className="text-5xl" />
              </div>
              <h2 className="text-5xl sm:text-6xl font-black mb-6">
                Ready to Transform Your Social Experience?
              </h2>
              <p className="text-2xl mb-10 max-w-3xl mx-auto opacity-95 leading-relaxed">
                Join millions of users who are already experiencing the future
                of social networking
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/explore">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100 px-12 py-7 text-xl font-black shadow-2xl hover:scale-105 transition-transform"
                  >
                    Get Started Free
                    <FaArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-2 border-white text-white hover:bg-white/10 px-12 py-7 text-xl font-black backdrop-blur-xl hover:scale-105 transition-transform"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
