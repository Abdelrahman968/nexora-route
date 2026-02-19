import { useState, useRef, useContext } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Spinner,
} from '@heroui/react';
import {
  FaImage,
  FaSmile,
  FaPen,
  FaGlobe,
  FaUserFriends,
  FaLock,
  FaChevronDown,
  FaTrash,
  FaTimes,
} from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ProfileInfoContext } from '../../context/ProfileInfoContext';

const FEELINGS = [
  { emoji: '😊', label: 'happy' },
  { emoji: '😢', label: 'sad' },
  { emoji: '😍', label: 'in love' },
  { emoji: '😂', label: 'laughing' },
  { emoji: '😎', label: 'cool' },
  { emoji: '🥳', label: 'celebrating' },
  { emoji: '😤', label: 'frustrated' },
  { emoji: '🥰', label: 'grateful' },
  { emoji: '😴', label: 'tired' },
  { emoji: '🤩', label: 'excited' },
  { emoji: '😰', label: 'anxious' },
  { emoji: '💪', label: 'motivated' },
  { emoji: '🤔', label: 'thoughtful' },
  { emoji: '🥺', label: 'emotional' },
  { emoji: '😇', label: 'blessed' },
  { emoji: '🔥', label: 'on fire' },
];

const PRIVACY_OPTIONS = [
  {
    value: 'public',
    label: 'Everyone',
    icon: FaGlobe,
    color: 'text-sky-500',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    border: 'border-sky-300 dark:border-sky-700',
  },
  {
    value: 'following',
    label: 'Followers',
    icon: FaUserFriends,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-300 dark:border-emerald-700',
  },
  {
    value: 'private',
    label: 'Only me',
    icon: FaLock,
    color: 'text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    border: 'border-rose-300 dark:border-rose-700',
  },
];

