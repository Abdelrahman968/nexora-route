import { Link } from 'react-router-dom';
import {
  FaCertificate,
  FaCode,
  FaImage,
  FaMusic,
  FaCheckCircle,
  FaBan,
  FaArrowLeft,
  FaEnvelope,
  FaGavel,
  FaFileContract,
} from 'react-icons/fa';
import { Card, CardBody, Chip } from '@heroui/react';
import SEO from '../../component/SEO/SEO';

function Licensing() {
  const lastUpdated = 'February 17, 2026';

  const sections = [
    {
      title: 'Platform License',
      icon: <FaCode />,
      gradient: 'from-blue-500 to-cyan-500',
      content: [
        {
          subtitle: 'Software License',
          text: 'Our platform software is proprietary and protected by copyright laws. You are granted a limited, non-exclusive, non-transferable license to access and use our platform for personal, non-commercial purposes.',
        },
        {
          subtitle: 'Restrictions',
          text: 'You may not copy, modify, distribute, sell, or lease any part of our platform or software. You may not reverse engineer or attempt to extract the source code of our platform.',
        },
        {
          subtitle: 'Updates',
          text: 'We reserve the right to modify, update, or discontinue any aspect of the platform at any time without notice.',
        },
      ],
    },
    {
      title: 'User Content License',
      icon: <FaImage />,
      gradient: 'from-purple-500 to-pink-500',
      content: [
        {
          subtitle: 'Your Ownership',
          text: 'You retain all ownership rights to content you create and post on our platform. We do not claim ownership of your user-generated content.',
        },
        {
          subtitle: 'License Grant',
          text: 'By posting content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your content in connection with our services.',
        },
        {
          subtitle: 'Duration',
          text: 'This license continues even if you stop using our platform, unless you delete your content. When you delete content, the license ends within a reasonable time, except where content has been shared with others and they have not deleted it.',
        },
      ],
    },
    {
      title: 'Third-Party Content',
      icon: <FaFileContract />,
      gradient: 'from-green-500 to-emerald-500',
      content: [
        {
          subtitle: 'Open Source Software',
          text: 'Our platform uses various open-source libraries and components. Each component is used in accordance with its respective license. A list of these components and their licenses is available upon request.',
        },
        {
          subtitle: 'Third-Party APIs',
          text: 'We use third-party APIs and services that are subject to their own terms of service and privacy policies. Your use of these services through our platform is subject to their respective terms.',
        },
        {
          subtitle: 'User Responsibility',
          text: 'When using third-party content or services through our platform, you are responsible for complying with all applicable licenses and terms.',
        },
      ],
    },
    {
      title: 'Media Licenses',
      icon: <FaMusic />,
      gradient: 'from-orange-500 to-red-500',
      content: [
        {
          subtitle: 'Photos & Images',
          text: 'Images you upload must be owned by you or properly licensed. You represent and warrant that you have all necessary rights to post images and that they do not infringe on any third-party rights.',
        },
        {
          subtitle: 'Videos',
          text: 'Videos must comply with copyright laws. You may not upload videos containing copyrighted music, clips, or other content unless you have proper authorization or the content falls under fair use.',
        },
        {
          subtitle: 'Music & Audio',
          text: 'Any music or audio content you upload must be owned by you, properly licensed, or in the public domain. We respect the rights of copyright holders and will respond to valid DMCA takedown notices.',
        },
      ],
    },
    {
      title: 'Commercial Use',
      icon: <FaGavel />,
      gradient: 'from-yellow-500 to-orange-500',
      content: [
        {
          subtitle: 'Personal Use Only',
          text: 'Our free platform is intended for personal, non-commercial use only. Any commercial use of the platform requires a separate commercial license agreement.',
        },
        {
          subtitle: 'Commercial License',
          text: 'If you wish to use our platform for commercial purposes, please contact our licensing team to discuss available options and pricing.',
        },
        {
          subtitle: 'Brand Assets',
          text: 'Our logos, trademarks, and brand assets may not be used without our express written permission. Unauthorized use of our brand assets is strictly prohibited.',
        },
      ],
    },
    {
      title: 'Copyright Protection',
      icon: <FaCertificate />,
      gradient: 'from-indigo-500 to-purple-500',
      content: [
        {
          subtitle: 'DMCA Compliance',
          text: 'We comply with the Digital Millennium Copyright Act (DMCA). If you believe your copyright has been infringed, please submit a DMCA takedown notice to our designated agent.',
        },
        {
          subtitle: 'Counter-Notification',
          text: 'If your content was removed due to a DMCA notice and you believe the removal was in error, you may submit a counter-notification in accordance with the DMCA.',
        },
        {
          subtitle: 'Repeat Infringers',
          text: 'We have a policy of terminating accounts of repeat copyright infringers in appropriate circumstances.',
        },
      ],
    },
  ];

  const allowedUses = [
    'Personal, non-commercial use',
    'Create and share original content',
    'Use platform features as intended',
    'Link to public content',
  ];

  const prohibitedUses = [
    'Commercial use without license',
    'Scraping or data mining',
    'Reverse engineering',
    'Reselling or redistributing',
    'Removing copyright notices',
    'Creating derivative products',
  ];

  return (
    <>
      <SEO
        title="Licensing"
        description="Learn about licensing terms for our platform and content"
        path="/licensing"
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

            <Card className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
              <CardBody className="p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                    <FaCertificate className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                      Licensing
                    </h1>
                    <p className="text-xl text-white/90 mb-4">
                      Understand the licensing terms for using our platform and
                      the content shared on it.
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

          {/* Allowed vs Prohibited */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Allowed Uses */}
            <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
              <CardBody className="p-0">
                <div className="p-6 bg-linear-to-r from-green-500 to-emerald-500 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                      <FaCheckCircle />
                    </div>
                    <h2 className="text-2xl font-bold">Allowed Uses</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {allowedUses.map((use, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20"
                      >
                        <FaCheckCircle className="text-green-500 text-xl shrink-0" />
                        <span className="font-semibold">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Prohibited Uses */}
            <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
              <CardBody className="p-0">
                <div className="p-6 bg-linear-to-r from-red-500 to-orange-500 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                      <FaBan />
                    </div>
                    <h2 className="text-2xl font-bold">Prohibited Uses</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {prohibitedUses.map((use, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20"
                      >
                        <FaBan className="text-red-500 text-xl shrink-0" />
                        <span className="font-semibold">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

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

          {/* DMCA Notice */}
          <Card className="bg-linear-to-r from-orange-500 to-red-500 text-white shadow-2xl mb-8">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaGavel className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    DMCA Takedown Notices
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    If you believe your copyrighted work has been infringed,
                    please send a DMCA takedown notice to our designated agent
                    with the following information:
                  </p>
                  <ul className="space-y-2 text-white/90">
                    <li>
                      • A physical or electronic signature of the copyright
                      owner
                    </li>
                    <li>
                      • Identification of the copyrighted work claimed to have
                      been infringed
                    </li>
                    <li>• Location of the allegedly infringing material</li>
                    <li>• Your contact information (address, phone, email)</li>
                    <li>
                      • A statement that you have a good faith belief that the
                      use is not authorized
                    </li>
                    <li>
                      • A statement that the information is accurate and you are
                      authorized to act
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <Card className="bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-2xl">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    Licensing Inquiries
                  </h2>
                  <p className="text-white/90 mb-4 leading-relaxed">
                    For commercial licensing, partnership opportunities, or
                    questions about our licensing terms, please contact our
                    licensing team.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-white/80" />
                      <a
                        href="mailto:se.abdelrahman968@gmail.com"
                        className="text-white font-semibold hover:underline"
                      >
                        se.abdelrahman968@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGavel className="text-white/80" />
                      <span className="text-white/90">
                        DMCA Agent: se.abdelrahman968@gmail.com
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Licensing;
