import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
  Switch,
  DropdownSection,
  Card,
  CardBody,
} from '@heroui/react';
import { BiLogoMagento } from 'react-icons/bi';
import {
  FaBars,
  FaCog,
  FaCompass,
  FaGithub,
  FaHome,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaSun,
  FaTimes,
  FaUser,
  FaBell,
  FaBookmark,
  FaInfoCircle,
  FaArrowRight,
  FaUserFriends,
  FaMedal,
} from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { MdContactSupport } from 'react-icons/md';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../context/AuthContext';
import Error from '../Error/Error';
import { NotificationContext } from '../../context/NotificationContext';

function MyNavbar() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { safeProfileInfo, isLoading, error } = useContext(ProfileInfoContext);
  const { logoutHandler } = useContext(AuthContext);
  const { unreadNotifications } = useContext(NotificationContext);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const user = safeProfileInfo.data.user;

  const navLinks = [
    {
      path: '/',
      icon: <FaHome className="text-xl" />,
      label: 'Home',
      show: true,
    },
    {
      path: '/explore',
      icon: <FaCompass className="text-xl" />,
      label: 'Explore',
      show: true,
    },
    {
      path: '/pricing',
      icon: <FaMedal className="text-xl" />,
      label: 'Pricing',
      show: true,
    },
    {
      path: '/support',
      icon: <MdContactSupport className="text-xl" />,
      label: 'Support',
      show: true,
      hideOnMobile: true,
    },
    {
      path: '/about',
      icon: <FaInfoCircle className="text-xl" />,
      label: 'About',
      show: true,
      hideOnMobile: true,
    },
  ];

  const quickActions = [
    {
      path: '/download',
      icon: <IoLogoGooglePlaystore className="text-lg" />,
      title: 'Google Play',
    },

    {
      path: 'https://github.com/Abdelrahman968',
      icon: <FaGithub className="text-lg" />,
      title: 'GitHub',
      external: true,
    },
  ];

  return (
    <>
      <Navbar maxWidth="xl" position="fixed" className="backdrop-blur-md">
        <NavbarBrand>
          <div className="flex items-center gap-6 flex-1">
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="p-2 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-xl font-extrabold">
                <BiLogoMagento className="text-xl text-white" />
              </div>
              <p className="font-extrabold text-xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {import.meta.env.VITE_APP_TITLE || 'Nexora'}
              </p>
            </Link>

            <Input
              classNames={{
                base: 'hidden sm:block max-w-full h-10',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper:
                  'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 hover:bg-default-400/30 dark:hover:bg-default-500/30',
              }}
              placeholder="Search..."
              size="sm"
              startContent={<FaSearch size={18} />}
              type="search"
            />
          </div>
        </NavbarBrand>

        <NavbarContent justify="end" className="gap-2">
          {quickActions.map((action, index) => (
            <NavLink
              key={index}
              to={action.path}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className="p-2 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg transition-all hover:scale-105 active:scale-95 hidden md:flex"
              title={action.title}
            >
              {action.icon}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="notifications"
              className="relative p-2 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg transition-all hover:scale-105 active:scale-95 flex"
            >
              <FaBell className="text-lg" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-2 px-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              )}
            </NavLink>
          )}

          <div className="items-center flex">
            <Switch
              color="primary"
              size="lg"
              startContent={<FaMoon className="text-xs" />}
              endContent={<FaSun className="text-xs" />}
              isSelected={isDark}
              onValueChange={() => setIsDark(prev => !prev)}
            />
          </div>
        </NavbarContent>
      </Navbar>

      <Navbar
        isBordered
        maxWidth="xl"
        height="3.5rem"
        className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600
        dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900"
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl p-2 rounded-lg transition-colors hover:bg-white/10 text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <NavbarContent className="hidden md:flex gap-2" justify="start">
          {navLinks.map(
            (link, index) =>
              link.show &&
              !link.hideOnMobile && (
                <NavbarItem key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/90 hover:bg-white/10'
                      }`
                    }
                  >
                    {link.icon}
                    <span className="hidden lg:inline">{link.label}</span>
                  </NavLink>
                </NavbarItem>
              )
          )}
        </NavbarContent>

        <NavbarContent justify="end">
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  showFallback
                  fallback={
                    <FaUser
                      className="animate-pulse"
                      fill="currentColor"
                      size={20}
                    />
                  }
                  isBordered
                  as="button"
                  className="transition-transform hover:scale-110"
                  color="secondary"
                  name={user.name || 'User'}
                  size="md"
                  radius="full"
                  src={user.photo || ''}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="w-56"
              >
                <DropdownSection showDivider>
                  <DropdownItem key="profile-info" className="h-14 gap-2">
                    <p className="font-semibold text-xs text-gray-500">
                      Signed in as
                    </p>
                    <p className="font-bold">
                      {user.name
                        ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                        : 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email || '@user'}
                    </p>
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection showDivider>
                  <DropdownItem key="Suggested Friends">
                    <Link
                      to="/suggestions"
                      className="flex items-center gap-2 w-full"
                    >
                      <FaUserFriends className="text-lg" />
                      <span>Suggested Friends</span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="profile">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 w-full"
                    >
                      <FaUser className="text-lg" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="bookmarks">
                    <Link
                      to="/bookmarks"
                      className="flex items-center gap-2 w-full"
                    >
                      <FaBookmark className="text-lg" />
                      <span>Bookmarks</span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 w-full"
                    >
                      <FaCog className="text-lg" />
                      <span>Settings</span>
                    </Link>
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={logoutHandler}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <FaSignOutAlt className="text-lg" />
                      <span>Log Out</span>
                    </div>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem className="flex">
                <Link to="/login" className="font-semibold">
                  <span className="hidden lg:inline text-white hover:text-white/80 transition-colors">
                    Login
                  </span>
                  <div className="text-lg lg:hidden p-2 rounded-lg transition-all bg-white/20 hover:bg-white/30 cursor-pointer active:scale-95 text-white">
                    <FaUser />
                  </div>
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  to="/register"
                  variant="flat"
                  className="font-semibold bg-white text-pink-600 hover:bg-white/90"
                >
                  Register
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed inset-0 bg-white dark:bg-[#1E2939] shadow-2xl animate-slideDown max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <BiLogoMagento className="text-2xl text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  {import.meta.env.VITE_APP_TITLE || 'Nexora'}
                </span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="text"
                  placeholder={`Search ${import.meta.env.VITE_APP_TITLE || 'Nexora'}...`}
                  classNames={{
                    input: 'pl-10',
                    inputWrapper:
                      'bg-[#E5E7EB] dark:bg-[#0F1419] border-none hover:bg-gray-300 dark:hover:bg-[#1a1f2e]',
                  }}
                />
              </div>

              {user && (
                <Card className="bg-linear-to-r from-pink-600 to-indigo-600">
                  <CardBody className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 text-white">
                        <p className="font-bold text-lg">
                          {user.name || 'User'}
                        </p>
                        <p className="text-sm opacity-90">
                          {user.email || '@user'}
                        </p>
                      </div>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                        <FaArrowRight className="text-white text-xl" />
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-[#e5e7eb] dark:hover:bg-[#0F1419] font-semibold active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-xl text-pink-600 dark:text-pink-400">
                      {link.icon}
                    </div>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {user && (
                <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                    <button className="flex items-center gap-3 w-full px-4 py-3 bg-[#e5e7eb] dark:bg-[#0F1419] rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-[#1a1f2e] transition-colors">
                      <FaCog className="text-xl text-blue-500" />
                      <span>Settings</span>
                    </button>
                  </Link>
                </div>
              )}

              <Card className="bg-[#e5e7eb] dark:bg-[#0F1419]">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDark ? (
                        <FaMoon className="text-xl text-indigo-500" />
                      ) : (
                        <FaSun className="text-xl text-yellow-500" />
                      )}
                      <span className="font-semibold">
                        {isDark ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </div>
                    <Switch
                      color="primary"
                      size="sm"
                      startContent={<FaMoon className="text-xs" />}
                      endContent={<FaSun className="text-xs" />}
                      isSelected={isDark}
                      onValueChange={() => setIsDark(prev => !prev)}
                    />
                  </div>
                </CardBody>
              </Card>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  Get the App
                </p>
                <div className="space-y-2">
                  <Link
                    to="/download"
                    className="flex items-center gap-3 p-3 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-xl hover:scale-101 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IoLogoGooglePlaystore className="text-2xl" />
                    <div className="text-left">
                      <div className="text-[10px] text-gray-600 dark:text-gray-400">
                        GET IT ON
                      </div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </Link>
                </div>
              </div>

              {!user && (
                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    as={Link}
                    to="/login"
                    className="w-full bg-linear-to-r from-pink-600 to-purple-600 text-white font-bold py-6"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="bordered"
                    className="w-full border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold py-6"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Button>
                </div>
              )}

              {user && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onPress={() => {
                      logoutHandler();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <FaSignOutAlt className="text-xl" />
                    <span>Log Out</span>
                  </Button>
                </div>
              )}

              <div className="text-center pt-4 pb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()}{' '}
                  {import.meta.env.VITE_APP_TITLE || 'Nexora'}. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyNavbar;
