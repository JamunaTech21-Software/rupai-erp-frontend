// Placeholder rows shown inside a <tbody> while a table loads.
export default function TableSkeleton({ rows = 5, columns = 6 }) {
  return Array.from({ length: rows }, (_, row) => (
    <tr key={row} className='animate-pulse border-b border-slate-100' aria-hidden='true'>
      {Array.from({ length: columns }, (_, col) => (
        <td key={col} className='px-4 py-3'>
          <div className='h-4 rounded bg-slate-200' style={{ width: `${55 + ((row + col) % 4) * 12}%` }} />
        </td>
      ))}
    </tr>
  ));
}
