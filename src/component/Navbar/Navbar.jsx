import { Button, Input, Switch } from '@heroui/react';
import {
  FaHome,
  FaCompass,
  FaPlus,
  FaBell,
  FaCommentAlt,
  FaUser,
  FaSignOutAlt,
  FaSearch,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { BiLogoMagento } from 'react-icons/bi';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from '../../assets/avatar.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setIsLoggedIn(true);
        const res = await axios.get(
          'https://linked-posts.routemisr.com/users/profile-data',
          {
            headers: { token },
          }
        );
        setProfile(res.data);
      } catch (err) {
        console.error(
          'Profile fetch error:',
          err.response?.data || err.message
        );
        setIsLoggedIn(false);
        setProfile(null);
      }
    };

    fetchProfile();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setProfile(null);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <>
      <nav className="border-b border-default px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl p-2 rounded-lg transition-colors"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="flex items-center gap-6 flex-1">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="p-2 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg">
                <BiLogoMagento className=" text-xl" />
              </div>
              <p className="font-bold text-xl hidden sm:block">Nexora</p>
            </Link>

            <div className="hidden md:flex relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <Input
                type="text"
                placeholder="Search Nexora..."
                className="w-full"
                classNames={{
                  input: 'text-white pl-10 border-none  z-20',
                  inputWrapper:
                    ' border-none hover:bg-[#1A1F26] focus:bg-[#1A1F26] ',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <NavLink
              to="/"
              className="nav-link hidden md:flex items-center gap-2 active:scale-105 px-4 py-2 rounded-lg transition-colors"
            >
              <FaHome className="text-xl" />
              <span className="hidden lg:inline">Home</span>
            </NavLink>

            <NavLink
              to="/explore"
              className="nav-link hidden md:flex items-center gap-2 active:scale-105 px-4 py-2 rounded-lg transition-colors"
            >
              <FaCompass className="text-xl" />
              <span className="hidden lg:inline">Explore</span>
            </NavLink>

            <NavLink
              to="/create-post"
              className="hidden md:block p-3 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg transition-colors cursor-pointer active:scale-105"
            >
              <FaPlus className="text-lg" />
            </NavLink>

            <NavLink
              to="/notifications"
              className="p-2 md:p-3 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg transition-colors relative cursor-pointer active:scale-105"
            >
              <FaBell className="text-lg" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </NavLink>

            <NavLink
              to="/messages"
              className="hidden md:block p-3 bg-[#E5E7EB] dark:bg-[#1E2939] rounded-lg transition-colors cursor-pointer active:scale-105"
            >
              <FaCommentAlt className="text-lg" />
            </NavLink>

            <div className="hidden md:flex items-center">
              <Switch
                color="primary"
                size="sm"
                startContent={<FaMoon className="text-xs" />}
                endContent={<FaSun className="text-xs" />}
                isSelected={isDark}
                onValueChange={() => setIsDark(prev => !prev)}
              />
            </div>

            {isLoggedIn ? (
              <div className="relative">
                <img
                  src={profile?.user?.photo || avatar}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-700 hover:border-blue-500 transition-colors"
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 shadow-lg rounded-lg z-50 border-2 border-gray-800 overflow-hidden p-2 bg-[#e5e7eb] dark:bg-[#1E2939]">
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-3  rounded-lg transition-colors hover:bg-[#d1d5db] dark:hover:bg-[#16202D]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser /> {profile?.user?.name}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3  rounded-lg text-left transition-colors hover:bg-[#d1d5db] dark:hover:bg-[#16202D]"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="relative">
                  <img
                    src={avatar}
                    alt="profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-700 hover:border-blue-500 transition-colors"
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                  />
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 shadow-lg rounded-lg z-50 border-2 border-gray-800 overflow-hidden p-2 flex flex-col gap-2 bg-[#e5e7eb] dark:bg-[#1E2939]">
                      <Link
                        to="/login"
                        className="hidden md:block hover:bg-[#d1d5db]  dark:hover:bg-[#16202D] px-4 py-2 rounded-lg transition-colors"
                      >
                        Login
                      </Link>
                      <Button
                        as={Link}
                        className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white"
                        to="/register"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-b border-gray-800 px-4 py-4">
          <div className="flex flex-col gap-3">
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <Input
                type="text"
                placeholder="Search Nexora..."
                classNames={{
                  input: 'pl-10 border-none relative z-20',
                  inputWrapper: 'border-none hover:bg-[#0F1419] relative',
                }}
              />
            </div>

            <Link
              to="/"
              className="flex items-center gap-3  px-4 py-3 rounded-lg transition-colors hover:bg-[#e5e7eb] dark:hover:bg-[#1E2939]"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className="text-xl" />
              <span>Home</span>
            </Link>

            <Link
              to="/explore"
              className="flex items-center gap-3  px-4 py-3 rounded-lg transition-colors hover:bg-[#e5e7eb] dark:hover:bg-[#1E2939]"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaCompass className="text-xl" />
              <span>Explore</span>
            </Link>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-left bg-[#e5e7eb] dark:bg-[#1E2939] cursor-pointer active:scale-105">
                <FaPlus className="text-xl" />
                <span>Create</span>
              </button>

              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-left bg-[#e5e7eb] dark:bg-[#1E2939] cursor-pointer active:scale-105">
                <FaCommentAlt className="text-xl" />
                <span>Messages</span>
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-[#e5e7eb] dark:bg-[#1E2939] rounded-lg">
              <span>Change Theme</span>
              <Switch
                color="primary"
                size="sm"
                startContent={<FaMoon className="text-xs" />}
                endContent={<FaSun className="text-xs" />}
                isSelected={isDark}
                onValueChange={() => setIsDark(prev => !prev)}
              />
            </div>

            {!isLoggedIn && (
              <div className="flex flex-col gap-2 pt-3 border-t border-gray-700">
                <Button
                  as={Link}
                  to="/login"
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