function FeelingPicker({ selected, onSelect, onRemove, onClose }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-base text-gray-800 dark:text-gray-100">
          How are you feeling?
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
      {selected && (
        <button
          onClick={() => {
            onRemove();
            onClose();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-500 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all w-fit"
        >
          <FaTimes className="text-[10px]" />
          Remove &quot;{selected.emoji} {selected.label}&quot;
        </button>
      )}
      <div className="grid grid-cols-4 gap-2">
        {FEELINGS.map(f => (
          <button
            key={f.label}
            onClick={() => {
              onSelect(f);
              onClose();
            }}
            className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
              selected?.label === f.label
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-700'
            }`}
          >
            <span className="text-2xl">{f.emoji}</span>
            <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400 capitalize leading-tight text-center">
              {f.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PrivacyPicker({ selected, onSelect, onClose }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-base text-gray-800 dark:text-gray-100">
          Who can see this?
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {PRIVACY_OPTIONS.map(opt => {
          const Icon = opt.icon;
          const isActive = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                onClose();
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.01] ${
                isActive
                  ? `${opt.bg} ${opt.border} shadow-md`
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${opt.bg} border ${opt.border}`}
              >
                <Icon className={`${opt.color} text-lg`} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {opt.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {opt.value === 'public'
                    ? 'Visible to all users'
                    : opt.value === 'following'
                      ? 'Only your followers'
                      : 'Just you'}
                </p>
              </div>
              {isActive && (
                <div className="ml-auto w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CreatePost() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [activeTab, setActiveTab] = useState('text');
  const [subPanel, setSubPanel] = useState(null);

  const imageInputRef = useRef(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { userToken } = useContext(AuthContext);
  const { safeProfileInfo } = useContext(ProfileInfoContext);
  const queryClient = useQueryClient();

  const user = safeProfileInfo?.data?.user || {};
  const currentPrivacy = PRIVACY_OPTIONS.find(p => p.value === privacy);
  const PrivacyIcon = currentPrivacy.icon;

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      if (body.trim()) formData.append('body', body.trim());
      formData.append('privacy', privacy);
      if (image) formData.append('image', image);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['userPosts']);
      handleClose();
    },
  });

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return alert('Max 5MB');
    if (!file.type.startsWith('image/')) return alert('Images only');
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setActiveTab('image');
    e.target.value = '';
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (activeTab === 'image') setActiveTab('text');
  };

  const handleClose = () => {
    setBody('');
    setImage(null);
    setImagePreview(null);
    setFeeling(null);
    setPrivacy('public');
    setActiveTab('text');
    setSubPanel(null);
    onClose();
  };

  const canPost =
    (body.trim().length > 0 || image) &&
    body.length <= 500 &&
    !(activeTab === 'image' && !image);

  const getAvatarContent = () => {
    if (user?.photo?.startsWith('http')) {
      return (
        <img
          src={user.photo}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <span className="text-white font-bold text-lg">
        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
      </span>
    );
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="bg-white dark:bg-[#1E2939] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center gap-3 p-4 pb-3">
          <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-300 dark:ring-pink-700">
            {getAvatarContent()}
          </div>
          <button
            onClick={onOpen}
            className="flex-1 text-left px-5 py-3 bg-gray-100 dark:bg-gray-800/60 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700/60 transition-colors"
          >
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
              {feeling
                ? `Feeling ${feeling.emoji} ${feeling.label}...`
                : "What's on your mind?"}
            </span>
          </button>
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-800 mx-4" />

        <div className="flex items-center divide-x divide-gray-100 dark:divide-gray-800 px-2 py-1">
          <button
            onClick={() => {
              setActiveTab('image');
              onOpen();
              setTimeout(() => imageInputRef.current?.click(), 200);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            <FaImage className="text-emerald-500 text-base group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Photo
            </span>
          </button>
          <button
            onClick={() => {
              setActiveTab('feeling');
              setSubPanel('feeling');
              onOpen();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            <FaSmile className="text-amber-400 text-base group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Feeling
            </span>
          </button>
          <button
            onClick={() => {
              setActiveTab('text');
              onOpen();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            <FaPen className="text-indigo-400 text-base group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Write
            </span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        hideCloseButton
        classNames={{
          base: 'bg-white dark:bg-[#1a2335] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800',
          backdrop: 'bg-black/50 backdrop-blur-sm',
          wrapper: 'items-center',
        }}
      >
        <ModalContent>
          {() => (
            <ModalBody className="p-0 overflow-hidden h-full">
              {subPanel === 'feeling' && (
                <div className="p-5">
                  <FeelingPicker
                    selected={feeling}
                    onSelect={setFeeling}
                    onRemove={() => setFeeling(null)}
                    onClose={() => setSubPanel(null)}
                  />
                </div>
              )}

              {subPanel === 'privacy' && (
                <div className="p-5">
                  <PrivacyPicker
                    selected={privacy}
                    onSelect={setPrivacy}
                    onClose={() => setSubPanel(null)}
                  />
                </div>
              )}

              {subPanel === null && (
                <>
                  <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-extrabold bg-linear-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                      Create Post
                    </h3>
                    <button
                      onClick={handleClose}
                      disabled={createPostMutation.isPending}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-all"
                    >
                      <FaTimes className="text-sm cursor-pointer" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 px-5 py-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-pink-300 dark:ring-pink-800">
                      {getAvatarContent()}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-bold text-gray-900 dark:text-white text-sm leading-none">
                        {user?.name || 'User'}
                        {feeling && (
                          <span className="font-normal text-gray-500 dark:text-gray-400 ml-1">
                            is feeling {feeling.emoji}{' '}
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">
                              {feeling.label}
                            </span>
                          </span>
                        )}
                      </p>
                      <button
                        onClick={() => setSubPanel('privacy')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold transition-all hover:scale-105 mt-0.5 w-fit ${currentPrivacy.bg} ${currentPrivacy.border} ${currentPrivacy.color}`}
                      >
                        <PrivacyIcon className="text-[10px]" />
                        <span>{currentPrivacy.label}</span>
                        <FaChevronDown className="text-[9px] opacity-70" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-1 mx-5 mb-3 p-1 bg-gray-100 dark:bg-gray-800/60 rounded-2xl">
                    {[
                      { key: 'text', icon: FaPen, label: 'Write' },
                      { key: 'image', icon: FaImage, label: 'Photo' },
                      { key: 'feeling', icon: FaSmile, label: 'Feeling' },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveTab(tab.key);
                          if (tab.key === 'feeling') setSubPanel('feeling');
                          if (tab.key === 'image')
                            imageInputRef.current?.click();
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                          activeTab === tab.key
                            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <tab.icon className="text-xs" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="px-5 pb-3">
                    <textarea
                      value={body}
                      onChange={e => setBody(e.target.value)}
                      placeholder={
                        feeling
                          ? `Tell us more about feeling ${feeling.label}...`
                          : "What's on your mind?"
                      }
                      maxLength={500}
                      disabled={createPostMutation.isPending}
                      rows={imagePreview ? 2 : 5}
                      className="w-full resize-none bg-transparent text-gray-800 dark:text-gray-100 text-base placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none transition-all leading-relaxed"
                    />

                    {body.length > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              body.length > 450
                                ? 'bg-red-500'
                                : body.length > 300
                                  ? 'bg-amber-400'
                                  : 'bg-emerald-400'
                            }`}
                            style={{
                              width: `${Math.min((body.length / 500) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold tabular-nums ${body.length > 450 ? 'text-red-500' : 'text-gray-400'}`}
                        >
                          {500 - body.length}
                        </span>
                      </div>
                    )}

                    {imagePreview && (
                      <div className="relative mt-1 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 group shadow-md">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full max-h-50 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                        <button
                          onClick={removeImage}
                          className="absolute top-2.5 right-2.5 w-8 h-8 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                        <div className="absolute bottom-2.5 left-2.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all max-w-[60%] truncate">
                          {image?.name}
                        </div>
                        <button
                          onClick={() => imageInputRef.current?.click()}
                          className="absolute bottom-2.5 right-2.5 bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shadow"
                        >
                          Replace
                        </button>
                      </div>
                    )}

                    {!imagePreview && activeTab === 'image' && (
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="mt-2 w-full border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-pink-400 dark:hover:border-pink-600 rounded-2xl py-8 flex flex-col items-center gap-2 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-pink-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <FaImage className="text-white text-xl" />
                        </div>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          Click to upload a photo
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-600">
                          PNG, JPG, WEBP · max 5MB
                        </p>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        disabled={createPostMutation.isPending}
                        title="Add photo"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
                          imagePreview
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-500'
                        }`}
                      >
                        <FaImage className="text-sm" />
                      </button>
                      <button
                        onClick={() => setSubPanel('feeling')}
                        disabled={createPostMutation.isPending}
                        title="Add feeling"
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${
                          feeling
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500'
                        }`}
                      >
                        <FaSmile className="text-sm" />
                      </button>
                    </div>

                    <button
                      onClick={() => createPostMutation.mutate()}
                      disabled={!canPost || createPostMutation.isPending}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                        canPost && !createPostMutation.isPending
                          ? 'bg-linear-to-r from-pink-500 to-indigo-500 text-white shadow-lg hover:shadow-pink-500/30 hover:scale-105 active:scale-95'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {createPostMutation.isPending ? (
                        <>
                          <Spinner size="sm" color="white" />
                          <span>Posting...</span>
                        </>
                      ) : (
                        'Post'
                      )}
                    </button>
                  </div>

                  {createPostMutation.isError && (
                    <div className="mx-5 mb-4 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                      <p className="text-red-500 text-xs font-semibold">
                        {createPostMutation.error?.response?.data?.message ||
                          'Something went wrong. Try again.'}
                      </p>
                    </div>
                  )}
                </>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
