import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaNewspaper,
  FaDownload,
  FaImage,
  FaFileAlt,
  FaPalette,
  FaUsers,
  FaChartLine,
  FaTrophy,
  FaArrowLeft,
  FaEnvelope,
  FaCheckCircle,
  FaLink,
  FaCopy,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import SEO from '../../component/SEO/SEO';

function PressKit() {
  const [copiedText, setCopiedText] = useState('');

  const appName = import.meta.env.VITE_APP_TITLE || 'Nexora';

  const stats = [
    {
      value: '10M+',
      label: 'Active Users',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <FaUsers />,
    },
    {
      value: '50M+',
      label: 'Posts Shared',
      gradient: 'from-purple-500 to-pink-500',
      icon: <FaImage />,
    },
    {
      value: '100+',
      label: 'Countries',
      gradient: 'from-green-500 to-emerald-500',
      icon: <FaChartLine />,
    },
    {
      value: '4.8★',
      label: 'User Rating',
      gradient: 'from-yellow-500 to-orange-500',
      icon: <FaTrophy />,
    },
  ];

  const brandAssets = [
    {
      title: 'Logo Package',
      description: 'PNG, SVG, and vector formats',
      size: '2.4 MB',
      gradient: 'from-pink-500 to-rose-500',
      icon: <FaPalette />,
      files: [
        'Logo - Full Color',
        'Logo - White',
        'Logo - Black',
        'Logo - Icon Only',
      ],
    },
    {
      title: 'Brand Colors',
      description: 'RGB, HEX, and CMYK values',
      size: '856 KB',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <FaPalette />,
      files: [
        'Primary Palette',
        'Secondary Colors',
        'Gradients',
        'Color Guidelines',
      ],
    },
    {
      title: 'Screenshots',
      description: 'High-resolution app screens',
      size: '8.7 MB',
      gradient: 'from-purple-500 to-indigo-500',
      icon: <FaImage />,
      files: [
        'Desktop Views',
        'Mobile Views',
        'Feature Highlights',
        'UI Components',
      ],
    },
    {
      title: 'Press Release',
      description: 'Latest news and announcements',
      size: '124 KB',
      gradient: 'from-green-500 to-emerald-500',
      icon: <FaFileAlt />,
      files: [
        'Company Overview',
        'Product Launch',
        'Milestones',
        'Executive Quotes',
      ],
    },
    {
      title: 'Brand Guidelines',
      description: 'Complete brand style guide',
      size: '3.2 MB',
      gradient: 'from-orange-500 to-red-500',
      icon: <FaFileAlt />,
      files: ['Typography', 'Logo Usage', 'Tone of Voice', "Do's and Don'ts"],
    },
    {
      title: 'Media Kit',
      description: 'Founder photos and bios',
      size: '5.6 MB',
      gradient: 'from-indigo-500 to-purple-500',
      icon: <FaUsers />,
      files: ['Team Photos', 'Founder Bios', 'Company History', 'Contact Info'],
    },
  ];

  const companyInfo = {
    founded: '2023',
    headquarters: 'San Francisco, CA',
    employees: '150+',
    funding: '$50M Series B',
    website: 'nexora.com',
    contact: 'press@nexora.com',
  };

  const boilerplate = `${appName} is the next-generation social platform where authentic connections thrive and creativity flourishes. With over 10 million active users across 100+ countries, ${appName} enables people to share their stories, discover inspiring content, and build meaningful relationships with like-minded individuals. Founded in 2023, ${appName} is committed to creating a safe, inclusive, and empowering space for digital expression.`;

  const achievements = [
    'Featured in TechCrunch, Forbes, and The Verge',
    'Winner of Best Social App 2025',
    'Ranked #1 Social Platform by Users',
    '50M+ Posts Shared Monthly',
    '99.9% Platform Uptime',
    'Available in 25+ Languages',
  ];

  const brandColors = [
    { name: 'Primary Pink', hex: '#EC4899', rgb: 'RGB(236, 72, 153)' },
    { name: 'Primary Purple', hex: '#9333EA', rgb: 'RGB(147, 51, 234)' },
    { name: 'Primary Indigo', hex: '#4F46E5', rgb: 'RGB(79, 70, 229)' },
    { name: 'Secondary Blue', hex: '#3B82F6', rgb: 'RGB(59, 130, 246)' },
    { name: 'Secondary Green', hex: '#10B981', rgb: 'RGB(16, 185, 129)' },
    { name: 'Secondary Orange', hex: '#F59E0B', rgb: 'RGB(245, 158, 11)' },
  ];

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <>
      <SEO
        title="Press Kit"
        description="Download our press kit, brand assets, and media resources"
        path="/press-kit"
      />

      <div className="w-full min-h-screen bg-gray-50 dark:bg-[#111827]">
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

            <Card className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-2xl">
              <CardBody className="p-8 md:p-12">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                    <FaNewspaper className="text-5xl" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                      Press Kit
                    </h1>
                    <p className="text-xl text-white/90 mb-4">
                      Everything you need to cover {appName}. Download our brand
                      assets, company information, and media resources.
                    </p>
                    <Chip
                      size="lg"
                      className="bg-white/20 text-white font-bold"
                      startContent={<FaCheckCircle />}
                    >
                      Last Updated: February 2026
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <CardBody className="p-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-r ${stat.gradient} flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                  >
                    <div className="text-xl">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-extrabold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent mb-1 text-center">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold text-center">
                    {stat.label}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Button
              size="lg"
              className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-lg py-8 shadow-lg hover:scale-105 transition-all"
              startContent={<FaDownload className="text-xl" />}
            >
              Download Complete Press Kit (24.7 MB)
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold text-lg py-8 hover:scale-105 transition-all"
              startContent={<FaEnvelope className="text-xl" />}
            >
              Contact Press Team
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left 2 Columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Brand Assets */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    Brand Assets
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {brandAssets.map((asset, index) => (
                    <Card
                      key={index}
                      className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all cursor-pointer"
                    >
                      <CardBody className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className={`w-14 h-14 rounded-xl bg-linear-to-r ${asset.gradient} flex items-center justify-center text-white text-2xl shadow-lg shrink-0`}
                          >
                            {asset.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                              {asset.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {asset.description}
                            </p>
                            <Chip
                              size="sm"
                              variant="flat"
                              className="bg-gray-100 dark:bg-gray-800"
                            >
                              {asset.size}
                            </Chip>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {asset.files.map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <FaCheckCircle className="text-green-500 shrink-0" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          size="md"
                          className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold"
                          startContent={<FaDownload />}
                        >
                          Download
                        </Button>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Brand Colors */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
                      <FaPalette />
                    </div>
                    Brand Colors
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {brandColors.map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                      >
                        <div
                          className="w-16 h-16 rounded-xl shadow-lg shrink-0"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            {color.name}
                          </h4>
                          <div className="space-y-1">
                            <button
                              onClick={() =>
                                handleCopy(color.hex, `${color.name}-hex`)
                              }
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                            >
                              <span className="font-mono">{color.hex}</span>
                              {copiedText === `${color.name}-hex` ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : (
                                <FaCopy className="text-xs" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleCopy(color.rgb, `${color.name}-rgb`)
                              }
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                            >
                              <span className="font-mono">{color.rgb}</span>
                              {copiedText === `${color.name}-rgb` ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : (
                                <FaCopy className="text-xs" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Company Boilerplate */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                      <FaFileAlt />
                    </div>
                    Company Boilerplate
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {boilerplate}
                  </p>
                  <Button
                    size="md"
                    variant="flat"
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold"
                    startContent={
                      copiedText === 'boilerplate' ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )
                    }
                    onClick={() => handleCopy(boilerplate, 'boilerplate')}
                  >
                    {copiedText === 'boilerplate' ? 'Copied!' : 'Copy Text'}
                  </Button>
                </CardBody>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Company Information */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Company Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Founded
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {companyInfo.founded}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Headquarters
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {companyInfo.headquarters}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Employees
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {companyInfo.employees}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Funding
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {companyInfo.funding}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Website
                      </div>
                      <a
                        href={`https://${companyInfo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
                      >
                        {companyInfo.website}
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Press Contact
                      </div>
                      <a
                        href={`mailto:${companyInfo.contact}`}
                        className="font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                      >
                        {companyInfo.contact}
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Achievements */}
              <Card className="bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaTrophy className="text-2xl" />
                    Key Achievements
                  </h3>
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="text-white/90 shrink-0 mt-1" />
                        <span className="text-sm text-white/90">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Contact Card */}
              <Card className="bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-xl">
                <CardBody className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
                  <p className="text-white/90 text-sm mb-4">
                    For press inquiries, interviews, or additional information,
                    please contact our press team.
                  </p>
                  <Button
                    size="md"
                    className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold"
                    startContent={<FaEnvelope />}
                  >
                    Contact Press Team
                  </Button>
                </CardBody>
              </Card>

              {/* Social Links */}
              <Card className="bg-white dark:bg-[#1E2939] shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="space-y-2">
                    {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map(
                      (social, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                        >
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {social}
                          </span>
                          <FaExternalLinkAlt className="text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors" />
                        </a>
                      )
                    )}
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

export default PressKit;
