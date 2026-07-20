import { Link, useParams } from "react-router";
import QueryBoundary from "../../components/QueryBoundary";
import DetailContent from "./DetailContent";

function DetailSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5"
      aria-hidden="true"
    >
      <div className="h-20 bg-slate-200" />
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <div className="h-40 w-40 rounded-full bg-slate-200" />
          <div className="h-4 w-16 rounded-full bg-slate-200" />
          <div className="mt-3 h-16 w-full rounded-lg bg-slate-200" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-1/3 rounded bg-slate-200" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-detail py-8">
      <Link
        to="/"
        className="absolute left-8 top-5 inline-flex items-center gap-2 rounded-[8px] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-card ring-1 ring-slate-900/5 transition-colors hover:text-slate-900 md:left-28 md:top-6"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span>Back to List</span>
      </Link>
      <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-3xl">
          {id && (
            <QueryBoundary key={id} fallback={<DetailSkeleton />}>
              <DetailContent id={id} />
            </QueryBoundary>
          )}
        </div>
      </div>
    </div>
  );
}
