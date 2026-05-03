import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "operators",
  day: 2,
  title: "Operators",
  module: "Java Basics",
  blurb: "Symbols that perform operations on values: arithmetic, comparison, logical, assignment.",
  emoji: "➕",
  videoUrl: "https://www.youtube.com/embed/8bjPtrWqFnk",
  conceptMd: `
## Operator categories
1. **Arithmetic** — \`+ - * / %\` (modulo)
2. **Assignment** — \`= += -= *= /= %=\`
3. **Comparison** — \`== != < > <= >=\`
4. **Logical** — \`&& || !\` (short-circuit)
5. **Unary** — \`++ -- + - !\`
6. **Bitwise** — \`& | ^ ~ << >>\` (advanced)

\`\`\`java
int x = 10, y = 3;
System.out.println(x % y);     // 1   — remainder
System.out.println(x++);       // 10  — post-increment: prints, THEN increments
System.out.println(++y);       // 4   — pre-increment: increments, THEN prints
System.out.println(x > 5 && y < 10); // true
\`\`\`

### Short-circuit
\`&&\` stops evaluating as soon as one side is \`false\`. \`||\` stops when one side is \`true\`. This is how you guard against null:

\`\`\`java
if (name != null && name.length() > 0) { ... }
\`\`\`

### Operator precedence (top = highest)
\`()\` → \`++ --\` → \`* / %\` → \`+ -\` → \`< > <= >=\` → \`== !=\` → \`&&\` → \`||\` → \`=\`

When in doubt, use parentheses.
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt: "What does this print?",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 7;
        int b = 4;
        System.out.println(a % b);
    }
}`,
      expectedOutput: "3",
      hint: "% is the *remainder* operator.",
      solution: "7 divided by 4 is 1 remainder 3 → 7 % 4 = 3.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Even or odd",
      prompt:
        "Read an int n = 17 (already declared). Print exactly 'even' if n is divisible by 2, otherwise print exactly 'odd'.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 17;
        // your code here
    }
}`,
      expectedOutput: "odd",
      hint: "Use n % 2 — if it equals 0, it's even.",
      solution: `public class Main {
    public static void main(String[] args) {
        int n = 17;
        if (n % 2 == 0) {
            System.out.println("even");
        } else {
            System.out.println("odd");
        }
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This is supposed to print 'big' when x is greater than 10. But it always prints 'big' no matter what x is. Fix it.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int x = 3;
        if (x = 10) {
            System.out.println("big");
        } else {
            System.out.println("small");
        }
    }
}`,
      expectedOutput: "small",
      hint: "= is assignment. == is comparison. Also, the condition uses the wrong operator entirely — we want > 10.",
      solution: `public class Main {
    public static void main(String[] args) {
        int x = 3;
        if (x > 10) {  // > for greater-than, not = (assignment)
            System.out.println("big");
        } else {
            System.out.println("small");
        }
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "What is `15 % 4`?",
      choices: ["3", "3.75", "4", "0"],
      answerIndex: 0,
      explanation: "% returns the remainder. 15 = 4*3 + 3, so the remainder is 3.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What's the difference between `i++` and `++i`?",
      choices: [
        "No difference — both add 1",
        "`i++` returns the old value then increments; `++i` increments then returns the new value",
        "`i++` is faster than `++i`",
        "`++i` only works on doubles",
      ],
      answerIndex: 1,
      explanation:
        "Post-increment (`i++`) evaluates to the *current* value and increments after. Pre-increment (`++i`) increments first and evaluates to the new value. Both modify `i` by +1.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question:
        "Why does `if (user != null && user.getName().length() > 0)` not throw a NullPointerException when user is null?",
      choices: [
        "Java auto-handles null in conditions",
        "`&&` short-circuits — if the left is false, the right is never evaluated",
        "`getName()` returns an empty string for null users",
        "It does throw — the code is buggy",
      ],
      answerIndex: 1,
      explanation:
        "`&&` is short-circuit: if `user != null` is false, the right side `user.getName()...` is never even evaluated, so no NPE.",
    },
  ],
};
