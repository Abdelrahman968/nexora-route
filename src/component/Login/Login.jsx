import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaShieldAlt,
  FaUsers,
  FaBolt,
} from 'react-icons/fa';

import { useForm } from 'react-hook-form';
import { Alert, Button } from '@heroui/react';
import axios from 'axios';

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const parseServerError = error => {
    if (!error) return 'Something went wrong';

    if (error.includes('password') && error.includes('regex')) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (error.includes('incorrect') || error.includes('not exist')) {
      return 'Email or password is incorrect';
    }

    if (error.includes('email')) {
      return 'Invalid email address';
    }

    return 'Invalid login credentials';
  };

  const handleLogin = async data => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://linked-posts.routemisr.com/users/signin',
        {
          email: data.email,
          password: data.password,
        }
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      setSuccess(true);
      console.log('Response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      setError(parseServerError(error.response?.data?.error));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
        setError('');
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-1/2 mr-auto  items-center justify-center p-12 hidden lg:flex">
        <div className="max-w-md">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 leading-tight text-gray-800 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Sign in to continue your journey with us and access all your
              features.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FaShieldAlt className="text-3xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                  Secure & Private
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your data is encrypted and protected with industry-standard
                  security
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FaUsers className="text-3xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                  Growing Community
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect with like-minded individuals from around the world
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FaBolt className="text-3xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                  Fast & Easy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get started in seconds with our streamlined registration
                  process
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              "Best platform I've used. The experience has been seamless from
              day one!"
            </p>
            <p className="text-sm font-semibold mt-2 text-gray-800 dark:text-white">
              - Sarah J., Community Member
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:ml-auto">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <FaSignInAlt className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Sign In
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Access your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-5"
          >
            {/* Email */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format',
                    },
                  })}
                />
              </div>
              {formState.errors.email && (
                <p className="text-red-500 text-xs ml-1">
                  {formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={isVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formState.errors.password && (
                <p className="text-red-500 text-xs ml-1">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  {...register('rememberMe')}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline transition-all"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              color="primary"
              variant="flat"
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              <FaSignInAlt />
              Sign In
            </Button>
            {error && (
              <Alert color="danger" description={error} className="m-2" />
            )}
            {success && (
              <Alert
                color="success"
                title="You are logged in successfully"
                description={`Now you can login to your account`}
                className="m-2"
              />
            )}

            {/* Register Link */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-all"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
