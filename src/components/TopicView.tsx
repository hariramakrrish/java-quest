"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Topic } from "@/lib/types";
import { Markdown } from "./Markdown";
import { ExerciseCard } from "./ExerciseCard";
import { ReviewCard } from "./ReviewCard";
import {
  ProgressState,
  loadProgress,
  markExerciseDone,
  markReviewDone,
  markTopicComplete,
  saveProgress,
  topicProgress,
} from "@/lib/progress";
import { TOPICS } from "@/content/topics";

type Section = "concept" | "exercises" | "review";

export function TopicView({ topic }: { topic: Topic }) {
  const [section, setSection] = useState<Section>("concept");
  const [progress, setProgress] = useState<ProgressState>(loadProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, [topic.slug]);

  function update(p: ProgressState) {
    setProgress(p);
    saveProgress(p);
  }

  const tp = useMemo(
    () =>
      topicProgress(
        progress,
        topic.slug,
        topic.exercises.map((e) => e.id),
        topic.review.map((r) => r.id),
      ),
    [progress, topic],
  );

  // auto-mark topic complete once all 6 items done
  useEffect(() => {
    if (tp.percent === 100 && !progress.topicsCompleted.includes(topic.slug)) {
      update(markTopicComplete(progress, topic.slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tp.percent]);

  const dayIndex = TOPICS.findIndex((t) => t.slug === topic.slug);
  const prev = dayIndex > 0 ? TOPICS[dayIndex - 1] : null;
  const next = dayIndex < TOPICS.length - 1 ? TOPICS[dayIndex + 1] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs">
        <Link href="/" className="text-muted hover:text-ink">
          ← All topics
        </Link>
        <div className="flex items-center gap-2">
          {prev && (
            <Link
              href={`/topics/${prev.slug}`}
              className="chip hover:border-white/30"
            >
              ← {prev.emoji} Day {prev.day}
            </Link>
          )}
          {next && (
            <Link
              href={`/topics/${next.slug}`}
              className="chip hover:border-white/30"
            >
              {next.emoji} Day {next.day} →
            </Link>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/50 p-6 md:p-8"
      >
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative flex flex-wrap items-start gap-4">
          <div className="text-5xl">{topic.emoji}</div>
          <div className="flex-1 min-w-[240px]">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="chip border-neon-violet/40 text-neon-violet">
                Day {topic.day}
              </span>
              <span className="chip">{topic.module}</span>
              <span className="chip border-neon-cyan/40 text-neon-cyan">
                {tp.done}/{tp.total} done · {tp.percent}%
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">
              <span className="heading-gradient">{topic.title}</span>
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-muted md:text-base">{topic.blurb}</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-neon-gradient transition-all"
                style={{ width: `${tp.percent}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <SectionTabs section={section} setSection={setSection} />

      {section === "concept" && <ConceptSection topic={topic} />}

      {section === "exercises" && (
        <div className="grid gap-4">
          {topic.exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              topicSlug={topic.slug}
              exercise={ex}
              done={!!progress.completedExercises[`${topic.slug}:${ex.id}`]}
              onSolved={() => update(markExerciseDone(progress, topic.slug, ex.id, 10))}
            />
          ))}
        </div>
      )}

      {section === "review" && (
        <div className="grid gap-4">
          {topic.review.map((q) => (
            <ReviewCard
              key={q.id}
              question={q}
              done={!!progress.completedReviews[`${topic.slug}:${q.id}`]}
              onCorrect={() => update(markReviewDone(progress, topic.slug, q.id, 5))}
            />
          ))}
        </div>
      )}

      {next && tp.percent === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel p-5 text-center"
        >
          <div className="text-2xl">🏆</div>
          <div className="mt-1 font-display text-lg">Topic complete! +50 XP</div>
          <Link href={`/topics/${next.slug}`} className="btn-success mt-3 inline-flex">
            Continue → Day {next.day} · {next.title}
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function SectionTabs({
  section,
  setSection,
}: {
  section: Section;
  setSection: (s: Section) => void;
}) {
  const tabs: { key: Section; label: string; emoji: string }[] = [
    { key: "concept", label: "Concept", emoji: "📖" },
    { key: "exercises", label: "Exercises", emoji: "⌨️" },
    { key: "review", label: "Review", emoji: "🧪" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-panel/40 p-1.5">
      {tabs.map((t) => {
        const active = section === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setSection(t.key)}
            className={`relative rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              active
                ? "bg-neon-gradient text-black shadow-neon"
                : "text-muted hover:bg-white/5 hover:text-ink"
            }`}
          >
            <span className="mr-1.5">{t.emoji}</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function ConceptSection({ topic }: { topic: Topic }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-5 md:p-7"
    >
      {topic.videoUrl && (
        <div className="mb-5 aspect-video w-full overflow-hidden rounded-xl border border-white/10">
          <iframe
            src={topic.videoUrl}
            title={`${topic.title} video`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <Markdown source={topic.conceptMd} />
    </motion.div>
  );
}
