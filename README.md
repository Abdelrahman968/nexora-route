<div align="center">

<img src="public/logo.png" alt="Nexora Logo" width="80" height="80" />

# 🌐 Nexora

### A modern full-featured social media platform built with React 19

[![Version](https://img.shields.io/badge/version-2.0.0-ec4899?style=for-the-badge)](https://github.com/Abdelrahman968/nexora-route)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=for-the-badge&logo=netlify&logoColor=white)](https://nexora-route.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Abdelrahman968/nexora-route)

[🚀 Live Demo](https://nexora-route.netlify.app/) &nbsp;·&nbsp; [🐛 Report Bug](https://github.com/Abdelrahman968/nexora-route/issues) &nbsp;·&nbsp; [✨ Request Feature](https://github.com/Abdelrahman968/nexora-route/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [What's New in v2.0](#-whats-new-in-v20)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Context Architecture](#-context-architecture)
- [API Documentation](#-api-documentation)
- [Pages & Routes](#-pages--routes)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🎯 About The Project

**Nexora** is a full-featured social media platform where users can connect, share posts, react to content, follow people, and build their network. Built with the latest React 19, TanStack Query v5, and HeroUI, Nexora delivers a seamless and polished experience across all devices.

### ✨ Why Nexora?

|                             |                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------- |
| 🚀 **React 19**             | Latest features for optimal rendering and concurrent mode                         |
| ⚡ **TanStack Query v5**    | Infinite queries, optimistic updates, and smart cache invalidation                |
| 🎨 **HeroUI + Tailwind 4**  | Beautiful, accessible components with utility-first styling                       |
| 🔐 **Context Architecture** | Dedicated contexts for Auth, Posts, Follow, QuickActions, Comments, Notifications |
| 📱 **Fully Responsive**     | Mobile-first design that looks great on every screen                              |
| 🌙 **Dark Mode Native**     | First-class dark mode support across every component                              |

---

## 🆕 What's New in v2.0

> Full changelog at [`/updates`](https://nexora-route.netlify.app/updates)

### 🚀 New Features

- **Follow / Unfollow** with optimistic UI, mutual follower badges, and paginated suggestions
- **Infinite pagination** on suggestions, comments, and replies via `useInfiniteQuery`
- **Real-time notifications** — unread badge, mark-one-read, mark-all-read
- **Full comment & reply system** — create, edit, delete, like, paginated replies via `CommentContext`
- **Repost with caption** — inline on feed, post card, and post page
- **Bookmark toggle** with paginated library, sort by date or popularity
- **Image expand modal** on ProfilePostCard with download support
- **Pricing page** — Free / Pro / Elite with monthly/yearly toggle and feature comparison table
- **Features showcase** page with interactive hover cards
- **Updates & changelog** page

### 🔧 Architecture Changes

- All like / bookmark mutations extracted to `QuickActionsContext` — no more prop-drilled mutations
- `CommentContext` is now the single source of truth for all comment state across the app
- `FollowContext` migrated to `useInfiniteQuery` for proper paginated suggestions
- `queryClient.invalidateQueries` updated to TQ v5 object syntax throughout

### 🐛 Bug Fixes

- Fixed `FollowContext` crash — `QueryClient` called on class instead of hook instance
- Fixed `axios.put` auth header passed as body instead of config
- Fixed `WhoToFollow` undefined context crash when rendered outside provider
- Fixed post liked state initialization using unreliable `likes[]` array
- Fixed `PostPage` deprecated `onSuccess` callback replaced with `useEffect`

---

## 🛠️ Tech Stack

### Core

| Package                 | Version  | Purpose                                 |
| ----------------------- | -------- | --------------------------------------- |
| `react`                 | ^19.2.0  | UI library                              |
| `react-dom`             | ^19.2.0  | DOM renderer                            |
| `react-router-dom`      | ^7.13.0  | Client-side routing                     |
| `axios`                 | ^1.13.5  | HTTP client                             |
| `@tanstack/react-query` | ^5.90.21 | Server state, caching, infinite queries |

### UI & Styling

| Package         | Version  | Purpose           |
| --------------- | -------- | ----------------- |
| `@heroui/react` | ^2.8.9   | Component library |
| `tailwindcss`   | ^4.1.18  | Utility-first CSS |
| `framer-motion` | ^12.34.0 | Animations        |
| `react-icons`   | ^5.5.0   | Icon sets         |

### Forms & Utilities

| Package                | Version | Purpose                 |
| ---------------------- | ------- | ----------------------- |
| `react-hook-form`      | ^7.71.1 | Form state & validation |
| `react-head`           | ^3.4.2  | Document head / SEO     |
| `emoji-picker-element` | ^1.29.0 | Emoji support in posts  |

### Build & Dev

| Package                | Version | Purpose            |
| ---------------------- | ------- | ------------------ |
| `vite`                 | ^7.3.1  | Build tool         |
| `@vitejs/plugin-react` | ^5.1.1  | React fast refresh |
| `eslint`               | ^9.39.1 | Linting            |

### Backend API

- **Base URL**: `https://linked-posts.routemisr.com`
- **Auth**: Bearer token (JWT) via `Authorization` header
- **Storage**: Cloudflare R2 for media

---

## 🌟 Features

### 👤 Authentication & Users

- Registration, login, and JWT token management
- Profile photo upload to Cloudflare R2
- Password change with token rotation
- Follow / unfollow with mutual follower count
- Paginated follow suggestions

### 📝 Posts & Feed

- Create posts with body text and image upload
- Edit and delete own posts
- Home timeline — All / Following / Me tabs
- Privacy per post — Public, Followers only, Private
- Like / unlike with optimistic updates
- Bookmark / unbookmark with instant toggle
- Repost with optional caption

### 💬 Comments & Replies

- Paginated comments via infinite scroll
- Nested replies with their own pagination
- Like comments
- Edit and delete own comments
- Images in comments

### 🔔 Notifications

- Real-time unread badge count
- Mark individual or all notifications as read
- Paginated notification list

### 📄 Pages

- Explore feed with trending topics sidebar and Who to Follow
- Bookmarks library with sort controls
- Suggested friends grid with search and filter
- Individual post page with full comment thread
- User profiles with posts grid
- Pricing page (Free / Pro / Elite)
- Features showcase
- Changelog / Updates
- About, Contact, Support, Download App
- Privacy Policy, Terms of Service, Cookie Policy, Licensing, Press Kit

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Abdelrahman968/nexora-route.git
cd nexora-route

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Environment Variables

```env
VITE_BASE_URL=https://linked-posts.routemisr.com
```

### Development

```bash
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

### Available Scripts

```bash
npm run dev        # Start dev server with HMR
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 📁 Project Structure

```
nexora/
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   ├── component/
│   │   ├── Comment/
│   │   │   └── Comment.jsx          # Comments sheet + DeleteModal + ShareModal
│   │   ├── CreatePost/
│   │   │   └── CreatePost.jsx
│   │   ├── Donation/
│   │   ├── DownloadApp/
│   │   ├── Error/
│   │   ├── Explore/
│   │   │   └── Explore.jsx          # Feed tabs + WhoToFollow sidebar
│   │   ├── ForgotPassword/
│   │   ├── Loading/
│   │   ├── Login/
│   │   ├── Navbar/
│   │   ├── Notifications/
│   │   ├── PostCard/
│   │   │   └── PostCard.jsx         # Feed post card (optimistic like/bookmark)
│   │   ├── Postpage/
│   │   │   └── Postpage.jsx         # Full post page with comments
│   │   ├── Profile/
│   │   │   ├── Profile.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── ProfilePostCard/
│   │   │   └── ProfilePostCard.jsx  # Grid card with hover overlay
│   │   ├── Register/
│   │   ├── SEO/
│   │   │   └── SEO.jsx
│   │   ├── Settings/
│   │   ├── SuggestedFriends/
│   │   │   └── SuggestedFriends.jsx # Full suggested friends page
│   │   ├── Support/
│   │   ├── Footer/
│   │   └── WhoToFollow/
│   │       └── WhoToFollow.jsx      # Sidebar widget (real API)
│   ├── context/
│   │   ├── AuthContext.jsx          # JWT token + user session
│   │   ├── CommentContext.jsx       # Comments, replies, likes CRUD
│   │   ├── FollowContext.jsx        # Suggestions (infinite), follow toggle
│   │   ├── NotificationContext.jsx  # Notifications + unread count
│   │   ├── PostContext.jsx          # Home feed with tab switching
│   │   ├── ProfileInfoContext.jsx   # Current user profile data
│   │   ├── ProtectedRoute.jsx       # Auth guard HOC
│   │   ├── QuickActionsContext.jsx  # Post like, likes list, bookmark
│   │   └── ToastContext.jsx         # Global toast notifications
│   ├── pages/
│   │   ├── About/
│   │   ├── Bookmarks/
│   │   │   └── Bookmarks.jsx
│   │   ├── Contact/
│   │   ├── Cookiepolicy/
│   │   ├── Error404/
│   │   ├── Features/
│   │   │   └── Features.jsx         # Feature showcase page
│   │   ├── Home/
│   │   ├── Layout/
│   │   │   └── Layout.jsx
│   │   ├── Licensing/
│   │   ├── Presskit/
│   │   ├── Pricing/
│   │   │   └── Pricing.jsx          # Plans + comparison table + FAQ
│   │   ├── PrivacyPolicy/
│   │   ├── Termsofservice/
│   │   └── Updates/
│   │       └── Updates.jsx          # Changelog page
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 🏗️ Context Architecture

Nexora uses a layered context system. Each context has a single responsibility:

```
App
└── HeroUIProvider
    └── QueryClientProvider
        └── ToastContextProvider
            └── RouterProvider
                └── AuthContextProvider           # JWT session
                    └── ProfileInfoContextProvider # Current user data
                        └── NotificationProvider  # Unread count + list
                            └── QuickActionsProvider # Post like / bookmark
                                └── CommentProvider  # Comments / replies
                                    └── ProtectedRoute
                                        └── Layout
                                            ├── PostContextProvider  # Feed (per route)
                                            └── FollowContextProvider # Suggestions (per route)
```

### Context Responsibilities

| Context               | Exports                                                                                                          | Used by                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `AuthContext`         | `userToken`, `userData`, `logout`                                                                                | All authenticated requests          |
| `ProfileInfoContext`  | `safeProfileInfo`                                                                                                | Avatar, name, isOwner checks        |
| `QuickActionsContext` | `toggleLike`, `toggleBookmark`, `usePostLikes`                                                                   | PostCard, PostPage, ProfilePostCard |
| `CommentContext`      | `useComments`, `useReplies`, `createComment`, `createReply`, `editComment`, `deleteComment`, `toggleCommentLike` | Comment, PostPage                   |
| `FollowContext`       | `suggestions`, `loadMore`, `handleFollow`, `isFollowed`                                                          | WhoToFollow, SuggestedFriends       |
| `PostContext`         | `safeHomeFeedData`, `fetchHomeFeedType`                                                                          | Explore                             |
| `NotificationContext` | `notifications`, `unreadCount`, `markRead`, `markAllRead`                                                        | Notifications, Navbar               |

---

## 📡 API Documentation

### Base URL

```
https://linked-posts.routemisr.com
```

### Response Contract

**Success**

```json
{
  "success": true,
  "message": "success",
  "data": {},
  "meta": {}
}
```

**Error**

```json
{
  "success": false,
  "message": "Validation error message",
  "errors": ["field error 1", "field error 2"]
}
```

---

### 👤 Users & Auth

| Method  | Endpoint                          | Purpose                              | Auth |
| ------- | --------------------------------- | ------------------------------------ | ---- |
| `POST`  | `/users/signup`                   | Create account, returns token + user | No   |
| `POST`  | `/users/signin`                   | Sign in, returns token + user        | No   |
| `PATCH` | `/users/change-password`          | Rotate password and token            | Yes  |
| `PUT`   | `/users/upload-photo`             | Upload profile photo to R2           | Yes  |
| `GET`   | `/users/profile-data`             | Current authenticated user profile   | Yes  |
| `GET`   | `/users/suggestions?page=&limit=` | Follow suggestions with pagination   | Yes  |
| `PUT`   | `/users/:userId/follow`           | Toggle follow / unfollow             | Yes  |

#### Register

```http
POST /users/signup
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "rePassword": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "gender": "male | female"
}
```

#### Login

```http
POST /users/signin
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

---

### 📝 Posts & Feed

| Method   | Endpoint                            | Purpose                              | Auth |
| -------- | ----------------------------------- | ------------------------------------ | ---- |
| `GET`    | `/posts`                            | Public post listing (newest first)   | Yes  |
| `GET`    | `/posts/feed?only=&page=&limit=`    | Home timeline (following / me / all) | Yes  |
| `GET`    | `/posts/:postId`                    | Single post with comments            | Yes  |
| `POST`   | `/posts`                            | Create post with body / image        | Yes  |
| `PUT`    | `/posts/:postId`                    | Update body / image                  | Yes  |
| `DELETE` | `/posts/:postId`                    | Delete own post                      | Yes  |
| `PUT`    | `/posts/:postId/like`               | Toggle like                          | Yes  |
| `GET`    | `/posts/:postId/likes?page=&limit=` | Users who liked a post               | Yes  |
| `PUT`    | `/posts/:postId/bookmark`           | Toggle bookmark                      | Yes  |
| `POST`   | `/posts/:postId/share`              | Create repost linked to original     | Yes  |

#### Create Post

```http
POST /posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

body: "string"
image: File (optional)
privacy: "public | following | private"
```

---

### 💬 Comments & Replies

| Method   | Endpoint                                                  | Purpose                       | Auth |
| -------- | --------------------------------------------------------- | ----------------------------- | ---- |
| `GET`    | `/posts/:postId/comments?page=&limit=`                    | Paginated post comments       | Yes  |
| `POST`   | `/posts/:postId/comments`                                 | Create comment (text / image) | Yes  |
| `PUT`    | `/posts/:postId/comments/:commentId`                      | Edit comment (owner only)     | Yes  |
| `DELETE` | `/posts/:postId/comments/:commentId`                      | Delete (owner or post owner)  | Yes  |
| `PUT`    | `/posts/:postId/comments/:commentId/like`                 | Toggle comment like           | Yes  |
| `GET`    | `/posts/:postId/comments/:commentId/replies?page=&limit=` | Paginated replies             | Yes  |
| `POST`   | `/posts/:postId/comments/:commentId/replies`              | Create reply                  | Yes  |

---

### 🔔 Notifications

| Method  | Endpoint                              | Purpose                                | Auth |
| ------- | ------------------------------------- | -------------------------------------- | ---- |
| `GET`   | `/notifications?page=&limit=`         | Notifications list with entity details | Yes  |
| `GET`   | `/notifications/unread-count`         | Unread badge count                     | Yes  |
| `PATCH` | `/notifications/:notificationId/read` | Mark one as read                       | Yes  |
| `PATCH` | `/notifications/read-all`             | Mark all as read                       | Yes  |

---

### 🔖 Bookmarks

| Method | Endpoint                        | Purpose                     | Auth |
| ------ | ------------------------------- | --------------------------- | ---- |
| `GET`  | `/users/bookmarks?page=&limit=` | Paginated bookmarks library | Yes  |
| `PUT`  | `/posts/:postId/bookmark`       | Toggle bookmark on a post   | Yes  |

---

## 🗺️ Pages & Routes

| Route              | Component          | Auth Required |
| ------------------ | ------------------ | ------------- |
| `/`                | `Home`             | No            |
| `/explore`         | `Explore`          | Yes           |
| `/posts/:postId`   | `PostPage`         | Yes           |
| `/profile`         | `Profile`          | Yes           |
| `/profile/:id`     | `UserProfile`      | Yes           |
| `/notifications`   | `Notifications`    | Yes           |
| `/bookmarks`       | `Bookmarks`        | Yes           |
| `/suggestions`     | `SuggestedFriends` | Yes           |
| `/settings`        | `Settings`         | Yes           |
| `/login`           | `Login`            | No            |
| `/register`        | `Register`         | No            |
| `/forgot-password` | `ForgotPassword`   | No            |
| `/pricing`         | `Pricing`          | No            |
| `/features`        | `Features`         | No            |
| `/updates`         | `Updates`          | No            |
| `/about`           | `About`            | No            |
| `/contact`         | `Contact`          | No            |
| `/support`         | `Support`          | No            |
| `/download`        | `DownloadApp`      | No            |
| `/donation`        | `Donation`         | No            |
| `/privacy`         | `PrivacyPolicy`    | No            |
| `/terms`           | `TermsOfService`   | No            |
| `/cookies`         | `CookiePolicy`     | No            |
| `/licensing`       | `Licensing`        | No            |
| `/press-kit`       | `PressKit`         | No            |
| `*`                | `Error404`         | No            |

---

## 🤝 Contributing

Contributions are welcome and greatly appreciated!

1. **Fork** the repository
2. **Create** your feature branch — `git checkout -b feature/your-feature`
3. **Commit** your changes — `git commit -m 'feat: add your feature'`
4. **Push** to the branch — `git push origin feature/your-feature`
5. **Open** a Pull Request

Please follow the existing code patterns — use the context system for shared state, prefer optimistic updates for UX-sensitive actions, and keep components focused on presentation.

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdelrahman**

- GitHub: [@Abdelrahman968](https://github.com/Abdelrahman968)
- Email: se.abdelrahman968@gmail.com
- Live Demo: [nexora-route.netlify.app](https://nexora-route.netlify.app/)
- Project: [github.com/Abdelrahman968/nexora-route](https://github.com/Abdelrahman968/nexora-route)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) — UI library
- [TanStack Query](https://tanstack.com/query) — Server state management
- [Vite](https://vitejs.dev/) — Blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [HeroUI](https://www.heroui.com/) — Beautiful component library
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Route Academy](https://documenter.getpostman.com/view/5709532/2sA3JT4Jzs) — API provider
- [Netlify](https://www.netlify.com/) — Hosting & CI/CD

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by [Abdelrahman](https://github.com/Abdelrahman968)

</div>
