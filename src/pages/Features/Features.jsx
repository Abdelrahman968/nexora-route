import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@heroui/react';
import {
  FaHeart,
  FaUsers,
  FaBookmark,
  FaShare,
  FaImage,
  FaUserCircle,
  FaGlobe,
  FaArrowRight,
  FaStar,
  FaFire,
  FaCheck,
} from 'react-icons/fa';
import { MdVerified, MdExplore, MdDarkMode } from 'react-icons/md';
import SEO from '../../component/SEO/SEO';

const FEATURES = [
  {
    id: 1,
    icon: FaHeart,
    title: 'React & Connect',
    description:
      'Like posts, leave comments, and reply to threads. Every interaction builds your community in real time.',
    gradient: 'from-rose-500 to-pink-600',
    glow: 'rgba(244,63,94,0.25)',
    tag: 'Social',
    highlights: [
      'Like & unlike posts',
      'Threaded comments',
      'Nested replies',
      'Comment likes',
    ],
    link: '/explore',
    size: 'small',
  },
  {
    id: 2,
    icon: FaUsers,
    title: 'Follow Anyone',
    description:
      'Discover creators, follow friends, and get a curated feed tailored to who you care about.',
    gradient: 'from-violet-500 to-indigo-600',
    glow: 'rgba(139,92,246,0.25)',
    tag: 'Discovery',
    highlights: [
      'Follow / Unfollow',
      'Mutual followers',
      'Suggested people',
      'Following feed',
    ],
    link: '/suggestions',
    size: 'large',
  },
  {
    id: 3,
    icon: FaShare,
    title: 'Repost & Amplify',
    description:
      'Share posts you love with your own take — add a comment and send it to your entire audience.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.25)',
    tag: 'Sharing',
    highlights: [
      'One-click repost',
      'Custom caption',
      'Share to social',
      'Copy link',
    ],
    link: '/explore',
    size: 'large',
  },
  {
    id: 4,
    icon: FaBookmark,
    title: 'Save for Later',
    description:
      'Bookmark any post and return to it whenever you want. Sort by date, popularity, or oldest.',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.25)',
    tag: 'Organisation',
    highlights: [
      'Instant bookmark',
      'Sort & filter',
      'Paginated library',
      'Quick access',
    ],
    link: '/bookmarks',
    size: 'small',
  },
  {
    id: 5,
    icon: MdExplore,
    title: 'Explore Feed',
    description:
      'Dive into a curated stream — All posts, Following-only, or just yours. Switch in one tap.',
    gradient: 'from-orange-500 to-red-500',
    glow: 'rgba(249,115,22,0.25)',
    tag: 'Feed',
    highlights: [
      'All / Following / Me',
      'Trending topics',
      'Top comments preview',
      'Infinite scroll',
    ],
    link: '/explore',
    size: 'small',
  },
  {
    id: 6,
    icon: FaImage,
    title: 'Rich Media Posts',
    description:
      'Share photos with text, text-only thoughts, or reshared posts. Every format looks stunning.',
    gradient: 'from-sky-500 to-blue-600',
    glow: 'rgba(14,165,233,0.25)',
    tag: 'Content',
    highlights: [
      'Photo uploads',
      'Text posts',
      'Image preview modal',
      'Download option',
    ],
    link: '/explore',
    size: 'large',
  },
  {
    id: 7,
    icon: FaGlobe,
    title: 'Privacy Controls',
    description:
      'Choose who sees each post — Public, Followers only, or Private. Full control every time.',
    gradient: 'from-amber-500 to-yellow-500',
    glow: 'rgba(245,158,11,0.25)',
    tag: 'Privacy',
    highlights: [
      'Public posts',
      'Followers only',
      'Private mode',
      'Per-post setting',
    ],
    link: '/privacy',
    size: 'large',
  },
  {
    id: 8,
    icon: FaUserCircle,
    title: 'Rich Profiles',
    description:
      'A beautiful profile with your posts grid, follower counts, bio, and verified badge if earned.',
    gradient: 'from-purple-500 to-violet-600',
    glow: 'rgba(168,85,247,0.25)',
    tag: 'Profile',
    highlights: [
      'Posts grid',
      'Follower / Following',
      'Verified badge',
      'Edit profile',
    ],
    link: '/profile',
    size: 'small',
  },
];

