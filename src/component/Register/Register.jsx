import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaTransgender,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaRedo,
  FaShieldAlt,
  FaUsers,
  FaBolt,
} from 'react-icons/fa';

import { useForm } from 'react-hook-form';
import { Alert, Button } from '@heroui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRePassword, setIsVisibleRePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const { register, handleSubmit, formState, getValues, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: '',
      gender: '',
      password: '',
      rePassword: '',
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

  const handleRegister = async data => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://linked-posts.routemisr.com/users/signup',
        {
          name: data.name,
          email: data.email,
          password: data.password,
          rePassword: data.rePassword,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
        }
      );
      console.log('Response:', response.data);
      setSuccess(true);
      reset();
      Navigate('/login');
    } catch (error) {
      console.error('Login error:', error.message);
      setError(parseServerError(error.response?.data?.error));
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError('');
      }, 5000);
    }
  };

  const genderOptions = [
    { key: 'male', label: 'Male', icon: '♂' },
    { key: 'female', label: 'Female', icon: '♀' },
    { key: 'hide', label: 'Prefer not to say', icon: '⚲' },
  ];

  return (
    <>
      <div className="w-1/2 mr-auto lg:flex items-center justify-center p-12 hidden">
        <div className="max-w-md">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 leading-tight text-gray-800 dark:text-white">
              Welcome to Our Community
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Join thousands of users who trust us with their journey. Create
              your account and unlock amazing features.
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
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 ">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <FaUserPlus className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Create Account
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Join us today and get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-5"
          >
            {/* Username */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  {...register('name', {
                    required: 'Username is required',
                    minLength: { value: 3, message: 'Min 3 characters' },
                    maxLength: { value: 20, message: 'Max 20 characters' },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: 'Only letters, numbers & underscore',
                    },
                  })}
                />
              </div>
              {formState.errors.name && (
                <p className="text-red-500 text-xs ml-1">
                  {formState.errors.name.message}
                </p>
              )}
            </div>

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
                    minLength: { value: 6, message: 'Min 6 characters' },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
                    },
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={isVisibleRePassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  {...register('rePassword', {
                    required: 'Confirm Password is required',
                    validate: value =>
                      value === getValues('password') ||
                      'Passwords do not match',
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setIsVisibleRePassword(!isVisibleRePassword)}
                >
                  {isVisibleRePassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formState.errors.rePassword && (
                <p className="text-red-500 text-xs ml-1">
                  {formState.errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
                  {...register('dateOfBirth', {
                    required: 'Date of Birth is required',
                    validate: value => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      const age = today.getFullYear() - birthDate.getFullYear();
                      return age >= 18 || 'You must be at least 18 years old';
                    },
                  })}
                />
              </div>
              {formState.errors.dateOfBirth && (
                <p className="text-red-500 text-xs ml-1">
                  {formState.errors.dateOfBirth.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1">
              <div className="relative">
                <FaTransgender className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all appearance-none cursor-pointer"
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(gender => (
                    <option key={gender.key} value={gender.key}>
                      {gender.icon} {gender.label}
                    </option>
                  ))}
                </select>
              </div>
              {formState.errors.gender && (
                <p className="text-red-500 text-xs ml-1">
                  {formState.errors.gender.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <Button
                type="button"
                onPress={() => {
                  reset();
                }}
                color="danger"
                variant="flat"
                className="w-full"
              >
                <FaRedo />
                Reset
              </Button>

              <Button
                color="primary"
                variant="flat"
                type="submit"
                className="w-full"
                disabled={isLoading}
                isLoading={isLoading}
              >
                <FaUserPlus />
                Register
              </Button>
            </div>
            {error && (
              <Alert color="danger" description={error} className="m-2" />
            )}
            {success && (
              <Alert
                color="success"
                title="You are registered successfully"
                description={`Now you can login to your account`}
                className="m-2"
              />
            )}

            <div className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-all"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
