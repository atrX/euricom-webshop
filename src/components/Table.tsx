import classNames from "classnames";
import type { PropsWithChildren, ReactElement } from "react";

export type TableProps<T> = {
  columns: Array<{
    title: string;
    key: keyof T;
  }>;
  items: Array<T>;
  primaryKey: keyof T;
  zebra?: boolean;
};

const Table = <T extends object>({
  columns,
  items,
  primaryKey,
  zebra,
}: PropsWithChildren<TableProps<T>>): ReactElement | null => {
  return (
    <div className="overflow-x-auto">
      <table className={classNames("table", "w-full", zebra && "table-zebra")}>
        <thead>
          <tr>
            {columns.map(({ title }) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item[primaryKey] as string}>
              {columns.map(({ key, title }) => (
                <td key={title}>{item[key] as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
