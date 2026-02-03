import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Error404 from './pages/Error404/Error404';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Settings from './component/Settings/Settings';
import CreatePost from './component/CreatePost/CreatePost';
import Explore from './component/Explore/Explore';
import Notifications from './component/Notifications/Notifications';
import Messages from './component/Messages/Messages';
import About from './pages/About/About';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import Licensing from './pages/Licensing/Licensing';
import Contact from './pages/Contact/Contact';
import Post from './component/Explore/Post';
import MyPosts from './component/Explore/MyPosts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/explore',
        element: <Explore />,
      },
      {
        path: '/explore/:id',
        element: <Post />,
      },
      {
        path: '/explore/mine',
        element: <MyPosts />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/licensing',
        element: <Licensing />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
