import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm'>
        {/* Icon */}
        <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100'>
          <AlertTriangle className='h-10 w-10 text-red-600' />
        </div>

        {/* Error Code */}
        <h1 className='mt-6 text-6xl font-bold text-red-600'>404</h1>

        {/* Title */}
        <h2 className='mt-4 text-2xl font-semibold text-gray-800'>
          Page Not Found
        </h2>

        {/* Description */}
        <p className='mt-3 text-gray-500'>
          Sorry, the page you are looking for doesn't exist or may have been
          moved.
        </p>

        {/* Buttons */}
        <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
          <button
            onClick={() => window.history.back()}
            className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to='/'
            className='flex items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700'
          >
            <Home size={18} />
            Go Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
