import { Button, Card, CardBody } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaRocket,
  FaCompass,
  FaExclamationTriangle,
  FaStar,
  FaQuestionCircle,
} from 'react-icons/fa';
import SEO from '../../component/SEO/SEO';

function Error404() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Home',
      description: 'Back to the main page',
      icon: <FaHome />,
      path: '/',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Explore',
      description: 'Discover new content',
      icon: <FaCompass />,
      path: '/explore',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Communities',
      description: 'Join communities',
      icon: <FaStar />,
      path: '/community',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Help Center',
      description: 'Get support',
      icon: <FaQuestionCircle />,
      path: '/support',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const floatingElements = [
    { icon: '🌟', delay: '0s', duration: '3s', position: 'top-20 left-10' },
    { icon: '✨', delay: '0.5s', duration: '4s', position: 'top-40 right-20' },
    {
      icon: '💫',
      delay: '1s',
      duration: '3.5s',
      position: 'bottom-20 left-20',
    },
    {
      icon: '⭐',
      delay: '1.5s',
      duration: '4.5s',
      position: 'bottom-40 right-10',
    },
    { icon: '🚀', delay: '2s', duration: '3s', position: 'top-60 left-1/4' },
    {
      icon: '🎯',
      delay: '2.5s',
      duration: '4s',
      position: 'bottom-60 right-1/4',
    },
  ];

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist"
        path="/404"
      />

      <div className="w-full min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} text-4xl opacity-20 pointer-events-none`}
            style={{
              animation: `float ${element.duration} ease-in-out ${element.delay} infinite`,
            }}
          >
            {element.icon}
          </div>
        ))}

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}</style>

        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-8">
            <div className="p-8 md:p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-72 h-72 bg-linear-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                  </div>

                  <h1 className="relative text-9xl md:text-[12rem] lg:text-[16rem] font-extrabold">
                    <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      404
                    </span>
                  </h1>
                </div>

                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-r from-yellow-500 to-orange-500 text-white shadow-lg animate-bounce">
                    <FaExclamationTriangle className="text-5xl" />
                  </div>
                </div>

                <div className="mb-8 space-y-4">
                  <h2 className="text-4xl md:text-5xl font-extrabold">
                    <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                      Oops! Page Not Found
                    </span>
                  </h2>

                  <p className="text-xl max-w-2xl mx-auto leading-relaxed">
                    The page you're looking for seems to have wandered off into
                    the digital void. Don't worry, even the best explorers get
                    lost sometimes!
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button
                    as={Link}
                    to="/"
                    size="lg"
                    className="bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-lg px-8 py-7 shadow-lg hover:scale-105 transition-all min-w-[200px]"
                    startContent={<FaHome className="text-xl" />}
                  >
                    Go to Homepage
                  </Button>

                  <Button
                    onPress={() => navigate(-1)}
                    size="lg"
                    variant="bordered"
                    className="border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold text-lg px-8 py-7 hover:scale-105 transition-all min-w-[200px]"
                    startContent={<FaArrowLeft className="text-xl" />}
                  >
                    Go Back
                  </Button>
                </div>

                {/* Helpful Suggestion */}
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 px-6 py-3 rounded-full">
                  <FaSearch className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Try searching or use the quick links below
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Quick Links to Get You Back on Track
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.path} className="group">
                  <Card className="bg-white dark:bg-[#1E2939] shadow-lg hover:scale-105 transition-all cursor-pointer h-full">
                    <CardBody className="p-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-linear-to-r ${link.gradient} flex items-center justify-center text-white text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        {link.icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {link.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {link.description}
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Fun Fact Card */}
          <Card className="bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-2xl">
            <CardBody className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FaRocket className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Did You Know?</h3>
                  <p className="text-white/90 leading-relaxed">
                    Error 404 was named after room 404 at CERN where the World
                    Wide Web was invented. The room didn't exist, just like the
                    page you're looking for! 🚀
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Error Code Footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-mono">ERROR_CODE: 404</span>
              <span>•</span>
              <span>PAGE_NOT_FOUND</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaExclamationTriangle className="text-yellow-500" />
                Lost in Space
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;
