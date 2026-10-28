// One table row saying there is nothing to show.
export default function EmptyRow({ columns = 6, message = "No records found" }) {
  return (
    <tr>
      <td colSpan={columns} className='px-4 py-10 text-center text-sm text-slate-500'>
        {message}
      </td>
    </tr>
  );
}
