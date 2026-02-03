import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaFileContract,
  FaCheckCircle,
  FaTimesCircle,
  FaShieldAlt,
  FaGlobeAmericas,
  FaStar,
} from 'react-icons/fa';

function Licensing() {
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

  const gradientBadge = {
    background: 'linear-gradient(to right, #4f46e5, #9333ea)',
  };

  const tiers = [
    {
      icon: <FaShieldAlt className="text-2xl text-indigo-500" />,
      name: 'Personal',
      tag: null,
      desc: 'For individual users enjoying Nexora for personal connections and sharing.',
      features: [
        { text: 'Access to all core features', allowed: true },
        { text: 'Connect with friends & family', allowed: true },
        { text: 'Share posts, photos & stories', allowed: true },
        { text: 'Use on up to 2 devices', allowed: true },
        { text: 'Commercial or business use', allowed: false },
        { text: 'API or developer access', allowed: false },
      ],
    },
    {
      icon: <FaStar className="text-2xl text-purple-500" />,
      name: 'Creator',
      tag: 'Most Popular',
      desc: 'For content creators and small businesses building their brand on Nexora.',
      features: [
        { text: 'Everything in Personal', allowed: true },
        { text: 'Creator analytics & insights', allowed: true },
        { text: 'Branded content & sponsorships', allowed: true },
        { text: 'Priority support', allowed: true },
        { text: 'Use on unlimited devices', allowed: true },
        { text: 'Enterprise API access', allowed: false },
      ],
    },
    {
      icon: <FaGlobeAmericas className="text-2xl text-pink-500" />,
      name: 'Enterprise',
      tag: 'Custom',
      desc: 'For organizations looking for full integration, custom features, and dedicated support.',
      features: [
        { text: 'Everything in Creator', allowed: true },
        { text: 'Enterprise-grade API access', allowed: true },
        { text: 'Custom integrations & tools', allowed: true },
        { text: 'Dedicated account manager', allowed: true },
        { text: 'SLA & uptime guarantees', allowed: true },
        { text: 'White-label options available', allowed: true },
      ],
    },
  ];

  const terms = [
    {
      title: 'Permitted Use',
      content:
        'You may use Nexora strictly in accordance with the license tier you have agreed to. Any use outside the scope of your license — including redistribution, reverse engineering, or unauthorized commercial activity — is prohibited.',
    },
    {
      title: 'Intellectual Property',
      content:
        'All content, logos, branding, and technology on Nexora are the intellectual property of Nexora Inc. You may not copy, modify, or create derivative works without explicit written permission from Nexora.',
    },
    {
      title: 'Termination',
      content:
        'Nexora reserves the right to terminate or suspend your license at any time if you violate these terms. Upon termination, your access to the platform and any associated data may be removed in accordance with our Data Retention Policy.',
    },
    {
      title: 'Liability & Disclaimers',
      content:
        'Nexora is provided on an "as is" basis. We make no warranties, express or implied, regarding the platform\'s fitness for a particular purpose. In no event shall Nexora be liable for indirect, incidental, or consequential damages arising from your use of the platform.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Licensing - Nexora</title>
        <meta name="description" content="Licensing - Nexora" />
      </Helmet>
      <div className="w-full min-h-screen flex items-start justify-center">
        <section className="relative w-full">
          <div
            className="absolute inset-0 backdrop-blur-3xl"
            style={gradientHeroBg}
          ></div>

          <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-4 py-2 rounded-full mb-6 border border-gray-200/50 dark:border-gray-700/50">
              <FaFileContract className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Nexora Licensing
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span style={gradientText}>Licensing</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-14 leading-relaxed">
              Choose the license that fits your needs. Every tier is designed to
              give you the best experience on Nexora.
            </p>

            {/* License Tier Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
              {tiers.map((tier, i) => (
                <div
                  key={i}
                  className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col`}
                >
                  {/* Popular Tag */}
                  {tier.tag && (
                    <div className="flex justify-center mt-4">
                      <span
                        className="text-white text-xs font-bold px-3 py-1 rounded-full"
                        style={gradientBadge}
                      >
                        {tier.tag}
                      </span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon + Name */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/60 dark:bg-gray-700/60 shadow-sm">
                        {tier.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {tier.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                      {tier.desc}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-3 flex-1">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2">
                          {f.allowed ? (
                            <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                          ) : (
                            <FaTimesCircle className="text-gray-300 dark:text-gray-600 mt-0.5 shrink-0" />
                          )}
                          <span
                            className={`text-sm ${f.allowed ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}
                          >
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* License Terms */}
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                License Terms
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">
                Please read and understand the following terms before using
                Nexora.
              </p>

              <div className="flex flex-col gap-4">
                {terms.map((term, i) => (
                  <div
                    key={i}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-md"
                  >
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {term.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      {term.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-14 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                By using Nexora, you agree to these licensing terms. For
                enterprise inquiries or custom licensing arrangements, contact
                us at{' '}
                <span className="font-semibold text-indigo-600 cursor-pointer hover:underline">
                  licensing@nexora.com
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

export default Licensing;
