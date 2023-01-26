import classNames from "classnames";
import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export type TableProps<T> = {
  children?: ReactNode;
  columns: Array<{
    title: string;
    key: keyof T;
    sortable?: boolean;
    sticky?: boolean;
  }>;
  items: Array<T>;
  onSort?: (key: keyof T, order: "asc" | "desc") => void;
  primaryKey: keyof T;
  sortBy?: keyof T | null;
  sortOrder?: "asc" | "desc";
  zebra?: boolean;
};

const Table = <T extends object>({
  children,
  columns,
  items,
  onSort,
  primaryKey,
  sortBy = null,
  sortOrder = "asc",
  zebra,
}: PropsWithChildren<TableProps<T>>): ReactElement | null => {
  function handleSort(key: keyof T) {
    const column = columns.find((column) => column.key === key);
    if (!column?.sortable) return;

    const order = sortBy === key && sortOrder === "asc" ? "desc" : "asc";
    onSort?.(key, order);
  }

  const TableBody = () => (
    <>
      {items.map((item) => (
        <tr key={item[primaryKey] as string}>
          {columns.map(({ key, title, sticky }) => (
            <td key={title} className={classNames(sticky && "sticky right-0")}>
              {item[key] as string}
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className={classNames("table", "w-full", zebra && "table-zebra")}>
        <thead>
          <tr>
            {columns.map(({ key, title, sortable, sticky }) => (
              <th
                key={title}
                className={classNames(
                  sticky && "sticky right-0",
                  sortable && "cursor-pointer"
                )}
                onClick={() => handleSort(key)}
              >
                <div className="flex flex-row items-center gap-1">
                  {title}
                  {sortBy === key && sortOrder === "desc" && (
                    <MdArrowDropDown size={16} />
                  )}
                  {sortBy === key && sortOrder === "asc" && (
                    <MdArrowDropUp size={16} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children || <TableBody />}</tbody>
      </table>
    </div>
  );
};

export default Table;
