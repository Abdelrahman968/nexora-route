import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaShieldAlt,
  FaLock,
  FaEye,
  FaDatabase,
  FaUsers,
  FaChevronDown,
} from 'react-icons/fa';

function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState(null);

  const gradientText = {
    background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const gradientHeroBg = {
    background:
      'linear-gradient(to right, rgba(79,70,229,0.1), rgba(147,51,234,0.1))',
  };

  const sections = [
    {
      icon: <FaDatabase className="text-2xl text-indigo-500" />,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, update your profile, send us communications, or use our services. This may include your name, email address, password, profile photo, and any other information you choose to share. We also collect information automatically when you use our platform, including log data, device information, location data (with your permission), and cookies.`,
    },
    {
      icon: <FaEye className="text-2xl text-purple-500" />,
      title: 'How We Use Your Information',
      content: `We use the information we collect to provide, maintain, and improve our services, personalize your experience, and send you notifications and updates. We may also use your data to analyze usage patterns, prevent fraud, ensure security, and comply with legal obligations. We never sell your personal data to third parties. Our goal is to use your information solely to make Nexora better for you.`,
    },
    {
      icon: <FaLock className="text-2xl text-pink-500" />,
      title: 'How We Protect Your Data',
      content: `We take the security of your information very seriously. We implement industry-standard security measures, including end-to-end encryption, secure HTTPS connections, and regular security audits. Your data is stored on secure cloud infrastructure with multiple layers of protection. We also limit access to your personal information to only those employees and contractors who need it to perform their duties.`,
    },
    {
      icon: <FaUsers className="text-2xl text-indigo-400" />,
      title: 'Sharing of Information',
      content: `We may share your information with third-party service providers who assist us in operating our platform, such as cloud hosting or analytics providers. We do not share your personal information with advertisers or other third parties without your explicit consent, except as required by law. In the event of a merger or acquisition, your data may be transferred to the succeeding entity under the same privacy commitments.`,
    },
    {
      icon: <FaShieldAlt className="text-2xl text-purple-400" />,
      title: 'Your Rights & Choices',
      content: `You have full control over your personal data. You can access, update, or delete your information at any time through your account settings. You may also request a copy of your data or ask us to restrict processing. If you reside in a region covered by specific data protection laws (e.g., GDPR), you are entitled to additional rights such as data portability and the right to object. Contact our support team for any data-related requests.`,
    },
    {
      icon: <FaDatabase className="text-2xl text-pink-400" />,
      title: 'Cookies & Tracking',
      content: `We use cookies and similar tracking technologies to enhance your experience on Nexora. These help us remember your preferences, analyze site traffic, and personalize content. You can control cookie settings through your browser or through our in-app preferences. Essential cookies cannot be disabled as they are required for the platform to function properly. For non-essential cookies, you can opt out at any time.`,
    },
    {
      icon: <FaLock className="text-2xl text-indigo-500" />,
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time as our services evolve. Whenever we make significant changes, we will notify you via email or through a prominent notice on our platform. We encourage you to review this policy periodically. Your continued use of Nexora after any changes indicates your acceptance of the updated policy. The last updated date will always be shown at the top of this page.`,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Nexora</title>
        <meta name="description" content="Privacy Policy - Nexora" />
      </Helmet>
      <div className="w-full min-h-screen flex items-start justify-center">
        <section className="relative w-full">
          <div
            className="absolute inset-0 backdrop-blur-3xl"
            style={gradientHeroBg}
          ></div>

          <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-gray-200/50 dark:border-gray-700/50">
              <FaShieldAlt className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Updated: January 15, 2026
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span style={gradientText}>Privacy Policy</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-14 leading-relaxed">
              We are committed to protecting your privacy. Here's a clear
              breakdown of how we collect, use, and safeguard your personal
              information.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-14">
              {[
                {
                  icon: <FaLock className="text-indigo-500" />,
                  label: 'End-to-End Encrypted',
                },
                {
                  icon: <FaShieldAlt className="text-purple-500" />,
                  label: 'GDPR Compliant',
                },
                {
                  icon: <FaEye className="text-pink-500" />,
                  label: 'Zero Data Selling',
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-md flex flex-col items-center gap-2"
                >
                  <div className="text-xl">{badge.icon}</div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Accordion Sections */}
            <div className="flex flex-col gap-3 text-left">
              {sections.map((section, i) => (
                <div
                  key={i}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden transition-all duration-300"
                >
                  {/* Header */}
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 cursor-pointer border-none bg-transparent text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 dark:bg-gray-700/60 shadow-sm">
                        {section.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    <FaChevronDown
                      className={`text-gray-400 dark:text-gray-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed pl-20">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-14 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                By using Nexora, you agree to the terms of this Privacy Policy.
                If you have questions or concerns about your privacy, please
                reach out to our dedicated privacy team at{' '}
                <span className="font-semibold text-indigo-600 cursor-pointer hover:underline">
                  privacy@nexora.com
                </span>
                .
              </p>
            </div>
          </div>

          {/* Blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>
      </div>
    </>
  );
}

export default PrivacyPolicy;
