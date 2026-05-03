"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReviewQuestion } from "@/lib/types";

interface Props {
  question: ReviewQuestion;
  done: boolean;
  onCorrect: () => void;
}

const DIFF_STYLES: Record<string, string> = {
  easy: "border-neon-lime/40 text-neon-lime",
  medium: "border-neon-cyan/40 text-neon-cyan",
  hard: "border-neon-pink/40 text-neon-pink",
};

export function ReviewCard({ question, done, onCorrect }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (picked == null) return;
    setSubmitted(true);
    if (picked === question.answerIndex) onCorrect();
  }

  function reset() {
    setPicked(null);
    setSubmitted(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-5"
    >
      <div className="flex items-center gap-2">
        <span className={`chip ${DIFF_STYLES[question.difficulty]}`}>
          {question.difficulty.toUpperCase()}
        </span>
        {done && (
          <span className="chip border-neon-lime/40 text-neon-lime">★ Answered</span>
        )}
      </div>
      <p className="mt-3 font-display text-base font-semibold leading-snug">
        {question.question}
      </p>
      <div className="mt-4 grid gap-2">
        {question.choices.map((c, i) => {
          const isPicked = picked === i;
          const isAnswer = submitted && i === question.answerIndex;
          const isWrong = submitted && isPicked && i !== question.answerIndex;
          return (
            <button
              key={i}
              onClick={() => !submitted && setPicked(i)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-all
                ${
                  isAnswer
                    ? "border-neon-lime/60 bg-neon-lime/10 text-neon-lime"
                    : isWrong
                      ? "border-neon-pink/60 bg-neon-pink/10 text-neon-pink"
                      : isPicked
                        ? "border-neon-cyan/60 bg-neon-cyan/5"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                }`}
              disabled={submitted}
            >
              <span className="mr-2 font-semibold">{String.fromCharCode(65 + i)}.</span>
              {c}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {!submitted ? (
          <button
            disabled={picked == null}
            onClick={submit}
            className="btn-primary disabled:opacity-50"
          >
            Submit
          </button>
        ) : (
          <button onClick={reset} className="btn-ghost">
            Try again
          </button>
        )}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
          >
            <div className="mb-1 text-xs uppercase tracking-wider text-muted">
              Explanation
            </div>
            {question.explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
