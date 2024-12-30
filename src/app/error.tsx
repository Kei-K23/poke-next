"use client";

import { useEffect } from "react";
import { pressStart2P } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-32">
      <h1
        className={cn(
          pressStart2P.className,
          "text-4xl mb-6 text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent"
        )}
      >
        Oh no! An error occurred!
      </h1>
      <p className="text-xl mb-8 text-center">
        Something went wrong. Please try again or Back to Home page.
      </p>
      <div className="flex items-center gap-x-4">
        <button
          onClick={() => window.location.reload()}
          className="neo-brutalism-blue px-6 py-2 text-xl font-semibold"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="neo-brutalism-blue px-6 py-2 text-xl font-semibold"
        >
          Back Home
        </button>
      </div>
    </div>
  );
}
