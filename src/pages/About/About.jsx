import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { BiLogoMagento } from 'react-icons/bi';
import {
  FaUsers,
  FaRocket,
  FaHeart,
  FaShieldAlt,
  FaGlobe,
  FaStar,
  FaLightbulb,
  FaHandshake,
} from 'react-icons/fa';
import { MdVerified, MdSecurity, MdSpeed } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SEO from '../../component/SEO/SEO';

function About() {
  const stats = [
    { number: '10M+', label: 'Active Users', icon: <FaUsers /> },
    { number: '50M+', label: 'Posts Shared', icon: <FaRocket /> },
    { number: '100+', label: 'Countries', icon: <FaGlobe /> },
    { number: '4.8★', label: 'User Rating', icon: <FaStar /> },
  ];

  const values = [
    {
      icon: <FaHeart className="text-4xl" />,
      title: 'Authenticity',
      description:
        'We believe in genuine connections and authentic self-expression. Be yourself, connect with real people.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Privacy & Security',
      description:
        'Your data is protected with industry-leading encryption. We never sell your personal information.',
      color: 'from-purple-500 to-violet-500',
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: 'Innovation',
      description:
        'Constantly evolving with cutting-edge features to enhance your social experience.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: 'Community',
      description:
        'Building a supportive, inclusive community where everyone feels welcome and valued.',
      color: 'from-teal-500 to-green-500',
    },
  ];

  const features = [
    {
      icon: <MdVerified className="text-3xl" />,
      title: 'Verified Accounts',
      description: 'Connect with authentic people and trusted creators',
    },
    {
      icon: <MdSecurity className="text-3xl" />,
      title: 'End-to-End Encryption',
      description: 'Your conversations stay private and secure',
    },
    {
      icon: <MdSpeed className="text-3xl" />,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless experience',
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: 'Global Reach',
      description: 'Connect with people from around the world',
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'The Beginning',
      description:
        'Nexora was founded with a vision to revolutionize social media.',
    },
    {
      year: '2021',
      title: 'First Million',
      description: 'Reached 1 million active users worldwide.',
    },
    {
      year: '2022',
      title: 'Mobile Launch',
      description: 'Released iOS and Android apps with enhanced features.',
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to 100+ countries with multilingual support.',
    },
    {
      year: '2024',
      title: 'AI Integration',
      description:
        'Introduced AI-powered content recommendations and safety features.',
    },
    {
      year: '2025',
      title: 'Today',
      description: '10M+ users creating authentic connections every day.',
    },
  ];

  const team = [
    {
      name: 'Abdelrahman Ayman',
      role: 'CEO & Founder',
      image: null,
      color: 'from-blue-600 to-violet-600',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: null,
      color: 'from-purple-600 to-violet-600',
    },
    {
      name: 'Emily Davis',
      role: 'Head of Design',
      image: null,
      color: 'from-indigo-600 to-blue-600',
    },
    {
      name: 'James Wilson',
      role: 'VP of Product',
      image: null,
      color: 'from-teal-600 to-green-600',
    },
  ];

  return (
    <>
      <SEO title="About" description="About page" path="/about" />
      <div className="min-h-screen w-full py-12 px-10">
        <div className=" mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl animate-pulse">
                <BiLogoMagento className="text-6xl text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About {import.meta.env.VITE_APP_TITLE}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The next generation social platform where authentic connections
              thrive and creativity flourishes.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all"
              >
                <CardBody className="text-center p-6">
                  <div className="text-4xl mb-3 text-pink-600 dark:text-pink-400 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Mission Section */}
          <Card className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white mb-16">
            <CardBody className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                To create a social platform that prioritizes genuine human
                connections over algorithms, where creativity is celebrated,
                privacy is respected, and every voice matters. We're building
                more than just a platform – we're fostering a global community
                of authentic individuals.
              </p>
            </CardBody>
          </Card>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all"
                >
                  <CardBody className="p-6">
                    <div
                      className={`inline-block p-4 bg-linear-to-r ${value.color} rounded-xl text-white mb-4`}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
              Why Choose {import.meta.env.VITE_APP_TITLE}?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all"
                >
                  <CardBody className="p-6 text-center">
                    <div className="text-pink-600 dark:text-pink-400 flex justify-center mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
              Our Journey
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-pink-600 via-purple-600 to-indigo-600"></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row gap-4 items-center ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="md:w-1/2" />
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-linear-to-r from-pink-600 to-indigo-600 items-center justify-center text-white font-bold z-10">
                      {index + 1}
                    </div>
                    <Card className="md:w-1/2 bg-white dark:bg-[#1E2939] hover:scale-105 transition-all">
                      <CardBody className="p-6">
                        <div className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {item.description}
                        </p>
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all"
                >
                  <CardBody className="p-6 text-center">
                    <div
                      className={`w-32 h-32 mx-auto mb-4 rounded-full bg-linear-to-r ${member.color} flex items-center justify-center text-white text-4xl font-bold`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {member.role}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white">
            <CardBody className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Join Our Community
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                Be part of something special. Connect with millions of people
                sharing authentic moments and creative content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  className="bg-white text-pink-600 font-semibold hover:scale-105 transition-all px-8"
                >
                  Get Started
                </Button>
                <Button
                  as={Link}
                  to="/download"
                  size="lg"
                  variant="bordered"
                  className="border-2 border-white text-white font-semibold hover:bg-white hover:text-pink-600 transition-all px-8"
                >
                  Download App
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Contact Banner */}
          <div className="mt-12 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Have questions or want to learn more?
            </p>
            <Button
              as={Link}
              to="/support"
              variant="flat"
              className="font-semibold border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 hover:scale-105 transition-all"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
