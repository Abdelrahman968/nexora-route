const API_URL = import.meta.env.VITE_BASE_URL;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaTransgender,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
  FaShieldAlt,
  FaUsers,
  FaBolt,
  FaStar,
  FaRocket,
  FaCheckCircle,
  FaHeart,
  FaExclamationCircle,
} from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

import { useForm, Controller } from 'react-hook-form';
import {
  addToast,
  Alert,
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
} from '@heroui/react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import SEO from '../SEO/SEO';

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRePassword, setIsVisibleRePassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, getValues, reset, control } =
    useForm({
      mode: 'onChange',
      defaultValues: {
        username: '',
        name: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        password: '',
        rePassword: '',
      },
    });

  const registerUser = async data => {
    const response = await axios.post(`${API_URL}/users/signup`, data);
    return response.data;
  };

  const { mutate, isPending, error, isSuccess, isError } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      addToast({
        color: 'success',
        title: 'Register',
        description: 'You have been registered.',
        icon: <FaUserPlus />,
        duration: 5000,
      });
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    },
    onError: err => {
      addToast({
        color: 'danger',
        title: 'Register',
        description: getErrorMessage(err),
        icon: <FaExclamationCircle />,
        duration: 5000,
      });
    },
  });

  const genderOptions = [
    { key: 'male', label: 'Male', icon: '♂' },
    { key: 'female', label: 'Female', icon: '♀' },
    { key: 'hide', label: 'Prefer not to say', icon: '⚲' },
  ];

  const getErrorMessage = error => {
    if (!error) return 'An error occurred';
    if (typeof error === 'string') return error;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.message) return error.message;
    return 'Registration failed. Please try again.';
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
      description:
        'Get started in seconds with our streamlined registration process',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  const benefits = [
    'Free forever',
    'No credit card required',
    'Instant activation',
    '24/7 support',
  ];

  return (
    <>
      <SEO
        title="Register"
        description="Register to your account and start using our platform"
        path="/register"
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
                  Join 10M+ Happy Users
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                <span className="bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Start Your Journey Today
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Join thousands of users who trust us. Create your account and
                unlock amazing features.
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

              {/* Benefits List */}
              <Card className="bg-linear-to-r from-indigo-600 to-purple-600 text-white mb-6">
                <CardBody className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <FaRocket className="text-2xl" />
                    What You Get
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-white/90 shrink-0" />
                        <span className="text-sm font-semibold">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Testimonial */}
              <Card className="bg-linear-to-r from-pink-600 to-rose-600 text-white">
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

          {/* Right Side - Register Form */}
          <div className="w-full">
            <Card className="bg-white dark:bg-[#1E2939] shadow-2xl">
              <CardBody className="p-0">
                {/* Form Header */}
                <div className="p-8 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 shadow-lg">
                      <FaUserPlus className="text-3xl" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-white/80 text-lg">
                      Join us today and get started for free
                    </p>
                  </div>
                </div>

                {/* Form Body */}
                <div className="p-8">
                  <form
                    onSubmit={handleSubmit(data => {
                      mutate(data);
                    })}
                    className="flex flex-col gap-4"
                  >
                    {/* Alert Messages */}
                    {isError && (
                      <Alert
                        color="danger"
                        title="Registration Failed"
                        description={getErrorMessage(error)}
                        className="shadow-lg"
                      />
                    )}
                    {isSuccess && (
                      <Alert
                        color="success"
                        title="Registration Successful!"
                        description="Redirecting you to login..."
                        className="shadow-lg"
                      />
                    )}

                    {/* Name & Username */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        isRequired
                        type="text"
                        label="Full Name"
                        placeholder="Enter your full name"
                        size="lg"
                        variant="bordered"
                        startContent={<FaUser className="text-gray-400" />}
                        classNames={{
                          input: 'text-base',
                          inputWrapper:
                            'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                        }}
                        isInvalid={!!formState.errors.name}
                        errorMessage={formState.errors.name?.message}
                        {...register('name', {
                          required: 'Name is required',
                          minLength: { value: 3, message: 'Min 3 characters' },
                          maxLength: {
                            value: 20,
                            message: 'Max 20 characters',
                          },
                          pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Only letters & spaces allowed',
                          },
                        })}
                      />

                      <Input
                        isRequired
                        type="text"
                        label="Username"
                        placeholder="Choose a username"
                        size="lg"
                        variant="bordered"
                        startContent={<FaUser className="text-gray-400" />}
                        classNames={{
                          input: 'text-base',
                          inputWrapper:
                            'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                        }}
                        isInvalid={!!formState.errors.username}
                        errorMessage={formState.errors.username?.message}
                        {...register('username', {
                          required: 'Username is required',
                          minLength: { value: 3, message: 'Min 3 characters' },
                          maxLength: {
                            value: 20,
                            message: 'Max 20 characters',
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: 'Only letters, numbers & underscore',
                          },
                        })}
                      />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <Input
                      isRequired
                      type={isVisible ? 'text' : 'password'}
                      label="Password"
                      placeholder="Create a password"
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
                        minLength: { value: 8, message: 'Min 8 characters' },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            'Must include uppercase, lowercase, number & special character',
                        },
                      })}
                    />

                    {/* Confirm Password */}
                    <Input
                      isRequired
                      type={isVisibleRePassword ? 'text' : 'password'}
                      label="Confirm Password"
                      placeholder="Re-enter your password"
                      size="lg"
                      variant="bordered"
                      startContent={
                        <FaLock className="text-gray-400 text-lg" />
                      }
                      endContent={
                        <button
                          type="button"
                          className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors focus:outline-none text-xl"
                          onClick={() =>
                            setIsVisibleRePassword(!isVisibleRePassword)
                          }
                        >
                          {isVisibleRePassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      }
                      classNames={{
                        input: 'text-base',
                        inputWrapper:
                          'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                      }}
                      isInvalid={!!formState.errors.rePassword}
                      errorMessage={formState.errors.rePassword?.message}
                      {...register('rePassword', {
                        required: 'Please confirm your password',
                        validate: value =>
                          value === getValues('password') ||
                          'Passwords do not match',
                      })}
                    />

                    {/* Date of Birth & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        isRequired
                        type="date"
                        label="Date of Birth"
                        size="lg"
                        variant="bordered"
                        startContent={<FaCalendar className="text-gray-400" />}
                        classNames={{
                          input: 'text-base',
                          inputWrapper:
                            'border-2 hover:border-pink-600 focus-within:border-pink-600 dark:hover:border-pink-400 dark:focus-within:border-pink-400',
                        }}
                        isInvalid={!!formState.errors.dateOfBirth}
                        errorMessage={formState.errors.dateOfBirth?.message}
                        {...register('dateOfBirth', {
                          required: 'Date of Birth is required',
                          validate: value => {
                            const today = new Date();
                            const birthDate = new Date(value);
                            const age =
                              today.getFullYear() - birthDate.getFullYear();
                            const monthDiff =
                              today.getMonth() - birthDate.getMonth();
                            const adjustedAge =
                              monthDiff < 0 ||
                              (monthDiff === 0 &&
                                today.getDate() < birthDate.getDate())
                                ? age - 1
                                : age;
                            return (
                              adjustedAge >= 18 ||
                              'You must be at least 18 years old'
                            );
                          },
                        })}
                      />

                      <Controller
                        name="gender"
                        control={control}
                        rules={{ required: 'Gender is required' }}
                        render={({ field, fieldState }) => (
                          <Select
                            label="Gender"
                            placeholder="Select your gender"
                            size="lg"
                            variant="bordered"
                            startContent={
                              <FaTransgender className="text-gray-400" />
                            }
                            classNames={{
                              trigger:
                                'border-2 hover:border-pink-600 data-[focus=true]:border-pink-600 dark:hover:border-pink-400 dark:data-[focus=true]:border-pink-400',
                            }}
                            isInvalid={!!fieldState.error}
                            errorMessage={fieldState.error?.message}
                            isRequired
                            selectedKeys={field.value ? [field.value] : []}
                            onSelectionChange={keys => {
                              const selectedValue = Array.from(keys)[0];
                              field.onChange(selectedValue);
                            }}
                          >
                            {genderOptions.map(gender => (
                              <SelectItem key={gender.key} value={gender.key}>
                                {gender.label}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>

                    {/* Register Button */}
                    <div className="mt-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-linear-to-r from-pink-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all"
                        isDisabled={isPending}
                        isLoading={isPending}
                        startContent={!isPending && <FaUserPlus />}
                      >
                        {isPending ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-[#1E2939] text-gray-500 dark:text-gray-400 font-semibold">
                          Already have an account?
                        </span>
                      </div>
                    </div>

                    {/* Login Link */}
                    <Button
                      as={Link}
                      to="/login"
                      size="lg"
                      variant="bordered"
                      className="w-full border-2 border-pink-600 text-pink-600 dark:border-pink-400 dark:text-pink-400 font-bold text-lg hover:scale-105 transition-all"
                      startContent={<FaRocket />}
                    >
                      Sign In Instead
                    </Button>
                  </form>
                </div>

                {/* Form Footer */}
                <div className="px-8 pb-8">
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                      By creating an account, you agree to our{' '}
                      <Link
                        to="/terms"
                        className="text-pink-600 dark:text-pink-400 hover:underline"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacy"
                        className="text-pink-600 dark:text-pink-400 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </p>
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

export default Register;
