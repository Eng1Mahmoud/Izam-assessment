interface Props {
  error: unknown;
  resetErrorBoundary: () => void;
}

function getMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

export default function AppErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-4xl">💥</p>
      <h1 className="text-lg font-semibold text-slate-800">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-slate-500">{getMessage(error)}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-1 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Reload
      </button>
    </div>
  );
}
