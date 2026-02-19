import { BiLogoMagento } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaYoutube,
  FaHeart,
} from 'react-icons/fa';
import { IoLogoAppleAppstore, IoLogoGooglePlaystore } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';

function Footer() {
  const footerLinks = {
    product: [
      { name: 'Features', path: '/features' },
      { name: 'Download App', path: '/download' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Updates', path: '/updates' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Donation', path: '/donation' },
      { name: 'Press Kit', path: '/press-kit' },
      { name: 'Blog', path: '/soon' },
    ],
    support: [
      { name: 'Help Center', path: '/support' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQs', path: '/support' },
      { name: 'Community', path: '/suggestions' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Licensing', path: '/licensing' },
    ],
  };

  const socialLinks = [
    {
      icon: <FaFacebook />,
      name: 'Facebook',
      link: '#',
      color: 'hover:text-blue-500',
    },
    {
      icon: <FaTwitter />,
      name: 'Twitter',
      link: '#',
      color: 'hover:text-sky-500',
    },
    {
      icon: <FaInstagram />,
      name: 'Instagram',
      link: '#',
      color: 'hover:text-pink-500',
    },
    {
      icon: <FaLinkedin />,
      name: 'LinkedIn',
      link: '#',
      color: 'hover:text-blue-600',
    },
    {
      icon: <FaDiscord />,
      name: 'Discord',
      link: '#',
      color: 'hover:text-indigo-500',
    },
    {
      icon: <FaYoutube />,
      name: 'YouTube',
      link: '#',
      color: 'hover:text-red-500',
    },
  ];

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-xl">
                <BiLogoMagento className="text-3xl text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {import.meta.env.VITE_APP_TITLE || 'Nexora'}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              The next generation social platform where authentic connections
              thrive and creativity flourishes.
            </p>
            {/* Download Buttons */}
            <div className="flex flex-col gap-2 mb-4 pt-4">
              <Link
                to="/download"
                className="flex items-center gap-2 p-2 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-lg hover:scale-105 transition-all border border-default "
              >
                <IoLogoAppleAppstore className="text-2xl" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-600 dark:text-gray-400">
                    Download on the
                  </div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </Link>
              <Link
                to="/download"
                className="flex items-center gap-2 p-2 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-lg hover:scale-105 transition-all border border-default "
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

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Stay Updated</h3>
              <p className="text-sm opacity-90">
                Subscribe to our newsletter for the latest updates
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#1E2939] border-none focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-lg hover:scale-105 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-lg text-xl transition-all hover:scale-110 ${social.color}`}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()}{' '}
                <Link
                  to="/"
                  className="font-bold hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  {import.meta.env.VITE_APP_TITLE || 'Nexora'}
                </Link>
                . All Rights Reserved.
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>
                by{' '}
                <a
                  href="https://github.com/Abdelrahman968"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-400 transition-colors"
                >
                  Abdelrahman Ayman
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
