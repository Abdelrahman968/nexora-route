import { Button } from '@heroui/react';
import { Helmet } from 'react-helmet-async';
import {
  FaUsers,
  FaGlobe,
  FaHeart,
  FaStar,
  FaRocket,
  FaLightbulb,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function About() {
  const stats = [
    {
      icon: <FaUsers className="text-indigo-500" />,
      value: '2M+',
      label: 'Active Users',
    },
    {
      icon: <FaGlobe className="text-purple-500" />,
      value: '150+',
      label: 'Countries',
    },
    {
      icon: <FaHeart className="text-pink-500" />,
      value: '10M+',
      label: 'Connections',
    },
    {
      icon: <FaStar className="text-yellow-500" />,
      value: '4.9★',
      label: 'User Rating',
    },
  ];

  const values = [
    {
      icon: <FaUsers className="text-3xl text-indigo-500" />,
      title: 'Community First',
      desc: 'We build a real community that connects people from all over the world in an honest and meaningful way.',
    },
    {
      icon: <FaLightbulb className="text-3xl text-purple-500" />,
      title: 'Innovation',
      desc: "We constantly strive to innovate and improve, delivering a social media experience like nothing you've seen before.",
    },
    {
      icon: <FaHeart className="text-3xl text-pink-500" />,
      title: 'Authenticity',
      desc: 'We believe in honesty and authenticity — a real place to share your thoughts and passions with people.',
    },
    {
      icon: <FaRocket className="text-3xl text-indigo-400" />,
      title: 'Growth',
      desc: 'We help you grow and evolve, whether personally or professionally, through your network.',
    },
  ];

  const gradientText = {
    background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const gradientButton = {
    background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)',
  };

  const gradientHeroBg = {
    background:
      'linear-gradient(to right, rgba(79,70,229,0.1), rgba(147,51,234,0.1))',
  };

  const gradientBannerBg = {
    background:
      'linear-gradient(to right, rgba(79,70,229,0.2), rgba(147,51,234,0.2), rgba(236,72,153,0.2))',
  };

  return (
    <>
      <Helmet>
        <title>About - Nexora</title>
        <meta name="description" content="About Nexora" />
      </Helmet>
      <div className="w-full min-h-screen flex items-start justify-center">
        <section className="relative w-full">
          <div
            className="absolute inset-0 backdrop-blur-3xl"
            style={gradientHeroBg}
          ></div>

          <div className="relative max-w-4xl mx-auto px-4 py-32 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-gray-200/50 dark:border-gray-700/50">
              <FaGlobe className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                About Nexora
              </span>
            </div>

            {/* Title */}
            <h1 className="text-6xl sm:text-7xl font-bold mb-6">
              <span style={gradientText}>Meet Nexora</span>
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed">
              The next-generation social media platform, built to connect you
              with the people who matter and create unforgettable memories.
            </p>

            {/* ===== Stats Cards ===== */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-2xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ===== Story Section ===== */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 sm:p-14 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl mb-16 text-left">
              <div className="flex items-center gap-3 mb-6">
                <FaRocket className="text-3xl text-indigo-600 animate-bounce" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Our Story
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                <span className="font-semibold text-indigo-600">Nexora</span>{' '}
                started from a simple dream: creating a place online where
                people feel safe, connected, and inspired. In a world full of
                traditional social networks, we wanted to break the mold.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Our team of creatives, engineers, and dreamers worked together
                to build a platform that prioritizes honesty, privacy, and a
                genuine experience.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Today,{' '}
                <span className="font-semibold text-purple-600">Nexora</span> is
                not just a platform — it's a movement towards better, more
                honest, and more human social media.
              </p>
            </div>

            {/* ===== Values Grid ===== */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                What We Stand For
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                The values that shape everything at Nexora
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {values.map((v, i) => (
                  <div
                    key={i}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-7 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
                  >
                    <div className="mb-4">{v.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== CTA Banner ===== */}
            <div
              className="backdrop-blur-xl rounded-3xl p-10 sm:p-14 border border-indigo-300/40 dark:border-indigo-700/40 shadow-2xl"
              style={gradientBannerBg}
            >
              <FaUsers className="text-5xl text-indigo-600 mx-auto mb-5 animate-bounce" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Ready to Join the Family?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
                Join the millions who chose Nexora as their home online. 🎉
              </p>
              <Link to="/register">
                <Button
                  className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-none text-lg"
                  style={gradientButton}
                >
                  <FaRocket />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* ===== Animated Background Blobs ===== */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </section>
      </div>
    </>
  );
}

export default About;
