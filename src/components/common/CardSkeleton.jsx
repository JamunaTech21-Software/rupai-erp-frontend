// Placeholder summary cards while a page's numbers load.
export default function CardSkeleton({ count = 4, className = "" }) {
  return (
    <div className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`} role='status' aria-label='Loading'>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className='animate-pulse rounded-xl border border-slate-200 bg-white p-4'>
          <div className='mb-3 h-3 w-1/2 rounded bg-slate-200' />
          <div className='h-6 w-1/3 rounded bg-slate-200' />
        </div>
      ))}
    </div>
  );
}
