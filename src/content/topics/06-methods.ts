import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "methods",
  day: 6,
  title: "Methods",
  module: "Java Basics",
  blurb: "Reusable, named blocks of code that take inputs and (often) return a result.",
  emoji: "🛠️",
  videoUrl: "https://www.youtube.com/embed/iXBQTbeZf6Y",
  conceptMd: `
## Anatomy of a method
\`\`\`java
public static int add(int a, int b) {
    return a + b;
}
\`\`\`
- \`public static\` — modifiers
- \`int\` — return type (\`void\` if it returns nothing)
- \`add\` — name (camelCase by convention)
- \`(int a, int b)\` — parameters
- \`return ...\` — produces the result

Call it: \`int sum = add(2, 3);\`

## Overloading
Same name, different parameter lists.
\`\`\`java
int add(int a, int b)        { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }
\`\`\`
The compiler picks based on the argument types.

## void & early return
\`\`\`java
public static void greet(String name) {
    if (name == null) return;
    System.out.println("Hi, " + name);
}
\`\`\`

## Why methods?
- **DRY** — Don't Repeat Yourself.
- **Readability** — \`calculateTax()\` reads better than 30 lines of math.
- **Testability** — small functions are easy to test.
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt: "What does this print?",
      starterCode: `public class Main {
    public static int triple(int n) {
        return n * 3;
    }
    public static void main(String[] args) {
        System.out.println(triple(4));
    }
}`,
      expectedOutput: "12",
      hint: "triple returns its input × 3.",
      solution: "triple(4) returns 4*3 = 12.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Write a max method",
      prompt:
        "Write a static method `int max(int a, int b)` that returns the larger of two ints. Then in main, print max(7, 12).",
      starterCode: `public class Main {
    // write max here

    public static void main(String[] args) {
        System.out.println(max(7, 12));
    }
}`,
      expectedOutput: "12",
      hint: "Use a ternary `return a > b ? a : b;` or a simple if/else.",
      solution: `public class Main {
    public static int max(int a, int b) {
        return a > b ? a : b;
    }
    public static void main(String[] args) {
        System.out.println(max(7, 12));
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This won't compile. Fix it so it prints 25.",
      starterCode: `public class Main {
    public static square(int n) {
        n * n;
    }
    public static void main(String[] args) {
        System.out.println(square(5));
    }
}`,
      expectedOutput: "25",
      hint: "Two bugs: the method has no return type declared, and it doesn't actually return anything.",
      solution: `public class Main {
    public static int square(int n) {  // declare return type
        return n * n;                  // and actually return
    }
    public static void main(String[] args) {
        System.out.println(square(5));
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "What does `void` mean as a return type?",
      choices: [
        "The method returns null",
        "The method returns nothing",
        "The method returns 0",
        "The method is private",
      ],
      answerIndex: 1,
      explanation:
        "`void` means no value is returned. You can still use a bare `return;` to exit early, but you can't `return someValue;`.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What is method overloading?",
      choices: [
        "Calling a method too many times in a row",
        "Two methods with the SAME name but DIFFERENT parameter lists",
        "Two methods with different names but same parameters",
        "Replacing a method's implementation at runtime",
      ],
      answerIndex: 1,
      explanation:
        "Overloading = same name, different parameter signatures. The compiler chooses the right one by argument types. (Different from *overriding*, which is a subclass replacing a parent's method.)",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "Can two overloads differ ONLY in return type?",
      choices: [
        "Yes, that's the most common form",
        "No — Java picks overloads by parameter types, not return type, so it would be ambiguous",
        "Yes, but only for primitive return types",
        "Only inside an interface",
      ],
      answerIndex: 1,
      explanation:
        "Method resolution uses the argument list. If two overloads had identical parameters but different return types, the compiler couldn't decide — so it's a compile error.",
    },
  ],
};
