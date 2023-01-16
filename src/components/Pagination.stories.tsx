import type { Meta } from "@storybook/react";
import { useState } from "react";
import Pagination from "./Pagination";

export default {
  component: Pagination,
} as Meta<typeof Pagination>;

export const Playground = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-wrap gap-1">
      <Pagination page={page} totalPages={10} onGoToPage={setPage} />
    </div>
  );
};
