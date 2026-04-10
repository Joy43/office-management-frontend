
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  key?: keyof T | string;
  render?: (item: T) => ReactNode;
}

interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const CommonTable = <T,>({ columns, data }: CommonTableProps<T>) => {
  return (
    <div className="rounded-md  overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead 
                key={index} 
                className="text-md font-bold   bg-[#E9E9E9] py-4"
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-slate-50/30 border-b">
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className="py-4 text-sm text-slate-700">
                    {col.render ? col.render(row) : (row[col.key as keyof T] as ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-10 text-slate-400">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommonTable;