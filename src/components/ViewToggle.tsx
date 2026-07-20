export type ViewMode = "pagination" | "loadMore";

interface Props {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ mode, onChange }: Props) {
  const baseBtn =
    "rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-white/80 p-1 shadow-card ring-1 ring-slate-900/5">
      <button
        className={`${baseBtn} ${
          mode === "pagination"
            ? "bg-slate-900 text-white"
            : "text-slate-500 hover:text-slate-800"
        }`}
        onClick={() => onChange("pagination")}
        aria-pressed={mode === "pagination"}
      >
        Page Controls
      </button>
      <button
        className={`${baseBtn} ${
          mode === "loadMore"
            ? "bg-slate-900 text-white"
            : "text-slate-500 hover:text-slate-800"
        }`}
        onClick={() => onChange("loadMore")}
        aria-pressed={mode === "loadMore"}
      >
        Infinite Scroll
      </button>
    </div>
  );
}
