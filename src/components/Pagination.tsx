interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Builds a compact page list with ellipses, e.g. 1 2 3 4 5 ... 66 */
function buildPageList(page: number, totalPages: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const windowStart = Math.max(1, page - 2);
  const windowEnd = Math.min(totalPages, page + 2);

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
  const pages = buildPageList(page, totalPages);

  const btnBase =
    "min-w-[2rem] rounded-md px-2 py-1 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-1"
      aria-label="Pagination"
    >
      <button
        className={`${btnBase} text-slate-500 hover:bg-white`}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹ <span className="hidden sm:inline">Previous</span>
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`${btnBase} ${
              p === page
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-white"
            }`}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`${btnBase} text-slate-500 hover:bg-white`}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span> ›
      </button>
    </nav>
  );
}
