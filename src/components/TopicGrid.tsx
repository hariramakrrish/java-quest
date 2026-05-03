"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TOPICS } from "@/content/topics";
import { useEffect, useState } from "react";
import { loadProgress, topicProgress } from "@/lib/progress";

export function TopicGrid() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(t);
  }, []);

  const progress = loadProgress();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" key={tick}>
      {TOPICS.map((t, idx) => {
        const tp = topicProgress(
          progress,
          t.slug,
          t.exercises.map((e) => e.id),
          t.review.map((r) => r.id),
        );
        const done = tp.percent === 100;
        return (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
          >
            <Link
              href={`/topics/${t.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-5 transition-all hover:border-white/30 hover:shadow-neon"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{t.emoji}</div>
                <span className="chip">Day {t.day}</span>
              </div>
              <div className="mt-3 font-display text-lg font-semibold leading-tight">
                {t.title}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted">{t.module}</div>
              <p className="mt-3 line-clamp-2 text-sm text-muted">{t.blurb}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">
                    {tp.done}/{tp.total} done
                  </span>
                  {done ? (
                    <span className="text-neon-lime">★ Completed</span>
                  ) : (
                    <span className="text-neon-cyan">{tp.percent}%</span>
                  )}
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-neon-gradient transition-all"
                    style={{ width: `${tp.percent}%` }}
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
