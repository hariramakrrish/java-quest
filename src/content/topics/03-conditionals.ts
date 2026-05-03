import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "conditionals",
  day: 3,
  title: "Conditionals (if / else / switch)",
  module: "Java Basics",
  blurb: "Make your program take different paths based on conditions.",
  emoji: "🔀",
  videoUrl: "https://www.youtube.com/embed/ldYLYRNaucM",
  conceptMd: `
## if / else if / else
\`\`\`java
int score = 75;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 75) {
    System.out.println("B");
} else if (score >= 50) {
    System.out.println("C");
} else {
    System.out.println("F");
}
\`\`\`
The first matching branch wins — the rest are skipped.

## switch
\`\`\`java
int day = 3;
switch (day) {
    case 1: System.out.println("Mon"); break;
    case 2: System.out.println("Tue"); break;
    case 3: System.out.println("Wed"); break;
    default: System.out.println("?");
}
\`\`\`
**Don't forget \`break\`** — without it, execution *falls through* to the next case.

### Switch expression (Java 14+)
\`\`\`java
String name = switch (day) {
    case 1 -> "Mon";
    case 2 -> "Tue";
    case 3 -> "Wed";
    default -> "?";
};
\`\`\`

### Ternary
\`\`\`java
int max = (a > b) ? a : b;
\`\`\`
A compact \`if/else\` that returns a value.
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
        int x = 10;
        if (x > 5) {
            System.out.println("A");
        } else if (x > 8) {
            System.out.println("B");
        } else {
            System.out.println("C");
        }
    }
}`,
      expectedOutput: "A",
      hint: "Only the FIRST matching branch executes.",
      solution:
        "x > 5 is true → 'A' is printed and the rest of the chain is skipped (even though x > 8 would also have been true).",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "FizzBuzz one-liner",
      prompt:
        "Given int n = 15, print 'FizzBuzz' if n is divisible by both 3 and 5, 'Fizz' if only by 3, 'Buzz' if only by 5, otherwise print n itself.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 15;
        // your code here
    }
}`,
      expectedOutput: "FizzBuzz",
      hint: "Check 'divisible by both' FIRST, otherwise the single checks will steal the match.",
      solution: `public class Main {
    public static void main(String[] args) {
        int n = 15;
        if (n % 3 == 0 && n % 5 == 0) {
            System.out.println("FizzBuzz");
        } else if (n % 3 == 0) {
            System.out.println("Fizz");
        } else if (n % 5 == 0) {
            System.out.println("Buzz");
        } else {
            System.out.println(n);
        }
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt: "This switch should print only 'Wed', but it prints more. Fix it.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1: System.out.println("Mon");
            case 2: System.out.println("Tue");
            case 3: System.out.println("Wed");
            case 4: System.out.println("Thu");
            default: System.out.println("?");
        }
    }
}`,
      expectedOutput: "Wed",
      hint: "Without `break;` after each case, execution falls through to the next.",
      solution: `public class Main {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1: System.out.println("Mon"); break;
            case 2: System.out.println("Tue"); break;
            case 3: System.out.println("Wed"); break;
            case 4: System.out.println("Thu"); break;
            default: System.out.println("?");
        }
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "In an if/else if/else chain, how many branches execute?",
      choices: ["All matching branches", "The first matching branch only", "The last matching branch", "Random"],
      answerIndex: 1,
      explanation:
        "Once a branch matches, the rest of the chain is skipped — that's why ordering matters.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What is the ternary `a > b ? a : b` equivalent to?",
      choices: ["max(a, b)", "min(a, b)", "a + b", "a == b"],
      answerIndex: 0,
      explanation:
        "It returns `a` if `a > b`, otherwise `b` — i.e. the larger of the two.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "What happens in a switch when you forget `break;`?",
      choices: [
        "Compile error",
        "Only the matched case runs",
        "Execution falls through to the next case (and continues)",
        "Java automatically adds break",
      ],
      answerIndex: 2,
      explanation:
        "Classic switch falls through — every statement after the matched case runs until a `break` or end of switch. The newer `case X ->` arrow form does NOT fall through.",
    },
  ],
};
