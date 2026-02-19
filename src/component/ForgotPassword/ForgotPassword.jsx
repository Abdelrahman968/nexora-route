import { Button, Input } from '@heroui/react';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto py-10">
        <form
          onSubmit={e => e.preventDefault()}
          className="flex flex-col gap-4 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
            <div className="flex flex-col gap-0 md:gap-2 text-center md:text-left">
              <h1 className="text-xl md:text-3xl font-bold">Forgot Password</h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>
            <div className="text-xl md:text-4xl hidden md:block">
              <FaRegUser className="text-gray-400 " />
            </div>
          </div>
          <Input
            label="Email"
            placeholder="Enter your email address"
            type="email"
          />
          <Button color="primary" isDisabled>
            Send Reset Link
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Remember your password? <Link to="/login">Login here</Link>
            </p>
            <p className="text-sm text-red-500">
              NOT WORKING
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
