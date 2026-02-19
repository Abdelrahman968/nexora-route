import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaShieldAlt,
  FaUser,
  FaCog,
  FaArrowLeft,
  FaLock,
  FaCamera,
  FaCheckCircle,
} from 'react-icons/fa';
import { Card, CardBody, Button } from '@heroui/react';

import ChangePassword from '../ChangePassword/ChangePassword';
import ChangePhoto from '../ChangePhoto/ChangePhoto';
import SEO from '../SEO/SEO';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs = [
    {
      id: 'profile',
      icon: <FaCamera className="text-xl" />,
      title: 'Profile Photo',
      description: 'Update your profile picture',
      gradient: 'from-pink-600 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50',
      darkBgGradient: 'from-pink-900/20 to-rose-900/20',
    },
    {
      id: 'security',
      icon: <FaLock className="text-xl" />,
      title: 'Security',
      description: 'Password and account security',
      gradient: 'from-indigo-600 to-purple-600',
      bgGradient: 'from-indigo-50 to-purple-50',
      darkBgGradient: 'from-indigo-900/20 to-purple-900/20',
    },
  ];

  const currentTab = settingsTabs.find(tab => tab.id === activeTab);

  return (
    <>
      <SEO
        title="Settings"
        description="Manage your account settings and preferences"
        path="/settings"
      />
      <div className="w-full min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-2xl bg-linear-to-r ${currentTab?.gradient} flex items-center justify-center text-white shadow-lg`}
                >
                  <FaCog className="text-3xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                  <FaCheckCircle className="text-white text-xs" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold">
                  <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Account Settings
                  </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl sticky top-20">
                <CardBody className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Settings Menu</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose a category to manage
                    </p>
                  </div>

                  <nav className="space-y-2">
                    {settingsTabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full group cursor-pointer transition-all ${
                          activeTab === tab.id ? 'scale-105' : 'hover:scale-102'
                        }`}
                      >
                        <Card
                          className={`${
                            activeTab === tab.id
                              ? `bg-linear-to-r ${tab.gradient} text-white shadow-lg`
                              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                          } transition-all`}
                        >
                          <CardBody className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  activeTab === tab.id
                                    ? 'bg-white/20'
                                    : `bg-linear-to-r ${tab.gradient}`
                                }`}
                              >
                                <div
                                  className={
                                    activeTab === tab.id
                                      ? 'text-white'
                                      : 'text-white'
                                  }
                                >
                                  {tab.icon}
                                </div>
                              </div>
                              <div className="flex-1 text-left">
                                <div
                                  className={`font-bold ${
                                    activeTab === tab.id
                                      ? 'text-white'
                                      : 'text-gray-900 dark:text-white'
                                  }`}
                                >
                                  {tab.title}
                                </div>
                                <div
                                  className={`text-xs ${
                                    activeTab === tab.id
                                      ? 'text-white/80'
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`}
                                >
                                  {tab.description}
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </button>
                    ))}
                  </nav>

                  {/* Quick Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                      >
                        <FaUser className="text-xs" />
                        <span>View Profile</span>
                      </Link>
                      <Link
                        to="/privacy"
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                      >
                        <FaShieldAlt className="text-xs" />
                        <span>Privacy Settings</span>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-0">
                  {/* Content Header */}
                  <div
                    className={`p-6 bg-linear-to-r ${currentTab?.gradient} text-white`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        {currentTab?.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          {currentTab?.title}
                        </h2>
                        <p className="text-sm text-white/80">
                          {currentTab?.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6">
                    <div className="transition-all duration-300">
                      {activeTab === 'profile' && <ChangePhoto />}
                      {activeTab === 'security' && <ChangePassword />}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Info Card */}
              <Card className="bg-linear-to-r from-blue-600 to-cyan-600 text-white mt-6">
                <CardBody className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      <FaShieldAlt className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        Your Security Matters
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed">
                        We use enterprise-grade encryption to protect your data.
                        Enable two-factor authentication for additional
                        security.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
