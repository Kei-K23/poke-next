"use client";
import { Gamepad, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAVIGATION = [
  {
    name: "Favorite",
    link: "/favorite",
  },
  {
    name: "Search",
    link: "/search",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b-4 border-black bg-white">
      <nav className="container-s">
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="neo-brutalism-pink px-4 py-2 flex items-center gap-x-2"
          >
            <motion.div
              whileHover={{
                rotate: 360,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <Gamepad className="size-8" />
            </motion.div>
            <span className="text-xl font-bold">PokéNext</span>
          </Link>
          <div className="flex items-center gap-x-4">
            {NAVIGATION.map((nav) => (
              <Link
                key={nav.name}
                href={nav.link}
                className={cn(
                  "px-4 py-2 flex items-center gap-x-2",
                  pathname === nav.link
                    ? "neo-brutalism-blue-active"
                    : "neo-brutalism-white"
                )}
              >
                <Search className="size-6" />
                <span className="text-base font-bold">{nav.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
