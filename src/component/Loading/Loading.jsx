import { BiLogoMagento } from 'react-icons/bi';

function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900 animate-spin border-t-blue-600 dark:border-t-blue-400"></div>

          <div className="relative p-8 bg-linear-to-br from-blue-500 to-blue-700 rounded-full shadow-2xl animate-pulse">
            <BiLogoMagento className="text-5xl text-white" />
          </div>
        </div>

        <div className="flex gap-2">
          <span
            className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '0ms' }}
          ></span>
          <span
            className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '150ms' }}
          ></span>
          <span
            className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: '300ms' }}
          ></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
