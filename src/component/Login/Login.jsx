const API_URL = import.meta.env.VITE_BASE_URL;

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
  FaCheckCircle,
  FaRocket,
  FaStar,
  FaHeart,
  FaExclamationCircle,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

import { useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Input,
  Checkbox,
  addToast,
  Card,
  CardBody,
} from '@heroui/react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import SEO from '../SEO/SEO';

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { userTokenHandler } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const loginUser = async data => {
    const response = await axios.post(`${API_URL}/users/signin`, {
      login: data.email,
      password: data.password,
    });
    return response.data;
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      const token = data.data.token;
      userTokenHandler(token);
      addToast({
        color: 'success',
        title: 'Login',
        description: 'You have been logged in.',
        icon: <FaCheckCircle />,
        duration: 5000,
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    },
    onError: err => {
      addToast({
        color: 'danger',
        title: 'Login',
        description: getErrorMessage(err),
        icon: <FaExclamationCircle />,
        duration: 5000,
      });
    },
  });

  const getErrorMessage = error => {
    if (!error) return 'Something went wrong';

    const errorText = error.response?.data?.error || error.message || '';

    if (errorText.includes('password') && errorText.includes('regex')) {
      return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    if (errorText.includes('incorrect') || errorText.includes('not exist')) {
      return 'Email or password is incorrect';
    }

    if (errorText.includes('email')) {
      return 'Invalid email address';
    }

    return 'Invalid login credentials';
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: 'Secure & Private',
      description:
        'Your data is encrypted and protected with industry-standard security',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: 'Growing Community',
      description: 'Connect with like-minded individuals from around the world',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FaBolt className="text-2xl" />,
      title: 'Fast & Easy',
      description: 'Get started in seconds with our streamlined process',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <>
      <SEO
        title="Login"
        description="Login to your account and start using our platform"
        path="/login"
      />

      <div className="w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="hidden lg:block">
            <div className="max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white dark:bg-[#1E2939] px-4 py-2 rounded-full shadow-lg mb-6">
                <FaStar className="text-yellow-500" />
                <span className="text-sm font-semibold bg-linear-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  Trusted by 10M+ Users
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Sign in to continue your journey and access all your features.
              </p>

              {/* Feature Cards */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-[#1E2939] hover:scale-105 transition-all cursor-pointer"
                  >
                    <CardBody className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-linear-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}
                        >
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Testimonial */}
              <Card className="bg-linear-to-r from-pink-600 to-purple-600 text-white">
                <CardBody className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">Abdelrahman Ayman</span>
                        <MdVerified className="text-white" />
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-300 text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 italic leading-relaxed">
                    "Best platform I've used. The experience has been seamless
                    from day one!"
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <Card className="bg-white dark:bg-[#1E2939] shadow-2xl">
              <CardBody className="p-0">
                {/* Form Header */}
                <div className="p-8 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 shadow-lg">
                      <FaSignInAlt className="text-3xl" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2">
                      Sign In to Your Account
                    </h2>
                    <p className="text-white/80 text-lg">
                      Access your personalized dashboard
                    </p>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-8">
                  <form
                    onSubmit={handleSubmit(mutate)}
                    className="flex flex-col gap-5"
                  >
                    {/* Alert Messages */}
                    {isError && (
                      <Alert
                        color="danger"
                        title="Login Failed"
                        description={getErrorMessage(error)}
                        className="shadow-lg"
                      />
                    )}
                    {isSuccess && (
                      <Alert
                        color="success"
                        title="Login Successful!"
                        description="Redirecting you to home..."
                        className="shadow-lg"
                      />
                    )}

                    {/* Email */}
                    <div>
                      <Input
                        isRequired
                        type="email"
                        label="Email Address"
                        placeholder="Enter your email"
                        size="lg"
                        variant="bordered"
                        startContent={
                          <FaEnvelope className="text-gray-400 text-lg" />
                        }
                        classNames={{
                          input: 'text-base',
                          inputWrapper:
                            'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                        }}
                        isInvalid={!!formState.errors.email}
                        errorMessage={formState.errors.email?.message}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email format',
                          },
                        })}
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <Input
                        isRequired
                        type={isVisible ? 'text' : 'password'}
                        label="Password"
                        placeholder="Enter your password"
                        size="lg"
                        variant="bordered"
                        startContent={
                          <FaLock className="text-gray-400 text-lg" />
                        }
                        endContent={
                          <button
                            type="button"
                            className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors focus:outline-none text-xl"
                            onClick={() => setIsVisible(!isVisible)}
                          >
                            {isVisible ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        }
                        classNames={{
                          input: 'text-base',
                          inputWrapper:
                            'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                        }}
                        isInvalid={!!formState.errors.password}
                        errorMessage={formState.errors.password?.message}
                        {...register('password', {
                          required: 'Password is required',
                        })}
                      />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <Checkbox
                        size="md"
                        {...register('rememberMe')}
                        classNames={{
                          wrapper: 'after:bg-pink-600 dark:after:bg-pink-400',
                        }}
                      >
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          Remember me
                        </span>
                      </Checkbox>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-semibold text-pink-600 dark:text-pink-400 hover:underline transition-all"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all mt-2"
                      isDisabled={isPending}
                      isLoading={isPending}
                      startContent={!isPending && <FaSignInAlt />}
                    >
                      {isPending ? 'Signing In...' : 'Sign In'}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-[#1E2939] text-gray-500 dark:text-gray-400 font-semibold">
                          New to our platform?
                        </span>
                      </div>
                    </div>

                    {/* Register Link */}
                    <Button
                      as={Link}
                      to="/register"
                      size="lg"
                      variant="bordered"
                      className="w-full border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold text-lg hover:scale-105 transition-all"
                      startContent={<FaRocket />}
                    >
                      Create New Account
                    </Button>
                  </form>
                </div>

                {/* Form Footer */}
                <div className="px-8 pb-8">
                  <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        10M+
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Users
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        4.8★
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Rating
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        99.9%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Uptime
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
