"use client";

const KEY = "javaQuest:v1";

export interface ProgressState {
  completedExercises: Record<string, boolean>; // `${slug}:${exerciseId}`
  completedReviews: Record<string, boolean>;   // `${slug}:${reviewId}`
  topicsCompleted: string[];                   // slugs
  xp: number;
  streakDays: number;
  lastActiveDate?: string; // YYYY-MM-DD
}

const empty: ProgressState = {
  completedExercises: {},
  completedReviews: {},
  topicsCompleted: [],
  xp: 0,
  streakDays: 0,
};

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function saveProgress(p: ProgressState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function touchStreak(p: ProgressState): ProgressState {
  const today = todayStr();
  if (p.lastActiveDate === today) return p;
  if (!p.lastActiveDate) {
    return { ...p, lastActiveDate: today, streakDays: 1 };
  }
  const diff = daysBetween(p.lastActiveDate, today);
  const streakDays = diff === 1 ? p.streakDays + 1 : 1;
  return { ...p, lastActiveDate: today, streakDays };
}

export function markExerciseDone(
  p: ProgressState,
  slug: string,
  exerciseId: string,
  xpReward: number,
): ProgressState {
  const key = `${slug}:${exerciseId}`;
  if (p.completedExercises[key]) return p;
  return touchStreak({
    ...p,
    completedExercises: { ...p.completedExercises, [key]: true },
    xp: p.xp + xpReward,
  });
}

export function markReviewDone(
  p: ProgressState,
  slug: string,
  reviewId: string,
  xpReward: number,
): ProgressState {
  const key = `${slug}:${reviewId}`;
  if (p.completedReviews[key]) return p;
  return touchStreak({
    ...p,
    completedReviews: { ...p.completedReviews, [key]: true },
    xp: p.xp + xpReward,
  });
}

export function markTopicComplete(p: ProgressState, slug: string): ProgressState {
  if (p.topicsCompleted.includes(slug)) return p;
  return touchStreak({
    ...p,
    topicsCompleted: [...p.topicsCompleted, slug],
    xp: p.xp + 50,
  });
}

export function topicProgress(
  p: ProgressState,
  slug: string,
  exerciseIds: string[],
  reviewIds: string[],
): { done: number; total: number; percent: number } {
  const total = exerciseIds.length + reviewIds.length;
  const done =
    exerciseIds.filter((id) => p.completedExercises[`${slug}:${id}`]).length +
    reviewIds.filter((id) => p.completedReviews[`${slug}:${id}`]).length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
