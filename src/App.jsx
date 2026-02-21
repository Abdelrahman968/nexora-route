import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import { ToastContextProvider } from './context/ToastContext';
import ProfileInfoContextProvider from './context/ProfileInfoContext';
import NotificationProvider from './context/NotificationContext';

import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Error404 from './pages/Error404/Error404';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/Termsofservice/Termsofservice';
import CookiePolicy from './pages/Cookiepolicy/Cookiepolicy';
import Licensing from './pages/Licensing/Licensing';
import PressKit from './pages/Presskit/Presskit';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Contact from './pages/Contact/Contact';

import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Settings from './component/Settings/Settings';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import DownloadApp from './component/DownloadApp/DownloadApp';
import Support from './component/Support/Support';
import About from './pages/About/About';
import Explore from './component/Explore/Explore';
import Notifications from './component/Notifications/Notifications';
import Donation from './component/Donation/Donation';
import Profile from './component/Profile/Profile';
import SuggestedFriends from './component/SuggestedFriends/SuggestedFriends';
import UserProfile from './component/Profile/UserProfile';
import PostContextProvider from './context/PostContext';
import PostPage from './component/Postpage/Postpage';
import FollowContextProvider from './context/FollowContext';
import QuickActionsContextProvider from './context/QuickActionsContext';
import CommentProvider from './context/CommentContext';
import Features from './pages/Features/Features';
import Pricing from './pages/Pricing/Pricing';
import Updates from './pages/Updates/Updates';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import { Offline } from 'react-detect-offline';
import { FaWifi } from 'react-icons/fa';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextProvider>
        <ProfileInfoContextProvider>
          <NotificationProvider>
            <QuickActionsContextProvider>
              <CommentProvider>
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              </CommentProvider>
            </QuickActionsContextProvider>
          </NotificationProvider>
        </ProfileInfoContextProvider>
      </AuthContextProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      {
        path: 'settings',
        element: (
          <ProtectedRoute requireAuth={true}>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'explore',
        element: (
          <ProtectedRoute requireAuth={true}>
            <PostContextProvider>
              <FollowContextProvider>
                <Explore />
              </FollowContextProvider>
            </PostContextProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/:postId',
        element: (
          <ProtectedRoute requireAuth={true}>
            <PostContextProvider>
              <PostPage />
            </PostContextProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: 'notifications',
        element: (
          <ProtectedRoute requireAuth={true}>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute requireAuth={true}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/:id',
        element: (
          <ProtectedRoute requireAuth={true}>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'bookmarks',
        element: (
          <ProtectedRoute requireAuth={true}>
            <Bookmarks />
          </ProtectedRoute>
        ),
      },
      {
        path: 'suggestions',
        element: (
          <ProtectedRoute requireAuth={true}>
            <FollowContextProvider>
              <SuggestedFriends />
            </FollowContextProvider>
          </ProtectedRoute>
        ),
      },
      { path: 'download', element: <DownloadApp /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'support', element: <Support /> },
      { path: 'about', element: <About /> },
      { path: 'updates', element: <Updates /> },
      { path: 'donation', element: <Donation /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <TermsOfService /> },
      { path: 'cookies', element: <CookiePolicy /> },
      { path: 'licensing', element: <Licensing /> },
      { path: 'contact', element: <Contact /> },
      { path: 'features', element: <Features /> },
      { path: 'press-kit', element: <PressKit /> },
      { path: '*', element: <Error404 /> },
    ],
  },
  { path: 'soon', element: <ComingSoon /> },
]);

function App() {
  return (
    <>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContextProvider>
            <RouterProvider router={router} />
          </ToastContextProvider>
        </QueryClientProvider>
      </HeroUIProvider>
      <Offline>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <FaWifi className="text-xl" />
            <span>You are offline. Please check your connection.</span>
          </div>
        </div>
      </Offline>
    </>
  );
}

export default App;
