import Link from "next/link";
import { TOPICS } from "@/content/topics";
import { TopicGrid } from "@/components/TopicGrid";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/40 p-8 md:p-12">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-neon-cyan">
            ☕ daily java · one quest a day
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Learn Java like a <span className="heading-gradient">game.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
            Each day a new topic. Read the concept, beat 3 exercises (easy → medium → hard),
            then survive 3 review questions. Build a streak. Level up. Become unstoppable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/topics/${TOPICS[0].slug}`} className="btn-primary">
              ▶ Start Day 1
            </Link>
            <a href="#topics" className="btn-ghost">
              See all topics
            </a>
          </div>
        </div>
      </section>

      <section id="topics" className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            <span className="heading-gradient">Today&apos;s Quests</span>
          </h2>
          <span className="text-xs text-muted">{TOPICS.length} topics · 30 exercises · 30 reviews</span>
        </div>
        <TopicGrid />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <FeatureCard
          emoji="🧠"
          title="Concept first"
          desc="Crisp explanations with examples. Optional video for each topic."
        />
        <FeatureCard
          emoji="⌨️"
          title="Run real Java"
          desc="In-browser Monaco editor. Code runs on a real JDK via Piston."
        />
        <FeatureCard
          emoji="🔥"
          title="Streaks & XP"
          desc="Daily streak counter and XP rewards. Stays in your browser, no login."
        />
      </section>
    </div>
  );
}

function FeatureCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="panel panel-hover p-5">
      <div className="text-3xl">{emoji}</div>
      <div className="mt-2 font-display text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted">{desc}</p>
    </div>
  );
}
