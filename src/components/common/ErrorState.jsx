import { AlertCircle } from "lucide-react";

// A failed load: what went wrong and a Retry button.
export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div role='alert' className='flex flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-8 text-center'>
      <AlertCircle className='h-8 w-8 text-red-500' />
      <p className='text-sm font-medium text-red-700'>{message}</p>
      {onRetry && (
        <button
          type='button'
          onClick={onRetry}
          className='cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark'
        >
          Retry
        </button>
      )}
    </div>
  );
}
