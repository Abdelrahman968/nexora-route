import React, { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@heroui/react';
import { FaCamera, FaImage, FaUpload } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';

const API_URL = import.meta.env.VITE_BASE_URL;

function ChangePhoto() {
  const { userToken } = useContext(AuthContext);
  const { safeProfileInfo } = useContext(ProfileInfoContext);

  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const [photoSuccess, setPhotoSuccess] = useState(false);

  const uploadPhotoMutation = useMutation({
    mutationFn: async file => {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await axios.put(
        `${API_URL}/users/upload-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setPhotoSuccess(true);
      setPhotoError('');
      setSelectedFile(null);

      queryClient.invalidateQueries(['profileInfo']);

      setTimeout(() => {
        setPhotoSuccess(false);
      }, 3000);
    },
    onError: error => {
      setPhotoSuccess(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to upload photo. Please try again.';
      setPhotoError(errorMessage);

      setTimeout(() => {
        setPhotoError('');
      }, 5000);
    },
  });

  const handleFileChange = e => {
    const file = e.target.files[0];
    setPhotoError('');
    setPhotoSuccess(false);

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setPhotoError('Please upload a valid image file (JPG, PNG, or GIF)');
      return;
    }

    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setPhotoError('File size must be less than 4MB');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = () => {
    if (!selectedFile) {
      setPhotoError('Please select a photo first');
      return;
    }

    uploadPhotoMutation.mutate(selectedFile);
  };

  const avatar = safeProfileInfo.data.user?.photo;

  return (
    <div>
      <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          Profile Photo
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Upload and manage your profile picture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={previewUrl || avatar}
              alt="Profile"
              className="w-48 h-48 rounded-2xl object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            />
            <div className="absolute -bottom-3 -right-3 bg-indigo-600 rounded-full p-4 shadow-lg">
              <FaCamera className="text-white text-2xl" />
            </div>
          </div>

          {safeProfileInfo.data.user && (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {safeProfileInfo.data.user.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {safeProfileInfo.data.user.email}
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Upload Controls */}
        <div className="flex flex-col gap-4">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors bg-gray-50 dark:bg-gray-700/50">
            <div className="flex flex-col items-center justify-center">
              <FaImage className="text-5xl text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Click to upload
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG, GIF up to 4MB
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadPhotoMutation.isPending}
            />
          </label>

          {selectedFile && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
              <p className="text-sm text-indigo-800 dark:text-indigo-300 font-medium truncate">
                📎 {selectedFile.name}
              </p>
            </div>
          )}

          <Button
            color="primary"
            variant="flat"
            className="w-full"
            onPress={handlePhotoUpload}
            isLoading={uploadPhotoMutation.isPending}
            disabled={!selectedFile || uploadPhotoMutation.isPending}
          >
            <FaUpload />
            Upload Photo
          </Button>

          {photoError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-800 dark:text-red-300">
                {photoError}
              </p>
            </div>
          )}

          {photoSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                ✓ Profile photo updated successfully!
              </p>
            </div>
          )}

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <p className="text-xs text-indigo-800 dark:text-indigo-300 font-medium mb-2">
              Photo Requirements:
            </p>
            <ul className="text-xs text-indigo-700 dark:text-indigo-400 space-y-1">
              <li>• Maximum file size: 4MB</li>
              <li>• Supported formats: JPG, PNG, GIF</li>
              <li>• Recommended: Square images work best</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePhoto;
