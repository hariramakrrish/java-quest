"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Exercise } from "@/lib/types";
import { CodeEditor } from "./CodeEditor";

interface Props {
  topicSlug: string;
  exercise: Exercise;
  done: boolean;
  onSolved: () => void;
}

const DIFF_STYLES: Record<string, string> = {
  easy: "border-neon-lime/40 text-neon-lime",
  medium: "border-neon-cyan/40 text-neon-cyan",
  hard: "border-neon-pink/40 text-neon-pink",
};

const TYPE_LABEL: Record<string, string> = {
  predict: "Predict the output",
  write: "Write the code",
  debug: "Find & fix the bug",
};

export function ExerciseCard({ exercise, done, onSolved }: Props) {
  const [code, setCode] = useState(exercise.starterCode);
  const [predicted, setPredicted] = useState("");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [stderr, setStderr] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<null | "pass" | "fail">(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [runnerDown, setRunnerDown] = useState(false);

  const isPredict = exercise.type === "predict";

  function normalize(s: string): string {
    return s.replace(/\r\n/g, "\n").trim();
  }

  function checkPredict() {
    if (!exercise.expectedOutput) return;
    const ok = normalize(predicted) === normalize(exercise.expectedOutput);
    setVerdict(ok ? "pass" : "fail");
    if (ok) onSolved();
  }

  async function runCode() {
    setRunning(true);
    setOutput(null);
    setStderr(null);
    setVerdict(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setRunnerDown(true);
        setStderr(
          (data.error as string) ||
            "Code runner unavailable. Use the manual output check below.",
        );
        return;
      }
      const compileError = (data.compileError as string) || "";
      const runErr = (data.stderr as string) || "";
      const runOut = (data.stdout as string) || "";
      setOutput(runOut);
      setStderr([compileError, runErr].filter(Boolean).join("\n"));
      if (exercise.expectedOutput && !compileError) {
        const ok = normalize(runOut) === normalize(exercise.expectedOutput);
        setVerdict(ok ? "pass" : "fail");
        if (ok) onSolved();
      }
    } catch (e) {
      setRunnerDown(true);
      setStderr(e instanceof Error ? e.message : "request failed");
    } finally {
      setRunning(false);
    }
  }

  function checkManual() {
    if (!exercise.expectedOutput) return;
    const ok = normalize(predicted) === normalize(exercise.expectedOutput);
    setVerdict(ok ? "pass" : "fail");
    if (ok) onSolved();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`chip ${DIFF_STYLES[exercise.difficulty]}`}>
            {exercise.difficulty.toUpperCase()}
          </span>
          <span className="chip">{TYPE_LABEL[exercise.type]}</span>
          {done && (
            <span className="chip border-neon-lime/40 text-neon-lime">★ Solved</span>
          )}
        </div>
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold">{exercise.title}</h3>
      <p className="mt-1 text-sm text-muted">{exercise.prompt}</p>

      <div className="mt-4">
        {isPredict ? (
          <>
            <div className="mb-3">
              <CodeEditor value={code} onChange={() => {}} readOnly height={220} />
            </div>
            <label className="text-xs uppercase tracking-wider text-muted">
              Your predicted output
            </label>
            <textarea
              value={predicted}
              onChange={(e) => setPredicted(e.target.value)}
              rows={Math.max(2, (exercise.expectedOutput || "").split("\n").length)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a0a18] p-3 font-mono text-sm text-ink outline-none focus:border-neon-cyan/60"
              placeholder="Type the exact output you expect…"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={checkPredict} className="btn-primary">
                Check answer
              </button>
              <button
                onClick={() => setShowHint((s) => !s)}
                className="btn-ghost"
              >
                {showHint ? "Hide hint" : "💡 Hint"}
              </button>
              <button
                onClick={runCode}
                disabled={running}
                className="btn-ghost"
                title="Run the code on a real JDK to check yourself"
              >
                {running ? "Running…" : "▶ Run on JDK"}
              </button>
            </div>
          </>
        ) : (
          <>
            <CodeEditor value={code} onChange={setCode} height={300} />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={runCode}
                disabled={running}
                className="btn-primary"
              >
                {running ? "Running…" : "▶ Run code"}
              </button>
              <button
                onClick={() => setCode(exercise.starterCode)}
                className="btn-ghost"
              >
                Reset
              </button>
              <button
                onClick={() => setShowHint((s) => !s)}
                className="btn-ghost"
              >
                {showHint ? "Hide hint" : "💡 Hint"}
              </button>
            </div>
            {runnerDown && (
              <div className="mt-4 rounded-xl border border-neon-amber/30 bg-neon-amber/5 p-3 text-xs text-neon-amber">
                <strong>Heads up:</strong> the in-browser Java runner is offline.
                Run the code in any Java IDE / online compiler, then paste your
                output below to check.
              </div>
            )}
            {runnerDown && (
              <div className="mt-3">
                <label className="text-xs uppercase tracking-wider text-muted">
                  Paste the output you got
                </label>
                <textarea
                  value={predicted}
                  onChange={(e) => setPredicted(e.target.value)}
                  rows={Math.max(2, (exercise.expectedOutput || "").split("\n").length)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a0a18] p-3 font-mono text-sm text-ink outline-none focus:border-neon-cyan/60"
                  placeholder="Paste the program's output…"
                />
                <button onClick={checkManual} className="btn-ghost mt-2">
                  ✓ Check output
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {showHint && exercise.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-xl border border-neon-amber/30 bg-neon-amber/5 p-3 text-sm text-neon-amber"
          >
            💡 {exercise.hint}
          </motion.div>
        )}
      </AnimatePresence>

      {(output !== null || stderr) && (
        <div className="mt-4 space-y-2">
          <div className="text-xs uppercase tracking-wider text-muted">Output</div>
          <pre className="code-output rounded-xl border border-white/10 bg-[#08081a] p-3 text-sm">
            {output || (stderr ? "" : "(no output)")}
          </pre>
          {stderr && (
            <pre className="code-output rounded-xl border border-neon-pink/40 bg-neon-pink/5 p-3 text-sm text-neon-pink">
              {stderr}
            </pre>
          )}
        </div>
      )}

      {verdict && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-3 rounded-xl border p-3 text-sm font-semibold ${
            verdict === "pass"
              ? "border-neon-lime/40 bg-neon-lime/5 text-neon-lime"
              : "border-neon-pink/40 bg-neon-pink/5 text-neon-pink"
          }`}
        >
          {verdict === "pass"
            ? "✅ Correct! +10 XP"
            : `❌ Not quite. Expected: ${JSON.stringify(exercise.expectedOutput)}`}
        </motion.div>
      )}

      <div className="mt-3">
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
        {showSolution && (
          <div className="mt-2 rounded-xl border border-white/10 bg-[#0a0a18] p-3 text-xs">
            <div className="mb-1 text-muted">Reference solution / explanation</div>
            <pre className="code-output text-ink">{exercise.solution}</pre>
          </div>
        )}
      </div>
    </motion.div>
  );
}
