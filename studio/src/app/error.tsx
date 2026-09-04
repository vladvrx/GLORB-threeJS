"use client";

import { useEffect } from "react";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid h-dvh place-items-center bg-[#061821] p-6 text-center text-teal-50">
      <div>
        <p className="text-lg font-semibold">The editor hit a runtime error.</p>
        <p className="mt-2 max-w-md text-sm text-teal-200/70">{error.message}</p>
        <button
          type="button"
          className="mt-4 rounded-md bg-teal-400/20 px-3 py-1.5 text-sm"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
