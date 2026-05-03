export type Difficulty = "easy" | "medium" | "hard";

export type ExerciseType = "predict" | "write" | "debug";

export interface Exercise {
  id: string;
  type: ExerciseType;
  difficulty: Difficulty;
  title: string;
  prompt: string;
  starterCode: string;
  expectedOutput?: string;
  hint?: string;
  solution: string;
}

export interface ReviewQuestion {
  id: string;
  difficulty: Difficulty;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
}

export interface Topic {
  slug: string;
  day: number;
  title: string;
  module: string;
  blurb: string;
  emoji: string;
  conceptMd: string;
  videoUrl?: string;
  exercises: [Exercise, Exercise, Exercise];
  review: [ReviewQuestion, ReviewQuestion, ReviewQuestion];
}
