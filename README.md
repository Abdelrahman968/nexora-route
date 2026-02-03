# 🌐 Nexora - Social Media Platform

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-4F46E5?style=for-the-badge&logo=netlify&logoColor=white)](https://nexora-route.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Abdelrahman968/nexora-route)

**A modern social media platform built with React 19**

[Live Demo](https://nexora-route.netlify.app/) • [Report Bug](https://github.com/Abdelrahman968/nexora-route/issues) • [Request Feature](https://github.com/Abdelrahman968/nexora-route/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [Contact](#contact)

---

## 🎯 About The Project

**Nexora** is a full-featured social media platform that enables users to connect, share posts, interact with content, and build their network. Built with the latest React 19 features and powered by the Route Academy API, Nexora provides a seamless and modern user experience.

### ✨ Why Nexora?

- 🚀 **Modern Architecture**: Built with React 19 for optimal performance
- 🎨 **Beautiful UI**: Clean and intuitive interface with HeroUI and Tailwind CSS
- 🔐 **Secure**: Authentication and authorization built-in
- 📱 **Responsive**: Works seamlessly on all devices
- ⚡ **Fast**: Optimized for speed and performance with Vite

---

## 🌟 Features

### 👤 User Management

- ✅ User registration and authentication
- ✅ Profile settings and customization
- ✅ Password management
- ✅ User avatar support

### 📝 Posts & Content

- ✅ Create, read, update, and delete posts
- ✅ Image upload and sharing
- ✅ Post timeline/feed (Explore page)
- ✅ Personal posts view (My Posts)
- ✅ Real-time post updates

### 💬 Social Features

- ✅ Messages system
- ✅ Notifications center
- ✅ User interactions
- ✅ Comments on posts

### 📱 Pages & Navigation

- ✅ Home page with hero section
- ✅ About page
- ✅ Contact page
- ✅ Privacy Policy
- ✅ Licensing information
- ✅ Custom 404 error page
- ✅ Responsive navbar and footer
- ✅ Smooth scroll to top functionality

### 🎨 UI/UX

- ✅ Modern and clean interface
- ✅ Responsive design for all devices
- ✅ HeroUI components for polished UI
- ✅ Tailwind CSS for styling
- ✅ Framer Motion animations
- ✅ User-friendly navigation

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - Latest version with improved performance
- **Vite 7.2.4** - Fast build tool and development server
- **React Router DOM 7.13.0** - For navigation
- **Axios 1.13.4** - HTTP client for API requests

### UI & Styling

- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **HeroUI/React 2.8.8** - Modern UI component library
- **Framer Motion 12.29.2** - Animation library

### Forms & Validation

- **React Hook Form 7.71.1** - Performant form handling

### Additional Libraries

- **React Icons 5.5.0** - Icon library
- **React Helmet Async 2.0.5** - Document head management

### Backend API

- **Route Academy API** - RESTful API
- **Base URL**: `https://linked-posts.routemisr.com`

### Development Tools

- **ESLint 9.39.1** - Code linting
- **TypeScript Types** - Type definitions for React

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abdelrahman968/nexora-route.git
   cd nexora-route
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (if needed)

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=https://linked-posts.routemisr.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` (Vite default port)

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Build for Production

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist` folder.

---

## 📦 Package Information

### Project Details

- **Name**: social-route
- **Version**: 0.0.0
- **Type**: module
- **Private**: true

### Dependencies

#### Core Libraries

- `react: ^19.2.0` - UI library
- `react-dom: ^19.2.0` - React DOM renderer
- `react-router-dom: ^7.13.0` - Routing library

#### UI Components & Styling

- `@heroui/react: ^2.8.8` - UI component library
- `tailwindcss: ^4.1.18` - CSS framework
- `@tailwindcss/vite: ^4.1.18` - Tailwind CSS Vite plugin
- `framer-motion: ^12.29.2` - Animation library
- `react-icons: ^5.5.0` - Icon library

#### Forms & Data

- `react-hook-form: ^7.71.1` - Form management
- `axios: ^1.13.4` - HTTP client

#### SEO & Utilities

- `react-helmet-async: ^2.0.5` - Document head manager

### Dev Dependencies

- `vite: ^7.2.4` - Build tool
- `@vitejs/plugin-react: ^5.1.1` - React plugin for Vite
- `eslint: ^9.39.1` - Linter
- `@eslint/js: ^9.39.1` - ESLint JavaScript config
- `eslint-plugin-react-hooks: ^7.0.1` - React Hooks linting
- `eslint-plugin-react-refresh: ^0.4.24` - React Refresh linting
- `globals: ^16.5.0` - Global identifiers
- `@types/react: ^19.2.5` - React TypeScript types
- `@types/react-dom: ^19.2.3` - React DOM TypeScript types

---

## 📡 API Documentation

### Base URL

```
https://linked-posts.routemisr.com
```

### Authentication Endpoints

#### Register User

```http
POST /users/signup
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "rePassword": "string",
  "dateOfBirth": "string",
  "gender": "male|female"
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

#### Change Password

```http
PATCH /users/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "password": "string",
  "newPassword": "string"
}
```

### Posts Endpoints

#### Get All Posts

```http
GET /posts
Authorization: Bearer {token}
```

#### Get User Posts

```http
GET /posts?userId={userId}
Authorization: Bearer {token}
```

#### Create Post

```http
POST /posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "body": "string",
  "image": File
}
```

#### Update Post

```http
PUT /posts/{postId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "body": "string"
}
```

#### Delete Post

```http
DELETE /posts/{postId}
Authorization: Bearer {token}
```

### Comments Endpoints

#### Get Post Comments

```http
GET /comments?post={postId}
Authorization: Bearer {token}
```

#### Create Comment

```http
POST /comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "string",
  "post": "postId"
}
```

#### Update Comment

```http
PUT /comments/{commentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "string"
}
```

#### Delete Comment

```http
DELETE /comments/{commentId}
Authorization: Bearer {token}
```

### User Profile Endpoints

#### Get User Profile

```http
GET /users/profile-data
Authorization: Bearer {token}
```

#### Upload Profile Photo

```http
PUT /users/upload-photo
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "photo": File
}
```

---

## 📁 Project Structure

```
social-route/
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   │   └── avatar.png
│   ├── component/
│   │   ├── CreatePost/
│   │   │   └── CreatePost.jsx
│   │   ├── Explore/
│   │   │   ├── Explore.jsx
│   │   │   ├── MyPosts.jsx
│   │   │   └── Post.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   ├── Messages/
│   │   │   └── Messages.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── Notifications/
│   │   │   └── Notifications.jsx
│   │   ├── Register/
│   │   │   └── Register.jsx
│   │   ├── ScrollToTop/
│   │   │   └── ScrollToTop.jsx
│   │   └── Settings/
│   │       └── Settings.jsx
│   ├── pages/
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Error404/
│   │   │   └── Error404.jsx
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── style.css
│   │   ├── Layout/
│   │   │   └── Layout.jsx
│   │   ├── Licensing/
│   │   │   └── Licensing.jsx
│   │   └── PrivacyPolicy/
│   │       └── PrivacyPolicy.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── hero.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 💡 Usage Examples

### Authentication

```javascript
// Login
import { login } from './services/authService';

const handleLogin = async (email, password) => {
  try {
    const response = await login(email, password);
    localStorage.setItem('token', response.token);
    // Redirect to home page
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Creating a Post

```javascript
// Create Post
import { createPost } from './services/postsService';

const handleCreatePost = async (content, image) => {
  const formData = new FormData();
  formData.append('body', content);
  if (image) {
    formData.append('image', image);
  }

  try {
    const response = await createPost(formData);
    console.log('Post created:', response);
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};
```

### Fetching Posts

```javascript
// Get All Posts
import { getAllPosts } from './services/postsService';

const fetchPosts = async () => {
  try {
    const posts = await getAllPosts();
    setPosts(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};
```

---

## 📄 Project Pages

### Main Pages

- **Home** (`/`) - Landing page with hero section and main content
- **Explore** (`/explore`) - Browse all posts from users
- **My Posts** - View and manage your personal posts
- **Messages** (`/messages`) - Chat and messaging system
- **Notifications** (`/notifications`) - Stay updated with activities
- **Settings** (`/settings`) - Manage account preferences

### Authentication Pages

- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration

### Information Pages

- **About** (`/about`) - Learn about the platform
- **Contact** (`/contact`) - Get in touch
- **Privacy Policy** (`/privacy`) - Privacy terms and conditions
- **Licensing** (`/licensing`) - License information

### Special Pages

- **404 Error** - Custom error page for invalid routes

---

## 🎨 Screenshots

### Home Page

> _Main feed with posts from all users_

### User Profile

> _User profile page with personal posts_

### Create Post

> _Create and share new posts with images_

---

## 🔧 Configuration

### Vite Configuration

The project uses Vite as the build tool. Configuration is in `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
```

### API Configuration

Create an API service file (e.g., `src/services/api.js`):

```javascript
import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://linked-posts.routemisr.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Environment Variables

Vite uses `import.meta.env` for environment variables:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdelrahman**

- GitHub: [@Abdelrahman968](https://github.com/Abdelrahman968)
- Project Link: [https://github.com/Abdelrahman968/nexora-route](https://github.com/Abdelrahman968/nexora-route)
- Live Demo: [https://nexora-route.netlify.app/](https://nexora-route.netlify.app/)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite](https://vitejs.dev/) for blazing fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [HeroUI](https://www.heroui.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Route Academy](https://documenter.getpostman.com/view/5709532/2sA3JT4Jzs) for providing the API
- [Netlify](https://www.netlify.com/) for hosting
- All contributors who helped with this project

---

## 📞 Support

If you have any questions or need help, please:

- Open an issue on [GitHub Issues](https://github.com/Abdelrahman968/nexora-route/issues)
- Contact via email: se.abdelrahman968@gmail.com

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by [Abdelrahman](https://github.com/Abdelrahman968)

</div>
