import { Link } from 'react-router-dom';
import {
  FaShieldAlt,
  FaLock,
  FaEye,
  FaUserShield,
  FaCookie,
  FaDatabase,
  FaCheckCircle,
  FaArrowLeft,
  FaEnvelope,
} from 'react-icons/fa';
import { Card, CardBody, Chip } from '@heroui/react';
import SEO from '../../component/SEO/SEO';

function PrivacyPolicy() {
  const lastUpdated = 'February 17, 2026';

  const sections = [
    {
      title: 'Information We Collect',
      icon: <FaDatabase />,
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, including your name, email address, username, profile photo, and any other information you choose to provide.',
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, operating system, and pages visited.',
        },
        {
          subtitle: 'Content Information',
          text: 'We collect the content you create, upload, or share on our platform, including posts, comments, messages, and media files.',
        },
      ],
    },
    {
      title: 'How We Use Your Information',
      icon: <FaEye />,
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          subtitle: 'Provide Services',
          text: 'We use your information to operate, maintain, and provide the features and functionality of our platform.',
        },
        {
          subtitle: 'Improve Experience',
          text: 'We analyze usage patterns to improve our services, develop new features, and enhance user experience.',
        },
        {
          subtitle: 'Communication',
          text: 'We may use your information to send you updates, security alerts, and support messages.',
        },
        {
          subtitle: 'Safety & Security',
          text: 'We use your information to protect the security and integrity of our platform and to detect and prevent fraud.',
        },
      ],
    },
    {
      title: 'Information Sharing',
      icon: <FaUserShield />,
      gradient: 'from-green-500 to-emerald-500',
      content: [
        {
          subtitle: 'Public Information',
          text: 'Your profile information and content you post publicly are visible to other users and may be indexed by search engines.',
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share your information with third-party service providers who perform services on our behalf, such as hosting and analytics.',
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law or in response to valid legal requests.',
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.',
        },
      ],
    },
    {
      title: 'Data Security',
      icon: <FaLock />,
      gradient: 'from-red-500 to-orange-500',
      content: [
        {
          subtitle: 'Encryption',
          text: 'We use industry-standard encryption to protect your data in transit and at rest.',
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls to ensure only authorized personnel can access your information.',
        },
        {
          subtitle: 'Regular Audits',
          text: 'We conduct regular security audits and vulnerability assessments to maintain the highest security standards.',
        },
      ],
    },
    {
      title: 'Your Rights & Choices',
      icon: <FaCheckCircle />,
      gradient: 'from-indigo-500 to-purple-500',
      content: [
        {
          subtitle: 'Access & Update',
          text: 'You can access and update your personal information through your account settings.',
        },
        {
          subtitle: 'Delete Account',
          text: 'You have the right to delete your account and all associated data at any time.',
        },
        {
          subtitle: 'Data Portability',
          text: 'You can request a copy of your data in a machine-readable format.',
        },
        {
          subtitle: 'Opt-Out',
          text: 'You can opt out of marketing communications and certain data collection practices.',
        },
      ],
    },
    {
      title: 'Cookies & Tracking',
      icon: <FaCookie />,
      gradient: 'from-yellow-500 to-orange-500',
      content: [
        {
          subtitle: 'Essential Cookies',
          text: 'We use cookies that are necessary for the platform to function properly.',
        },
        {
          subtitle: 'Analytics Cookies',
          text: 'We use analytics cookies to understand how users interact with our platform.',
        },
        {
          subtitle: 'Preference Cookies',
          text: 'We use cookies to remember your preferences and settings.',
        },
        {
          subtitle: 'Managing Cookies',
          text: 'You can control cookies through your browser settings. Note that disabling certain cookies may affect functionality.',
        },
      ],
    },
  ];

  const highlights = [
    'We never sell your personal data',
    'You control your privacy settings',
    'End-to-end encryption for messages',
    'Regular security audits',
    'GDPR & CCPA compliant',
    'Transparent data practices',
  ];

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information"
        path="/privacy-policy"
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

            <Card className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-2xl">
              <CardBody className="p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                    <FaShieldAlt className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                      Privacy Policy
                    </h1>
                    <p className="text-xl text-white/90 mb-4">
                      Your privacy is important to us. Learn how we collect,
                      use, and protect your information.
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

          {/* Key Highlights */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <FaCheckCircle />
                </div>
                Our Privacy Commitments
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <FaCheckCircle className="text-green-500 text-xl shrink-0" />
                    <span className="font-semibold">{highlight}</span>
                  </div>
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

          {/* Contact Information */}
          <Card className="bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-2xl">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Questions About Privacy?
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    If you have any questions about this Privacy Policy or our
                    data practices, please don't hesitate to contact us.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-white/80" />
                      <a
                        href="mailto:privacy@nexora.com"
                        className="text-white font-semibold hover:underline"
                      >
                        privacy@nexora.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-white/80" />
                      <span className="text-white/90">
                        Data Protection Officer: Available upon request
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/terms"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Terms of Service
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/cookie-policy"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Cookie Policy
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

export default PrivacyPolicy;
