import React from 'react';
import { Button } from '@heroui/react';
import { FaExclamationTriangle, FaHome, FaRedo, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BiLogoMagento } from 'react-icons/bi';

function Error({
  title = 'Oops! Something went wrong',
  message = "We're sorry, but something unexpected happened. Please try again.",
  errorCode = '500',
  showHomeButton = true,
  showRetryButton = true,
  onRetry,
}) {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white dark:bg-[#1E2939] rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-start mb-6">
            <div className="p-3 bg-linear-to-br from-blue-500 to-blue-700 rounded-full">
              <BiLogoMagento className="text-3xl text-white" />
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>

              <div className="relative p-6 bg-red-100 dark:bg-red-900/30 rounded-full">
                <FaExclamationTriangle className="text-5xl text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-6xl font-bold text-gray-300 dark:text-gray-700">
              {errorCode}
            </p>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3">
            {title}
          </h2>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            {message}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {showRetryButton && (
              <Button
                color="primary"
                size="lg"
                className="w-full font-semibold"
                startContent={<FaRedo />}
                onPress={handleRetry}
              >
                Try Again
              </Button>
            )}

            {showHomeButton && (
              <Button
                color="default"
                variant="bordered"
                size="lg"
                className="w-full font-semibold"
                startContent={<FaHome />}
                onPress={handleGoHome}
              >
                Go to Home
              </Button>
            )}

            <Button
              color="danger"
              variant="bordered"
              size="lg"
              className="w-full font-semibold col-span-2"
              startContent={<FaTrash />}
              onPress={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}
            >
              remove cache
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-500">
              If the problem persists, please contact support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
