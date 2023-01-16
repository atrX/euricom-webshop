import classNames from "classnames";
import type { PropsWithChildren, ReactElement, ReactNode } from "react";

export type TableProps<T> = {
  children?: ReactNode;
  columns: Array<{
    title: string;
    key: keyof T;
    sticky?: boolean;
  }>;
  items: Array<T>;
  primaryKey: keyof T;
  zebra?: boolean;
};

const Table = <T extends object>({
  children,
  columns,
  items,
  primaryKey,
  zebra,
}: PropsWithChildren<TableProps<T>>): ReactElement | null => {
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
            {columns.map(({ title, sticky }) => (
              <th
                key={title}
                className={classNames(sticky && "sticky right-0")}
              >
                {title}
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
