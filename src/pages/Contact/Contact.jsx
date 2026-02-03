import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaHeart,
  FaHeadset,
  FaBuilding,
} from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const gradientButton = {
    background: 'linear-gradient(to right, #4f46e5, #9333ea, #ec4899)',
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const contactCards = [
    {
      icon: <FaEnvelope className="text-2xl text-indigo-500" />,
      title: 'Email Us',
      details: ['support@nexora.com', 'We reply within 24 hours'],
    },
    {
      icon: <FaPhone className="text-2xl text-purple-500" />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon – Fri, 9am – 6pm EST'],
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-pink-500" />,
      title: 'Visit Us',
      details: ['123 Innovation Ave', 'San Francisco, CA 94107'],
    },
  ];

  const supportTopics = [
    {
      icon: <FaHeadset className="text-indigo-500" />,
      label: 'Technical Support',
    },
    { icon: <FaHeart className="text-purple-500" />, label: 'Account Help' },
    {
      icon: <FaBuilding className="text-pink-500" />,
      label: 'Business Inquiry',
    },
    { icon: <FaEnvelope className="text-indigo-400" />, label: 'Feedback' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - Nexora</title>
        <meta name="description" content="Contact Nexora" />
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
              <FaEnvelope className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Get in Touch
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              <span style={gradientText}>Contact Us</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-14 leading-relaxed">
              Have a question, a suggestion, or just want to say hi? We'd love
              to hear from you. Our team is always here to help.
            </p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
              {contactCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/60 dark:bg-gray-700/60 shadow-sm mx-auto mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {card.details[0]}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.details[1]}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Section: Topics + Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
              {/* Left: Support Topics */}
              <div className="flex flex-col gap-4">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    What can we help with?
                  </h3>
                  <div className="flex flex-col gap-3">
                    {supportTopics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-700/40 border border-gray-200/40 dark:border-gray-600/40 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/60 dark:bg-gray-700/60 shadow-sm">
                          {topic.icon}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {topic.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                    Support Hours
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { day: 'Mon – Fri', time: '9:00 AM – 6:00 PM' },
                      { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
                      { day: 'Sunday', time: 'Closed' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {row.day}
                        </span>
                        <span
                          className={`text-sm ${row.time === 'Closed' ? 'text-pink-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                          {row.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg h-full">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Send Us a Message
                  </h3>

                  {/* Success Toast */}
                  {submitted && (
                    <div className="mb-5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 rounded-xl px-5 py-3 flex items-center gap-3">
                      <span className="text-green-600 dark:text-green-400 text-lg">
                        ✓
                      </span>
                      <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                        Your message has been sent successfully! We'll get back
                        to you soon.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-600/40 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                      />
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-600/40 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-600/40 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5 mb-6">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-gray-700/40 border border-gray-200/60 dark:border-gray-600/40 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border-none text-base"
                    style={gradientButton}
                  >
                    <FaPaperPlane />
                    Send Message
                  </button>
                </div>
              </div>
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

export default Contact;
