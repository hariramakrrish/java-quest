"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";

export function Nav() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const update = () => {
      const p = loadProgress();
      setXp(p.xp);
      setStreak(p.streakDays);
    };
    update();
    window.addEventListener("storage", update);
    const t = setInterval(update, 1500);
    return () => {
      window.removeEventListener("storage", update);
      clearInterval(t);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07070f]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl animate-glow">☕</span>
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="heading-gradient">Java Quest</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs">
          <span
            className="chip border-neon-amber/40 text-neon-amber"
            title="Daily streak — keep it alive!"
          >
            🔥 {streak}d
          </span>
          <span
            className="chip border-neon-cyan/40 text-neon-cyan"
            title="Experience points"
          >
            ⚡ {xp} XP
          </span>
          <Link href="/" className="btn-ghost hidden md:inline-flex">
            All Topics
          </Link>
        </div>
      </div>
    </header>
  );
}
