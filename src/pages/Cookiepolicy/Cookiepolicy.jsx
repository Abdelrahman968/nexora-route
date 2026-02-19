import { Link } from 'react-router-dom';
import {
  FaCookie,
  FaCheckCircle,
  FaCog,
  FaChartBar,
  FaAd,
  FaToggleOn,
  FaArrowLeft,
  FaEnvelope,
  FaInfoCircle,
} from 'react-icons/fa';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import SEO from '../../component/SEO/SEO';

function CookiePolicy() {
  const lastUpdated = 'February 17, 2026';

  const sections = [
    {
      title: 'What Are Cookies?',
      icon: <FaInfoCircle />,
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        {
          subtitle: 'Definition',
          text: 'Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.',
        },
        {
          subtitle: 'Purpose',
          text: 'We use cookies to provide you with a personalized experience, analyze how you use our platform, and improve our services.',
        },
      ],
    },
    {
      title: 'Essential Cookies',
      icon: <FaCog />,
      gradient: 'from-green-500 to-emerald-500',
      content: [
        {
          subtitle: 'Authentication',
          text: 'These cookies are necessary to keep you logged in and maintain your session security.',
        },
        {
          subtitle: 'Security',
          text: 'We use cookies to protect your account from unauthorized access and prevent fraudulent activities.',
        },
        {
          subtitle: 'Functionality',
          text: 'Essential cookies enable core features of our platform, such as saving your preferences and settings.',
        },
      ],
    },
    {
      title: 'Analytics Cookies',
      icon: <FaChartBar />,
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          subtitle: 'Usage Tracking',
          text: 'We use analytics cookies to understand how visitors interact with our platform, which pages are most popular, and how long users spend on each page.',
        },
        {
          subtitle: 'Performance Monitoring',
          text: 'These cookies help us identify and fix technical issues, optimize page load times, and improve overall platform performance.',
        },
        {
          subtitle: 'Feature Development',
          text: 'Analytics data helps us understand which features are most valuable to users and guides our product development decisions.',
        },
      ],
    },
    {
      title: 'Preference Cookies',
      icon: <FaToggleOn />,
      gradient: 'from-orange-500 to-red-500',
      content: [
        {
          subtitle: 'User Settings',
          text: 'These cookies remember your preferences such as language, theme (light/dark mode), and display settings.',
        },
        {
          subtitle: 'Customization',
          text: 'Preference cookies enable personalized features and content recommendations based on your previous interactions.',
        },
      ],
    },
    {
      title: 'Advertising Cookies',
      icon: <FaAd />,
      gradient: 'from-yellow-500 to-orange-500',
      content: [
        {
          subtitle: 'Targeted Advertising',
          text: 'We may use cookies to show you relevant advertisements based on your interests and browsing behavior.',
        },
        {
          subtitle: 'Ad Performance',
          text: 'These cookies help us measure the effectiveness of our advertising campaigns and understand which ads are most relevant to users.',
        },
        {
          subtitle: 'Third-Party Ads',
          text: 'Some advertising cookies may be set by third-party advertising networks. You can opt out of these cookies through your browser settings.',
        },
      ],
    },
  ];

  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'Required for platform functionality',
      required: true,
      gradient: 'from-green-500 to-emerald-500',
      icon: <FaCog />,
    },
    {
      name: 'Analytics Cookies',
      description: 'Help us improve the platform',
      required: false,
      gradient: 'from-purple-500 to-pink-500',
      icon: <FaChartBar />,
    },
    {
      name: 'Preference Cookies',
      description: 'Remember your settings',
      required: false,
      gradient: 'from-orange-500 to-red-500',
      icon: <FaToggleOn />,
    },
    {
      name: 'Advertising Cookies',
      description: 'Show relevant ads',
      required: false,
      gradient: 'from-yellow-500 to-orange-500',
      icon: <FaAd />,
    },
  ];

  const managementSteps = [
    'Go to your browser settings',
    'Find the privacy or cookie settings',
    'Choose which cookies to accept or reject',
    'Save your preferences',
  ];

  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Learn how we use cookies to improve your experience"
        path="/cookie-policy"
      />

      <div className="w-full min-h-screen">
        <div className="max-w-5xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            <Card className="bg-linear-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-2xl">
              <CardBody className="p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                    <FaCookie className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                      Cookie Policy
                    </h1>
                    <p className="text-xl text-white/90 mb-4">
                      Learn how we use cookies and similar technologies to
                      enhance your experience on our platform.
                    </p>
                    <Chip
                      size="lg"
                      className="bg-white/20 text-white font-bold"
                      startContent={<FaCheckCircle />}
                    >
                      Last Updated: {lastUpdated}
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Cookie Types Overview */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <FaCookie />
                </div>
                Types of Cookies We Use
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {cookieTypes.map((cookie, index) => (
                  <Card
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 hover:scale-102 transition-all"
                  >
                    <CardBody className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-linear-to-r ${cookie.gradient} flex items-center justify-center text-white shrink-0`}
                        >
                          <div className="text-xl">{cookie.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                              {cookie.name}
                            </h3>
                            {cookie.required && (
                              <Chip
                                size="sm"
                                className="bg-red-500 text-white font-bold"
                              >
                                Required
                              </Chip>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cookie.description}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Content Sections */}
          <div className="space-y-6 mb-8">
            {sections.map((section, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] shadow-xl hover:scale-102 transition-all"
              >
                <CardBody className="p-0">
                  <div
                    className={`p-6 bg-linear-to-r ${section.gradient} text-white`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                        {section.icon}
                      </div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Managing Cookies */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                  <FaCog />
                </div>
                How to Manage Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                You have control over which cookies you accept. Here's how to
                manage your cookie preferences:
              </p>
              <div className="space-y-3 mb-6">
                {managementSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-semibold">{step}</span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold hover:scale-105 transition-all"
                startContent={<FaCog />}
              >
                Manage Cookie Preferences
              </Button>
            </CardBody>
          </Card>

          {/* Important Notice */}
          <Card className="bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-2xl mb-8">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaInfoCircle className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Important Information
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    Please note that disabling certain cookies may affect the
                    functionality of our platform. Essential cookies cannot be
                    disabled as they are necessary for the platform to work
                    properly.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    Most browsers accept cookies automatically, but you can
                    modify your browser settings to decline cookies if you
                    prefer. However, this may prevent you from taking full
                    advantage of our platform.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <Card className="bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-2xl">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Questions About Cookies?
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    If you have any questions about our use of cookies or this
                    Cookie Policy, please contact us.
                  </p>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-white/80" />
                    <a
                      href="mailto:privacy@nexora.com"
                      className="text-white font-semibold hover:underline"
                    >
                      privacy@nexora.com
                    </a>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy-policy"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/terms"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Terms of Service
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/licensing"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Licensing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CookiePolicy;
