import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "loops",
  day: 4,
  title: "Loops (for / while / do-while)",
  module: "Java Basics",
  blurb: "Repeat a block of code until a condition stops being true.",
  emoji: "🔁",
  videoUrl: "https://www.youtube.com/embed/CD7HnoSJtfk",
  conceptMd: `
## for loop
Best when you know the iteration count up front.
\`\`\`java
for (int i = 0; i < 5; i++) {
    System.out.println(i);  // 0,1,2,3,4
}
\`\`\`
The header has 3 parts: **init ; condition ; update**.

## while loop
Best when you don't know how many times — only when to stop.
\`\`\`java
int n = 100;
while (n > 1) {
    n /= 2;
}
\`\`\`

## do-while
Always runs **at least once** because the condition is checked at the bottom.
\`\`\`java
int x;
do {
    x = readInput();
} while (x < 0);
\`\`\`

## Enhanced for ("for-each")
Cleanest way to iterate arrays and collections.
\`\`\`java
int[] nums = {10, 20, 30};
for (int n : nums) {
    System.out.println(n);
}
\`\`\`

## break and continue
- \`break;\` — exit the loop immediately.
- \`continue;\` — skip to the next iteration.
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt: "What does this loop print? (each number on its own line)",
      starterCode: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println(i * 2);
        }
    }
}`,
      expectedOutput: "2\n4\n6",
      hint: "i goes 1, 2, 3 — print 2*i for each.",
      solution:
        "Loop runs i=1,2,3. Prints 1*2=2, 2*2=4, 3*2=6 — each on a new line.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Sum 1 to N",
      prompt:
        "Given int n = 10, compute and print the sum of all integers from 1 to n inclusive (so 1+2+...+10).",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        // your code here
    }
}`,
      expectedOutput: "55",
      hint: "Initialize a sum variable to 0, then add each i from 1..n in a for loop.",
      solution: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt: "This is supposed to print 0 1 2 3 4 (one per line) but it never stops. Fix it.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int i = 0;
        while (i < 5) {
            System.out.println(i);
        }
    }
}`,
      expectedOutput: "0\n1\n2\n3\n4",
      hint: "i is never being changed inside the loop → infinite loop.",
      solution: `public class Main {
    public static void main(String[] args) {
        int i = 0;
        while (i < 5) {
            System.out.println(i);
            i++;  // increment so the condition eventually becomes false
        }
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "What's the difference between `while` and `do-while`?",
      choices: [
        "No difference",
        "do-while always runs the body at least once",
        "while always runs the body at least once",
        "do-while can only loop forever",
      ],
      answerIndex: 1,
      explanation:
        "`do-while` checks the condition AFTER the body, so the body executes at least one time even if the condition is false.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What does `continue;` do inside a for loop?",
      choices: [
        "Exits the loop entirely",
        "Restarts the loop from the beginning",
        "Skips the rest of the body and proceeds to the update step / next iteration",
        "Pauses execution",
      ],
      answerIndex: 2,
      explanation:
        "`continue` jumps to the loop's update step (in for) or condition check (in while/do-while), skipping any remaining code in the body for the current iteration.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "Why is enhanced for-each (`for (int n : nums)`) preferred over indexed for?",
      choices: [
        "It's faster",
        "It eliminates index off-by-one bugs and works on any Iterable",
        "It can modify the array contents more easily",
        "It supports break/continue and indexed for doesn't",
      ],
      answerIndex: 1,
      explanation:
        "for-each is read-only over the elements but removes the chance of off-by-one errors. Use indexed for when you actually need the index or want to mutate the array.",
    },
  ],
};