const STATS = [
  { value: '8+', label: 'Core Features', icon: FaStar },
  { value: '100%', label: 'Mobile Ready', icon: FaCheck },
  { value: 'Real-time', label: 'Updates', icon: FaFire },
  { value: 'Dark', label: 'Mode Native', icon: MdDarkMode },
];

function FeatureCard({ feature, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;
  const isLarge = feature.size === 'large';

  return (
    <Link
      to={feature.link}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200/60 dark:border-gray-700/40 bg-white dark:bg-[#1E2939] shadow-md cursor-pointer transition-all duration-500
        ${isLarge ? 'md:col-span-2' : 'col-span-1'}
        hover:shadow-2xl hover:-translate-y-1`}
      style={{
        animationDelay: `${index * 80}ms`,
        boxShadow: hovered ? `0 20px 60px ${feature.glow}` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient strip */}
      <div
        className={`h-1.5 w-full bg-linear-to-r ${feature.gradient} transition-all duration-500 ${hovered ? 'h-2' : ''}`}
      />

      {/* Floating glow orb on hover */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{ background: feature.glow, opacity: hovered ? 0.4 : 0 }}
      />

      <div
        className={`relative z-10 flex flex-col flex-1 p-6 ${isLarge ? 'md:flex-row md:gap-8 md:items-start' : ''}`}
      >
        {/* Icon */}
        <div className="shrink-0 mb-5 md:mb-0">
          <div
            className={`w-14 h-14 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <Icon className="text-white text-2xl" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Chip
              size="sm"
              className={`bg-linear-to-r ${feature.gradient} text-white text-[10px] m-2 font-bold border-none shadow-sm`}
            >
              {feature.tag}
            </Chip>
          </div>

          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-pink-500 group-hover:to-indigo-500 transition-all duration-300">
            {feature.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
            {feature.description}
          </p>

          {/* Highlights */}
          <ul
            className={`grid gap-1.5 ${isLarge ? 'md:grid-cols-2' : 'grid-cols-1'}`}
          >
            {feature.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full bg-linear-to-br ${feature.gradient} flex items-center justify-center shrink-0`}
                >
                  <FaCheck className="text-white text-[7px]" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {h}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            className={`flex items-center gap-1.5 mt-5 text-xs font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 bg-linear-to-r ${feature.gradient} bg-clip-text text-transparent`}
          >
            Explore feature{' '}
            <FaArrowRight
              className={`text-[10px] bg-linear-to-r ${feature.gradient} bg-clip-text`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Features() {
  return (
    <>
      <SEO
        title="Features"
        description="Explore everything the platform has to offer"
        path="/features"
      />

      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[300px] bg-linear-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-md mb-6">
              <FaFire className="text-orange-500 text-sm" />
              <span className="text-xs font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent tracking-wide uppercase">
                Everything you need
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none mb-5 tracking-tight">
              <span className="bg-linear-to-r from-pink-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Built for
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                real connections.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
              Every feature is crafted to bring people closer — with the tools
              to share, discover, and connect without friction.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-gray-700 rounded-2xl p-1.5 shadow-lg">
              {STATS.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                  >
                    <StatIcon className="text-pink-500 text-sm shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-extrabold text-gray-900 dark:text-white leading-none">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                    {i < STATS.length - 1 && (
                      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 ml-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 p-px shadow-2xl">
            <div className="relative rounded-3xl bg-white dark:bg-[#111827] px-8 py-12 text-center overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MdVerified className="text-blue-500 text-2xl" />
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Free to use · No ads
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                  Ready to dive in?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                  Jump into the feed, follow some people, and start sharing what
                  matters to you.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-sm shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-all duration-200"
                  >
                    <FaFire /> Explore Feed
                  </Link>
                  <Link
                    to="/suggested-friends"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold text-sm hover:border-pink-400 dark:hover:border-pink-500 hover:scale-105 transition-all duration-200"
                  >
                    <FaUsers /> Find Friends
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
