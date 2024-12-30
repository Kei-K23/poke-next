"use client";
import { cn } from "@/lib/utils";
import { pressStart2P } from "./fonts";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-32">
      <h1
        className={cn(
          pressStart2P.className,
          "text-4xl mb-6 text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent"
        )}
      >
        Not found (404)
      </h1>
      <p className="text-xl mb-8 text-center">
        THE PAGE YOU WERE LOOKING FOR DOEST NOT EXIST.
      </p>

      <Link href={"/"}>
        <button className="neo-brutalism-blue px-6 py-2 text-xl font-semibold">
          Back Home
        </button>
      </Link>
    </div>
  );
}
