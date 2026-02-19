import { Button } from '@heroui/react';
import { IoLogoAppleAppstore, IoLogoGooglePlaystore } from 'react-icons/io5';
import { FaMobileAlt, FaCheckCircle, FaQrcode } from 'react-icons/fa';
import { BiLogoMagento } from 'react-icons/bi';

function DownloadApp() {
  const features = [
    'Connect with authentic people',
    'Share your creative content',
    'Discover trending topics',
    'Private & secure messaging',
    'Real-time notifications',
    'Cross-platform syncing',
  ];

  return (
    <div className="w-full min-h-screen py-12 px-10">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl">
              <BiLogoMagento className="text-5xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Download {import.meta.env.VITE_APP_TITLE}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            The next generation social platform where authentic connections
            thrive and creativity flourishes.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Left Side - App Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-96 bg-linear-to-br from-pink-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <FaMobileAlt className="text-white text-8xl opacity-50" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">Free</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1E2939] rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Get Started Today
              </h2>

              <div className="space-y-4 mb-8">
                <Button
                  size="lg"
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-6 flex items-center justify-center gap-3"
                  startContent={<IoLogoAppleAppstore className="text-2xl" />}
                >
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 flex items-center justify-center gap-3"
                  startContent={<IoLogoGooglePlaystore className="text-2xl" />}
                >
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="text-center py-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Scan QR code to download
                </p>
                <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                      <FaQrcode className="text-2xl" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E2939] rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Why Choose {import.meta.env.VITE_APP_TITLE}?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-lg transition-all hover:scale-105 cursor-pointer"
              >
                <FaCheckCircle className="text-green-500 text-xl shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-linear-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">10M+</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Downloads
            </div>
          </div>
          <div className="bg-linear-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">4.8★</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Rating
            </div>
          </div>
          <div className="bg-linear-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">5M+</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Active Users
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Available for iOS 14+ and Android 8+
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Free to download • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;
