import { useState, useContext } from 'react';
import { Alert, Button, Input } from '@heroui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { TbPasswordFingerprint } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BASE_URL;

function ChangePassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const navigate = useNavigate();

  const { userToken, userTokenHandler } = useContext(AuthContext);

  const { register, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
    },
  });

  const patchPassword = async data => {
    const response = await axios.patch(
      `${API_URL}/users/change-password`,
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: patchPassword,
    onSuccess: response => {
      const token = response?.data?.data?.token;
      console.log('token', token);
      if (token) {
        userTokenHandler(token);
        console.log('Password changed successfully');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        console.error('Token not found in response:', response);
      }
    },
    onError: err => {
      console.error('Error changing password:', err);
      console.error('Error response:', err.response?.data);
    },
  });

  return (
    <>
      <div className="w-full mx-auto py-10">
        <form
          onSubmit={handleSubmit(data => mutate(data))}
          className="flex flex-col gap-4 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
            <div className="flex flex-col gap-0 md:gap-2 text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold">Change Password</h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Keep your account secure by using a strong password.
              </p>
            </div>
            <div className="text-xl md:text-4xl hidden md:block">
              <FaLock className="text-gray-400 " />
            </div>
          </div>
          <div>
            <Input
              label="Current Password"
              placeholder="Enter your current password"
              type={isVisible ? 'text' : 'password'}
              startContent={<TbPasswordFingerprint className="text-gray-400" />}
              endContent={
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              }
              {...register('password', {
                required: 'Current password is required',
              })}
              errorMessage={formState.errors.password?.message}
              isInvalid={!!formState.errors.password}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              label="New Password"
              placeholder="Enter your new password"
              type={isNewVisible ? 'text' : 'password'}
              startContent={<FaLock className="text-gray-400" />}
              endContent={
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => setIsNewVisible(!isNewVisible)}
                >
                  {isNewVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              }
              {...register('newPassword', {
                required: 'New password is required',
              })}
              errorMessage={formState.errors.newPassword?.message}
              isInvalid={!!formState.errors.newPassword}
            />
            <Input
              label="Confirm New Password"
              placeholder="Enter your confirm password"
              type={isConfirmVisible ? 'text' : 'password'}
              startContent={<FaLock className="text-gray-400" />}
              endContent={
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
                  onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                >
                  {isConfirmVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              }
              {...register('confirmPassword', {
                required: 'Confirm new password is required',
                validate: value =>
                  value === getValues('newPassword') ||
                  'Passwords do not match',
              })}
              errorMessage={formState.errors.confirmPassword?.message}
              isInvalid={!!formState.errors.confirmPassword}
            />
          </div>
          <Button
            color="primary"
            isLoading={isPending}
            isDisabled={isPending}
            onPress={handleSubmit(data => mutate(data))}
          >
            Change Password
          </Button>
          {isSuccess && (
            <Alert color="success">Password changed successfully</Alert>
          )}
          {isError && (
            <Alert color="danger">
              {error?.response?.data?.message ||
                error?.message ||
                'Failed to change password'}
            </Alert>
          )}
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
