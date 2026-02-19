import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@heroui/react';
import {
  FaRocket,
  FaFire,
  FaBolt,
  FaShieldAlt,
  FaBug,
  FaStar,
  FaHeart,
  FaUsers,
  FaBookmark,
  FaComments,
  FaBell,
  FaShare,
  FaImage,
  FaUserCircle,
  FaSearch,
  FaCheck,
  FaArrowRight,
  FaGithub,
  FaCalendar,
  FaTag,
  FaLightbulb,
  FaWrench,
  FaGem,
  FaCrown,
  FaInfinity,
  FaCode,
} from 'react-icons/fa';
import { MdNewReleases, MdTimeline } from 'react-icons/md';
import SEO from '../../component/SEO/SEO';

const RELEASES = [
  {
    version: '2.0.0',
    date: 'February 2026',
    label: 'Major Release',
    labelColor: 'from-pink-500 to-indigo-600',
    labelIcon: FaRocket,
    highlight: true,
    summary:
      'A complete architectural overhaul — new context system, real API integration across all components, and a polished UI upgrade.',
    sections: [
      {
        type: 'new',
        icon: FaRocket,
        color: 'from-pink-500 to-rose-500',
        bg: 'bg-pink-50 dark:bg-pink-900/10',
        border: 'border-pink-200 dark:border-pink-800/40',
        title: 'New Features',
        items: [
          {
            icon: FaUsers,
            text: 'Follow / Unfollow system with optimistic UI and mutual follower count badges',
          },
          {
            icon: FaInfinity,
            text: 'Infinite pagination on suggestions, comments, and replies via useInfiniteQuery',
          },
          {
            icon: FaBell,
            text: 'Real-time notification center with unread badge, mark-one and mark-all-read',
          },
          {
            icon: FaComments,
            text: 'Full comment & reply system — create, edit, delete, like, and paginated replies',
          },
          {
            icon: FaShare,
            text: 'Repost with optional caption — inline on feed, card, and post page',
          },
          {
            icon: FaBookmark,
            text: 'Bookmark toggle with paginated library, sort by date or popularity',
          },
          {
            icon: FaImage,
            text: 'Image expand modal on ProfilePostCard with download support',
          },
          {
            icon: FaGem,
            text: 'Pricing page — Free / Pro / Elite plans with monthly/yearly toggle and comparison table',
          },
          {
            icon: FaStar,
            text: 'Features showcase page with interactive hover cards and gradient accents',
          },
          { icon: MdTimeline, text: 'Updates & changelog page (you are here)' },
        ],
      },
      {
        type: 'improved',
        icon: FaBolt,
        color: 'from-violet-500 to-indigo-500',
        bg: 'bg-violet-50 dark:bg-violet-900/10',
        border: 'border-violet-200 dark:border-violet-800/40',
        title: 'Improvements',
        items: [
          {
            icon: FaCode,
            text: 'PostCard, PostPage, ProfilePostCard all migrated to QuickActionsContext — no more prop drilling mutations',
          },
          {
            icon: FaComments,
            text: 'Comment.jsx fully migrated to CommentContext — single source of truth for all comment state',
          },
          {
            icon: FaUsers,
            text: 'WhoToFollow sidebar rebuilt with real API data, skeleton loading, and expand-in-place pagination',
          },
          {
            icon: FaUserCircle,
            text: 'SuggestedFriends page now consumes live API with skeleton cards and load-more pagination',
          },
          {
            icon: FaHeart,
            text: 'Like button uses optimistic updates with automatic rollback on API error',
          },
          {
            icon: FaBookmark,
            text: 'Bookmark uses optimistic toggle — instant feedback, no spinner wait',
          },
          {
            icon: FaShieldAlt,
            text: 'Auth headers unified across all contexts — single pattern for Bearer token injection',
          },
          {
            icon: FaWrench,
            text: 'queryClient.invalidateQueries migrated from array syntax to object syntax (TanStack Query v5)',
          },
        ],
      },
      {
        type: 'fixed',
        icon: FaBug,
        color: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
        border: 'border-emerald-200 dark:border-emerald-800/40',
        title: 'Bug Fixes',
        items: [
          {
            icon: FaBug,
            text: 'Fixed FollowContext crash — QueryClient.invalidateQueries called on class instead of hook instance',
          },
          {
            icon: FaBug,
            text: 'Fixed axios.put for follow — auth header was being passed as request body instead of config',
          },
          {
            icon: FaBug,
            text: 'Fixed WhoToFollow undefined context crash when rendered outside FollowContextProvider',
          },
          {
            icon: FaBug,
            text: 'Fixed post liked state initialization — replaced unreliable likes array check with post.liked boolean',
          },
          {
            icon: FaBug,
            text: 'Fixed PostPage onSuccess callback (deprecated in TQ v5) replaced with useEffect + initialized flag',
          },
          {
            icon: FaBug,
            text: 'Fixed comment delete not refreshing list — now properly invalidates [comments, postId] query',
          },
        ],
      },
    ],
  },
  {
    version: '1.5.0',
    date: 'January 2026',
    label: 'Feature Update',
    labelColor: 'from-violet-500 to-purple-600',
    labelIcon: FaStar,
    highlight: false,
    summary:
      'Expanded social graph features, post page overhaul, and notification infrastructure.',
    sections: [
      {
        type: 'new',
        icon: FaRocket,
        color: 'from-pink-500 to-rose-500',
        bg: 'bg-pink-50 dark:bg-pink-900/10',
        border: 'border-pink-200 dark:border-pink-800/40',
        title: 'New Features',
        items: [
          {
            icon: FaBell,
            text: 'Notification system with real-time unread count polling',
          },
          {
            icon: FaUserCircle,
            text: 'User profile pages with followers / following tabs',
          },
          {
            icon: FaShare,
            text: 'Post sharing with embedded original post preview',
          },
          {
            icon: FaSearch,
            text: 'Suggested friends discovery page with filter tabs',
          },
        ],
      },
      {
        type: 'improved',
        icon: FaBolt,
        color: 'from-violet-500 to-indigo-500',
        bg: 'bg-violet-50 dark:bg-violet-900/10',
        border: 'border-violet-200 dark:border-violet-800/40',
        title: 'Improvements',
        items: [
          {
            icon: FaImage,
            text: 'Post images use lazy loading and optimized aspect ratios',
          },
          {
            icon: FaComments,
            text: 'Comment sheet redesigned with reply threading and creator avatars',
          },
          {
            icon: FaBolt,
            text: 'Feed pagination added — 5 posts per page with HeroUI Pagination component',
          },
        ],
      },
    ],
  },
  {
    version: '1.2.0',
    date: 'December 2025',
    label: 'Stability',
    labelColor: 'from-emerald-500 to-teal-600',
    labelIcon: FaShieldAlt,
    highlight: false,
    summary:
      'Performance hardening, dark mode refinements, and accessibility improvements.',
    sections: [
      {
        type: 'improved',
        icon: FaBolt,
        color: 'from-violet-500 to-indigo-500',
        bg: 'bg-violet-50 dark:bg-violet-900/10',
        border: 'border-violet-200 dark:border-violet-800/40',
        title: 'Improvements',
        items: [
          {
            icon: FaShieldAlt,
            text: 'Protected routes now handle unauthenticated users with graceful redirects',
          },
          {
            icon: FaWrench,
            text: 'React Query staleTime and cacheTime tuned per endpoint for optimal freshness',
          },
          {
            icon: FaHeart,
            text: 'Dark mode colour tokens unified — eliminated all hardcoded colour values in components',
          },
        ],
      },
      {
        type: 'fixed',
        icon: FaBug,
        color: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
        border: 'border-emerald-200 dark:border-emerald-800/40',
        title: 'Bug Fixes',
        items: [
          {
            icon: FaBug,
            text: 'Fixed token expiry not clearing localStorage on 401 response',
          },
          {
            icon: FaBug,
            text: 'Fixed mobile nav overflow causing horizontal scroll on small screens',
          },
          {
            icon: FaBug,
            text: 'Fixed avatar fallback showing broken image instead of initial letter',
          },
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: 'November 2025',
    label: 'Initial Release',
    labelColor: 'from-amber-500 to-orange-500',
    labelIcon: FaCrown,
    highlight: false,
    summary:
      'The first public release of Nexora — core authentication, post feed, comments, and profile.',
    sections: [
      {
        type: 'new',
        icon: FaRocket,
        color: 'from-pink-500 to-rose-500',
        bg: 'bg-pink-50 dark:bg-pink-900/10',
        border: 'border-pink-200 dark:border-pink-800/40',
        title: 'Initial Features',
        items: [
          {
            icon: FaUserCircle,
            text: 'User registration, login, and JWT authentication',
          },
          {
            icon: FaImage,
            text: 'Create, edit, and delete posts with photo upload',
          },
          { icon: FaComments, text: 'Comment on posts with basic CRUD' },
          { icon: FaHeart, text: 'Like and unlike posts' },
          { icon: FaBookmark, text: 'Bookmark posts to a personal library' },
          { icon: FaUsers, text: 'Explore feed with all public posts' },
          {
            icon: FaShieldAlt,
            text: 'Privacy settings per post — Public, Followers, Private',
          },
        ],
      },
    ],
  },
];

const TYPE_META = {
  new: {
    label: 'New',
    cls: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  },
  improved: {
    label: 'Improved',
    cls: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
  },
  fixed: {
    label: 'Fixed',
    cls: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  },
};

function SectionBlock({ section }) {
  const Icon = section.icon;
  const meta = TYPE_META[section.type];

  return (
    <div className={`rounded-2xl border ${section.border} ${section.bg} p-5`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className={`w-8 h-8 rounded-xl bg-linear-to-br ${section.color} flex items-center justify-center shadow-sm`}
        >
          <Icon className="text-white text-xs" />
        </div>
        <span
          className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${meta.cls}`}
        >
          {meta.label}
        </span>
        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
          {section.title}
        </span>
      </div>
      <ul className="space-y-2.5">
        {section.items.map((item, i) => {
          const ItemIcon = item.icon;
          return (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-lg bg-linear-to-br ${section.color} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
              >
                <ItemIcon className="text-white text-[8px]" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ReleaseCard({ release }) {
  const [expanded, setExpanded] = useState(release.highlight);
  const LabelIcon = release.labelIcon;

  return (
    <div
      className={`relative rounded-3xl border-2 overflow-hidden transition-all duration-300 ${release.highlight ? 'border-pink-300 dark:border-pink-700/60 shadow-xl shadow-pink-500/10' : 'border-gray-200 dark:border-gray-700/60 shadow-md'} bg-white dark:bg-[#1E2939]`}
    >
      <button
        onClick={() => !release.highlight && setExpanded(p => !p)}
        className={`w-full flex items-start justify-between gap-4 p-6 text-left transition-colors ${!release.highlight ? 'hover:bg-gray-50 dark:hover:bg-gray-800/30 cursor-pointer' : 'cursor-default'}`}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="shrink-0">
            <div
              className={`inline-flex items-center gap-1.5 bg-linear-to-r ${release.labelColor} text-white px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-md`}
            >
              <LabelIcon className="text-[10px]" />v{release.version}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${TYPE_META.new.cls}`}
              >
                {release.label}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <FaCalendar className="text-[10px]" />
                {release.date}
              </div>
              {release.highlight && (
                <Chip
                  size="sm"
                  className="bg-linear-to-r from-pink-500 to-indigo-500 text-white text-[10px] font-extrabold border-none animate-pulse"
                >
                  Latest
                </Chip>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {release.summary}
            </p>
          </div>
        </div>

        {!release.highlight && (
          <div
            className={`w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
          >
            <FaArrowRight className="text-gray-400 text-[10px]" />
          </div>
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[9999px]' : 'max-h-0'}`}
      >
        <div className="px-6 pb-6 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4">
          {release.sections.map((section, i) => (
            <SectionBlock key={i} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

const QUICK_STATS = [
  {
    label: 'Current Version',
    value: '2.0.0',
    icon: FaTag,
    color: 'text-pink-500',
  },
  {
    label: 'Total Releases',
    value: '4',
    icon: MdNewReleases,
    color: 'text-violet-500',
  },
  {
    label: 'Features Added',
    value: '30+',
    icon: FaStar,
    color: 'text-amber-500',
  },
  {
    label: 'Bugs Squashed',
    value: '9',
    icon: FaBug,
    color: 'text-emerald-500',
  },
];

function Updates() {
  return (
    <>
      <SEO
        title="Updates & Changelog"
        description="See what's new in Nexora — feature releases, improvements and bug fixes"
        path="/updates"
      />

      <div className="w-full min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-14 relative">
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[280px] bg-linear-to-r from-pink-500/10 via-violet-500/8 to-indigo-500/10 blur-3xl rounded-full" />
            </div>

            <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full shadow-md mb-6">
              <MdNewReleases className="text-pink-500 text-sm" />
              <span className="text-xs font-bold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent tracking-wide uppercase">
                Changelog
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-none mb-5 tracking-tight">
              <span className="bg-linear-to-r from-pink-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                What's new
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">in Nexora.</span>
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
              Every fix, every feature, every improvement — documented here so
              you always know what changed and why.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-white dark:bg-[#1E2939] border border-gray-200 dark:border-gray-700 rounded-2xl p-1.5 shadow-lg">
              {QUICK_STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                  >
                    <Icon className={`${s.color} text-sm shrink-0`} />
                    <div className="text-left">
                      <p className="text-sm font-extrabold text-gray-900 dark:text-white leading-none">
                        {s.value}
                      </p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                        {s.label}
                      </p>
                    </div>
                    {i < QUICK_STATS.length - 1 && (
                      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 ml-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-linear-to-b from-pink-400 via-violet-400 to-transparent hidden sm:block" />

            <div className="space-y-6 sm:pl-16">
              {RELEASES.map(release => (
                <div key={release.version} className="relative">
                  <div
                    className={`absolute -left-[52px] top-6 w-4 h-4 rounded-full border-2 border-white dark:border-[#0f172a] shadow-md hidden sm:flex items-center justify-center bg-linear-to-br ${release.labelColor}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <ReleaseCard release={release} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://github.com/Abdelrahman968/nexora-route"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900 dark:bg-gray-950 border border-gray-700 hover:border-gray-500 text-white hover:scale-[1.02] transition-all duration-200 shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                <FaGithub className="text-2xl" />
              </div>
              <div>
                <p className="font-extrabold text-sm">View on GitHub</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Star the repo, open issues, or contribute
                </p>
              </div>
              <FaArrowRight className="text-gray-500 text-xs ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <Link
              to="/features"
              className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-r from-pink-600 to-indigo-600 text-white hover:scale-[1.02] transition-all duration-200 shadow-lg group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                <FaLightbulb className="text-2xl" />
              </div>
              <div>
                <p className="font-extrabold text-sm">Explore all features</p>
                <p className="text-xs text-white/70 mt-0.5">
                  See everything Nexora can do right now
                </p>
              </div>
              <FaArrowRight className="text-white/60 text-xs ml-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updates;
