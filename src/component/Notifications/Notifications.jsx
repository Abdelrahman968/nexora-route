import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBell, FaRocket } from 'react-icons/fa';

function Notifications() {
  return (
    <>
      <Helmet>
        <title>Notifications - Nexora</title>
        <meta name="description" content="Notifications on Nexora" />
      </Helmet>
      <div className="w-full min-h-screen flex items-center justify-center">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
          <div className="relative max-w-4xl mx-auto px-4 py-32 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-gray-200/50 dark:border-gray-700/50">
              <FaBell className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Coming Soon
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-bold mb-6">
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Notifications
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              We're working hard to bring you an amazing notification
              experience. Stay tuned!
            </p>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
              <FaRocket className="text-7xl text-indigo-600 mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Exciting Features on the Way
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Get ready for real-time notifications, smart filtering, and
                seamless updates to keep you connected with your community.
              </p>
            </div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>
      </div>
    </>
  );
}

export default Notifications;
