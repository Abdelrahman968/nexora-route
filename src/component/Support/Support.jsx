import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tabs,
  Tab,
} from '@heroui/react';
import {
  MdContactSupport,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdFeedback,
  MdHelp,
} from 'react-icons/md';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaCheckCircle,
} from 'react-icons/fa';
import SEO from '../SEO/SEO';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    feedbackType: 'general',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        feedbackType: 'general',
      });
    }, 3000);
  };

  const faqItems = [
    {
      question: 'How do I create an account?',
      answer:
        'Click on the Register button in the navigation bar and fill in your details to create a new account.',
    },
    {
      question: 'How can I reset my password?',
      answer:
        'Go to the login page and click on "Forgot Password". Enter your email address and follow the instructions sent to your inbox.',
    },
    {
      question: 'How do I report inappropriate content?',
      answer:
        'Click on the three dots menu on any post and select "Report". Choose the reason and submit your report.',
    },
    {
      question: 'Can I delete my account?',
      answer:
        'Yes, go to Settings > Account > Delete Account. Please note this action is permanent.',
    },
    {
      question: 'How do I change my profile picture?',
      answer:
        'Navigate to your Profile, click on your current profile picture, and upload a new image.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, we use industry-standard encryption and security measures to protect your personal information.',
    },
  ];

  const contactInfo = [
    {
      icon: <MdEmail className="text-2xl" />,
      title: 'Email',
      value: 'se.abdelrahman968@gmail.com',
      link: 'mailto:se.abdelrahman968@gmail.com',
    },
    {
      icon: <MdPhone className="text-2xl" />,
      title: 'Phone',
      value: '+201556790812',
      link: 'tel:+201556790812',
    },
    {
      icon: <MdLocationOn className="text-2xl" />,
      title: 'Address',
      value: 'Egypt, El-Dakhlia, El-Mansoura',
      link: null,
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, name: 'Facebook', link: '#' },
    { icon: <FaTwitter />, name: 'Twitter', link: '#' },
    { icon: <FaInstagram />, name: 'Instagram', link: '#' },
    { icon: <FaLinkedin />, name: 'LinkedIn', link: '#' },
    { icon: <FaDiscord />, name: 'Discord', link: '#' },
  ];

  const feedbackTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'praise', label: 'Praise' },
  ];

  return (
    <>
      <SEO
        title="Support Center"
        description="Support Center - Get in touch with our support team"
        path="/support"
      />
      <div className="min-h-screen w-full py-12 px-10">
        <div className="w-full mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl">
                <MdContactSupport className="text-5xl text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Support Center
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              We're here to help! Get in touch with our support team or explore
              our FAQ section.
            </p>
          </div>

          <div className="mb-12 text-center">
            <Tabs
              aria-label="Support options"
              variant="underlined"
              classNames={{
                tabList:
                  'gap-6 w-full relative rounded-none p-0 border-b border-divider bg-white dark:bg-[#1E2939] px-4',
                cursor: 'w-full bg-linear-to-r from-pink-600 to-indigo-600',
                tab: 'max-w-fit px-4 h-12',
                tabContent:
                  'group-data-[selected=true]:text-pink-600 dark:group-data-[selected=true]:text-pink-400 font-semibold',
              }}
            >
              <Tab
                key="contact"
                title={
                  <div className="flex items-center gap-2">
                    <MdEmail className="text-xl" />
                    <span>Contact Us</span>
                  </div>
                }
              >
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="space-y-6">
                    <Card className="bg-white dark:bg-[#1E2939]">
                      <CardHeader className="pb-0">
                        <h2 className="text-2xl font-bold">Get in Touch</h2>
                      </CardHeader>
                      <CardBody className="gap-4">
                        {contactInfo.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-lg transition-all"
                          >
                            <div className="p-3 bg-linear-to-r from-pink-600 to-indigo-600 rounded-lg text-white">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">
                                {item.title}
                              </h3>
                              {item.link ? (
                                <a
                                  href={item.link}
                                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <p className="text-gray-600 dark:text-gray-400">
                                  {item.value}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardBody>
                    </Card>

                    <Card className="bg-white dark:bg-[#1E2939]">
                      <CardHeader className="pb-0">
                        <h2 className="text-2xl font-bold">Follow Us</h2>
                      </CardHeader>
                      <CardBody>
                        <div className="flex gap-3 flex-wrap">
                          {socialLinks.map((social, index) => (
                            <a
                              key={index}
                              href={social.link}
                              className="p-3 bg-[#E5E7EB] dark:bg-[#0F1419] rounded-lg text-2xl hover:bg-linear-to-r hover:from-pink-600 hover:to-indigo-600 hover:text-white transition-all hover:scale-110"
                              title={social.name}
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>
                      </CardBody>
                    </Card>

                    {/* Business Hours */}
                    <Card className="bg-white dark:bg-[#1E2939]">
                      <CardHeader className="pb-0">
                        <h2 className="text-2xl font-bold">Business Hours</h2>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">
                              Monday - Friday
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              9:00 AM - 6:00 PM
                            </span>
                          </div>
                          <Divider />
                          <div className="flex justify-between">
                            <span className="font-semibold">Saturday</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              10:00 AM - 4:00 PM
                            </span>
                          </div>
                          <Divider />
                          <div className="flex justify-between">
                            <span className="font-semibold">Sunday</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Closed
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Contact Form */}
                  <Card className="bg-white dark:bg-[#1E2939]">
                    <CardHeader className="pb-0">
                      <h2 className="text-2xl font-bold">Send us a Message</h2>
                    </CardHeader>
                    <CardBody>
                      {isSubmitted ? (
                        <div className="text-center py-12">
                          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-2">
                            Message Sent!
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            We'll get back to you as soon as possible.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <Input
                            label="Name"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Input
                            label="Subject"
                            placeholder="What's this about?"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Textarea
                            label="Message"
                            placeholder="Tell us how we can help..."
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            minRows={6}
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Button
                            type="submit"
                            className="w-full bg-linear-to-r from-pink-600 to-indigo-600 text-white font-semibold py-6"
                            size="lg"
                          >
                            Send Message
                          </Button>
                        </form>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </Tab>

              {/* Feedback Tab */}
              <Tab
                key="feedback"
                title={
                  <div className="flex items-center gap-2">
                    <MdFeedback className="text-xl" />
                    <span>Feedback</span>
                  </div>
                }
              >
                <div className="w-full mx-auto mt-8">
                  <Card className="bg-white dark:bg-[#1E2939]">
                    <CardHeader className="pb-0">
                      <div className="w-full">
                        <h2 className="text-2xl font-bold mb-2">
                          Share Your Feedback
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                          Your opinion matters! Help us improve{' '}
                          {import.meta.env.VITE_APP_TITLE}.
                        </p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      {isSubmitted ? (
                        <div className="text-center py-12">
                          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-2">
                            Thank You!
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            We appreciate your feedback and will use it to
                            improve our platform.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div>
                            <label className="block mb-3 font-semibold">
                              Feedback Type
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {feedbackTypes.map(type => (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() =>
                                    setFormData(prev => ({
                                      ...prev,
                                      feedbackType: type.value,
                                    }))
                                  }
                                  className={`p-4 rounded-lg font-semibold transition-all cursor-pointer ${
                                    formData.feedbackType === type.value
                                      ? 'bg-linear-to-r from-pink-600 to-indigo-600 text-white scale-102'
                                      : 'bg-[#E5E7EB] dark:bg-[#0F1419] hover:scale-99'
                                  }`}
                                >
                                  {type.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <Input
                            label="Name"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Textarea
                            label="Your Feedback"
                            placeholder="Tell us what you think..."
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            minRows={8}
                            classNames={{
                              input: 'bg-transparent',
                              inputWrapper:
                                'bg-[#E5E7EB] dark:bg-[#0F1419] border-none',
                            }}
                          />
                          <Button
                            type="submit"
                            className="w-full bg-linear-to-r from-pink-600 to-indigo-600 text-white font-semibold py-6"
                            size="lg"
                          >
                            Submit Feedback
                          </Button>
                        </form>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </Tab>

              {/* FAQ Tab */}
              <Tab
                key="faq"
                title={
                  <div className="flex items-center gap-2">
                    <MdHelp className="text-xl" />
                    <span>FAQ</span>
                  </div>
                }
              >
                <div className="w-full mx-auto mt-8">
                  <Card className="bg-white dark:bg-[#1E2939] mb-6">
                    <CardHeader>
                      <h2 className="text-2xl font-bold">
                        Frequently Asked Questions
                      </h2>
                    </CardHeader>
                  </Card>

                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <Card
                        key={index}
                        className="bg-white dark:bg-[#1E2939] hover:scale-[1.02] transition-all"
                      >
                        <CardBody>
                          <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                            <span className="text-pink-600 dark:text-pink-400">
                              Q:
                            </span>
                            {item.question}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 pl-6">
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400 mr-2">
                              A:
                            </span>
                            {item.answer}
                          </p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-linear-to-r from-pink-600 to-indigo-600 text-white mt-8">
                    <CardBody className="text-center">
                      <h3 className="text-xl font-bold mb-2">
                        Still have questions?
                      </h3>
                      <p className="mb-4">
                        Our support team is ready to help you!
                      </p>
                      <Button
                        className="bg-white text-pink-600 font-semibold"
                        size="lg"
                      >
                        Contact Support
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </Tab>
            </Tabs>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1E2939] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">24/7</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Support Available
              </div>
            </div>
            <div className="bg-white dark:bg-[#1E2939] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                &lt;2h
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Average Response
              </div>
            </div>
            <div className="bg-white dark:bg-[#1E2939] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Satisfaction Rate
              </div>
            </div>
            <div className="bg-white dark:bg-[#1E2939] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">50K+</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Issues Resolved
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
