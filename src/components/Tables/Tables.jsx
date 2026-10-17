import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useChange } from "../../store/useChange";
import './Tables.css';

function Tables({ data, columns }) {
  const { mood } = useChange();

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getRowId: (row) => String(row.id), 
});

  return (
    <div
      className={`table-wapper ${
        mood ? 'bg-[var(--color-dark-second)]' : 'bg-white'
      }`}
    >
      <table className="table">

        <thead className={mood ? 'bg-gray-800' : 'bg-[var(--color-light-main)]'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.original.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={
                    mood
                      ? 'text-[var(--color-light-text)]'
                      : 'text-[var(--color-dark-text)]'
                  }
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Tables;