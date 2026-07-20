interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M12.5 4.75 7.25 10l5.25 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="m7.5 4.75 5.25 5.25-5.25 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Builds a compact page list with ellipses, e.g. 1 2 3 4 5 ... 66 */
function buildPageList(
  page: number,
  totalPages: number,
  radius = 2
): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const windowStart = Math.max(1, page - radius);
  const windowEnd = Math.min(totalPages, page + radius);

  if (windowStart > 1) {
    pages.push(1);
    if (windowStart > 2) pages.push("...");
  }
  for (let i = windowStart; i <= windowEnd; i++) pages.push(i);
  if (windowEnd < totalPages) {
    if (windowEnd < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const desktopPages = buildPageList(page, totalPages, 2);
  const mobilePages = buildPageList(page, totalPages, 1);

  const btnBase =
    "min-w-[1.5rem] shrink-0 rounded-md px-1 py-1 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[2rem] sm:px-2 sm:text-sm";

  const renderPageButton = (p: number) => (
    <button
      key={p}
      className={`cursor-pointer py-2 ${btnBase} ${
        p === page ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-white"
      }`}
      onClick={() => onChange(p)}
      aria-current={p === page ? "page" : undefined}
    >
      {p}
    </button>
  );

  const renderEllipsis = (key: string) => (
    <span key={key} className="px-1 text-sm text-slate-400">
      …
    </span>
  );

  const renderPrevButton = () => (
    <button
      className={`cursor-pointer ${btnBase} inline-flex items-center gap-1.5 text-slate-500 hover:bg-white`}
      onClick={() => onChange(page - 1)}
      disabled={page <= 1}
      aria-label="Previous page"
    >
      <ChevronLeftIcon />
      <span className="hidden sm:inline">Previous</span>
    </button>
  );

  const renderNextButton = () => (
    <button
      className={`cursor-pointer ${btnBase} inline-flex items-center gap-1.5 text-slate-500 hover:bg-white`}
      onClick={() => onChange(page + 1)}
      disabled={page >= totalPages}
      aria-label="Next page"
    >
      <span className="hidden sm:inline">Next</span>
      <ChevronRightIcon />
    </button>
  );

  return (
    <nav
      className="flex max-w-full items-center justify-center overflow-x-auto px-1"
      aria-label="Pagination"
    >
      <div className="flex flex-nowrap items-center gap-0.5 sm:hidden">
        {renderPrevButton()}
        {mobilePages.map((p, i) =>
          p === "..." ? renderEllipsis(`mobile-ellipsis-${i}`) : renderPageButton(p)
        )}
        {renderNextButton()}
      </div>

      <div className="hidden flex-nowrap items-center gap-1 sm:flex">
        {renderPrevButton()}
        {desktopPages.map((p, i) =>
          p === "..." ? renderEllipsis(`desktop-ellipsis-${i}`) : renderPageButton(p)
        )}
        {renderNextButton()}
      </div>
    </nav>
  );
}
