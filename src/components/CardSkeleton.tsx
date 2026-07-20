export default function CardSkeleton() {
  return (
    <div
      className="flex animate-pulse flex-col rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-900/5"
      aria-hidden="true"
    >
      <div className="aspect-square rounded-lg bg-slate-200" />
      <div className="mt-3 h-3 w-3/4 rounded bg-slate-200" />
      <div className="mt-2 h-2 w-1/3 rounded bg-slate-200" />
    </div>
  );
}
