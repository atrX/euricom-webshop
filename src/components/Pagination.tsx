import Button from "./Button";

const PAGES_BEFORE = 2;

export type PaginationProps = {
  onGoToPage: (page: number) => void;
  page: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onGoToPage,
  page,
  totalPages,
}) => {
  const pagesBeforeCurrent = Array(
    Math.max(Math.min(page - 1, PAGES_BEFORE), 0)
  )
    .fill(null)
    .map((_, index) => page - index - 1)
    .reverse();
  const pagesAfterCurrent = Array(Math.max(Math.min(totalPages - page, 2), 0))
    .fill(null)
    .map((_, index) => page + index + 1);

  return (
    <div className="btn-group">
      <Button
        variant="neutral"
        disabled={page <= 1}
        onClick={() => onGoToPage?.(page - 1)}
      >
        «
      </Button>
      {pagesBeforeCurrent.map((page) => (
        <Button key={page} variant="neutral" onClick={() => onGoToPage?.(page)}>
          {page}
        </Button>
      ))}
      <Button variant="primary">{page}</Button>
      {pagesAfterCurrent.map((page) => (
        <Button key={page} variant="neutral" onClick={() => onGoToPage?.(page)}>
          {page}
        </Button>
      ))}
      <Button
        variant="neutral"
        disabled={page >= totalPages}
        onClick={() => onGoToPage?.(page + 1)}
      >
        »
      </Button>
    </div>
  );
};

export default Pagination;
