import { Link } from 'react-router-dom';
import {
  FaFileContract,
  FaUserCheck,
  FaExclamationTriangle,
  FaGavel,
  FaBan,
  FaEdit,
  FaCheckCircle,
  FaArrowLeft,
  FaEnvelope,
  FaShieldAlt,
} from 'react-icons/fa';
import { Card, CardBody, Chip } from '@heroui/react';
import SEO from '../../component/SEO/SEO';

function TermsOfService() {
  const lastUpdated = 'February 17, 2026';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <FaUserCheck />,
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.',
        },
        {
          subtitle: 'Age Requirements',
          text: 'You must be at least 18 years old to use this platform. By using our services, you represent and warrant that you are at least 18 years of age.',
        },
        {
          subtitle: 'Account Registration',
          text: 'You must provide accurate, current, and complete information during the registration process and keep your account information updated.',
        },
      ],
    },
    {
      title: 'User Responsibilities',
      icon: <FaShieldAlt />,
      gradient: 'from-green-500 to-emerald-500',
      content: [
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        },
        {
          subtitle: 'Content Accuracy',
          text: 'You are responsible for ensuring that all content you post is accurate, lawful, and does not violate any third-party rights.',
        },
        {
          subtitle: 'Compliance',
          text: 'You agree to comply with all applicable local, state, national, and international laws and regulations in your use of our platform.',
        },
      ],
    },
    {
      title: 'Prohibited Activities',
      icon: <FaBan />,
      gradient: 'from-red-500 to-orange-500',
      content: [
        {
          subtitle: 'Illegal Content',
          text: 'You may not post content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.',
        },
        {
          subtitle: 'Spam & Abuse',
          text: 'You may not use our platform to transmit spam, chain letters, or other unsolicited communications, or to engage in any form of abuse or harassment.',
        },
        {
          subtitle: 'Intellectual Property',
          text: 'You may not post content that infringes on any patent, trademark, trade secret, copyright, or other proprietary rights of any party.',
        },
        {
          subtitle: 'System Interference',
          text: 'You may not attempt to interfere with, compromise, or disrupt the platform, servers, or networks connected to our services.',
        },
      ],
    },
    {
      title: 'Intellectual Property Rights',
      icon: <FaEdit />,
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          subtitle: 'Platform Content',
          text: 'All content on our platform, including text, graphics, logos, and software, is the property of our company or our licensors and is protected by copyright laws.',
        },
        {
          subtitle: 'User Content',
          text: 'You retain ownership of content you create and post. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content.',
        },
        {
          subtitle: 'Trademarks',
          text: 'Our trademarks, service marks, and logos may not be used without our prior written permission.',
        },
      ],
    },
    {
      title: 'Termination',
      icon: <FaExclamationTriangle />,
      gradient: 'from-yellow-500 to-orange-500',
      content: [
        {
          subtitle: 'By You',
          text: 'You may terminate your account at any time by following the account deletion process in your settings.',
        },
        {
          subtitle: 'By Us',
          text: 'We reserve the right to suspend or terminate your account at any time, with or without notice, for any violation of these Terms or for any other reason.',
        },
        {
          subtitle: 'Effect of Termination',
          text: 'Upon termination, your right to use the platform will immediately cease. We may retain certain information as required by law or for legitimate business purposes.',
        },
      ],
    },
    {
      title: 'Disclaimers & Limitations',
      icon: <FaGavel />,
      gradient: 'from-indigo-500 to-purple-500',
      content: [
        {
          subtitle: 'Service "As Is"',
          text: 'Our platform is provided "as is" and "as available" without any warranties of any kind, either express or implied.',
        },
        {
          subtitle: 'No Liability',
          text: 'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our platform.',
        },
        {
          subtitle: 'Limitation of Liability',
          text: 'Our total liability to you for any claims arising from your use of the platform shall not exceed the amount you paid us in the past 12 months.',
        },
      ],
    },
  ];

  const keyPoints = [
    'You must be 18+ to use our platform',
    'Keep your account credentials secure',
    'No illegal or harmful content allowed',
    'We can terminate accounts for violations',
    'You retain rights to your content',
    'Platform provided "as is" without warranties',
  ];

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read our terms and conditions for using the platform"
        path="/terms"
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

            <Card className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
              <CardBody className="p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                    <FaFileContract className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                      Terms of Service
                    </h1>
                    <p className="text-xl text-white/90 mb-4">
                      Please read these terms carefully before using our
                      platform. By using our services, you agree to these terms.
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

          {/* Key Points */}
          <Card className="bg-white dark:bg-[#1E2939] shadow-xl mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <FaCheckCircle />
                </div>
                Key Points
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <FaCheckCircle className="text-blue-500 text-xl shrink-0" />
                    <span className="font-semibold">{point}</span>
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

          {/* Additional Terms */}
          <Card className="bg-linear-to-r from-orange-500 to-red-500 text-white shadow-2xl mb-8">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaExclamationTriangle className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Important Notice</h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    We reserve the right to modify these Terms of Service at any
                    time. Changes will be effective immediately upon posting to
                    the platform. Your continued use of the platform after
                    changes are posted constitutes your acceptance of the
                    modified terms.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    We recommend checking this page regularly to stay informed
                    of any updates.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <Card className="bg-linear-to-r from-pink-600 to-purple-600 text-white shadow-2xl">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Questions About Our Terms?
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    If you have any questions about these Terms of Service,
                    please contact our legal team.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-white/80" />
                      <a
                        href="mailto:legal@nexora.com"
                        className="text-white font-semibold hover:underline"
                      >
                        legal@nexora.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGavel className="text-white/80" />
                      <span className="text-white/90">
                        Legal Department: Available Monday - Friday, 9AM - 5PM
                        PST
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
              to="/privacy-policy"
              className="text-pink-600 dark:text-pink-400 hover:underline font-semibold"
            >
              Privacy Policy
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

export default TermsOfService;
