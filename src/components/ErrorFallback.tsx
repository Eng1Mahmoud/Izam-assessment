interface Props {
  error: unknown;
  resetErrorBoundary: () => void;
}

function getMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white/70 px-6 py-16 text-center shadow-card ring-1 ring-slate-900/5">
      <p className="text-3xl">⚠️</p>
      <p className="max-w-sm text-sm font-medium text-slate-600">
        {getMessage(error)}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="mt-1 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Try again
      </button>
    </div>
  );
}
