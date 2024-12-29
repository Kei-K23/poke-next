"use client";
import { ChartNoAxesColumn, Gamepad, Heart, Search, Vote } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAVIGATION = [
  {
    name: "Roundest",
    link: "/roundest",
    icon: Vote,
  },
  {
    name: "Leaderboard",
    link: "/leaderboard",
    icon: ChartNoAxesColumn,
  },
  {
    name: "Favorite",
    link: "/favorite",
    icon: Heart,
  },
  {
    name: "Search",
    link: "/search",
    icon: Search,
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
            {NAVIGATION.map(({ name, link, icon: Icon }) => (
              <Link
                key={name}
                href={link}
                className={cn(
                  "px-4 py-2 flex items-center gap-x-2",
                  pathname === link
                    ? "neo-brutalism-blue-active"
                    : "neo-brutalism-white"
                )}
              >
                <Icon className="size-6" />
                <span className="text-base font-bold">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
