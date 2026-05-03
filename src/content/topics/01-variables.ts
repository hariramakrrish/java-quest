import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "variables",
  day: 1,
  title: "Variables & Data Types",
  module: "Java Basics",
  blurb: "Containers that hold values. Java is statically typed — every variable has a fixed type.",
  emoji: "📦",
  videoUrl: "https://www.youtube.com/embed/so1iUWaLmKA",
  conceptMd: `
## What is a variable?
A **variable** is a named container that holds a value in memory. In Java, you must declare its **type** before using it — that's what *statically typed* means.

\`\`\`java
int age = 25;          // 32-bit integer
double price = 19.99;  // 64-bit floating point
char grade = 'A';      // single 16-bit Unicode character
boolean isOn = true;   // true / false
String name = "Hari";  // a sequence of characters (an object)
\`\`\`

### The 8 primitive types
| Type | Size | Example |
| --- | --- | --- |
| \`byte\` | 8-bit | -128 to 127 |
| \`short\` | 16-bit | -32,768 to 32,767 |
| \`int\` | 32-bit | most common integer |
| \`long\` | 64-bit | \`100L\` — note the \`L\` |
| \`float\` | 32-bit | \`3.14f\` — note the \`f\` |
| \`double\` | 64-bit | default for decimals |
| \`char\` | 16-bit | \`'A'\` (single quotes) |
| \`boolean\` | — | \`true\` / \`false\` |

### Rules to remember
- Names start with a letter, \`$\`, or \`_\` — never a digit.
- Java is **case-sensitive**: \`age\` and \`Age\` are different.
- Use \`final\` to make a variable a constant: \`final int MAX = 100;\`
- \`String\` is **not** a primitive — it's a class.
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt:
        "Read the code carefully and type what will be printed (exact match — including spacing).",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 2;
        System.out.println(a / b);
    }
}`,
      expectedOutput: "2",
      hint: "Integer division throws away the decimal — there's no rounding.",
      solution:
        "Both operands are int, so Java performs **integer division**: 5 / 2 = 2 (the .5 is discarded).",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Write the code",
      prompt:
        "Declare a constant DOUBLE called PI = 3.14159, declare an int called radius = 7, then print the area of the circle (PI * radius * radius). Output exactly the number, no label.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        // your code here
    }
}`,
      expectedOutput: "153.93791",
      hint: "Use `final double PI = 3.14159;` — and remember that double * int returns a double.",
      solution: `public class Main {
    public static void main(String[] args) {
        final double PI = 3.14159;
        int radius = 7;
        System.out.println(PI * radius * radius);
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This code should print the number 1234567890123, but it won't even compile. Fix it so it runs and prints that number.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int big = 1234567890123;
        System.out.println(big);
    }
}`,
      expectedOutput: "1234567890123",
      hint: "1234567890123 is bigger than Integer.MAX_VALUE (~2.1 billion). What type holds bigger ints? And how does Java mark literals of that type?",
      solution: `public class Main {
    public static void main(String[] args) {
        long big = 1234567890123L;  // long type + L suffix on the literal
        System.out.println(big);
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "Which of these is NOT a primitive type in Java?",
      choices: ["int", "boolean", "String", "char"],
      answerIndex: 2,
      explanation:
        "`String` is a class (an object), not a primitive. The 8 primitives are byte, short, int, long, float, double, char, boolean.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What does `final int MAX = 100;` mean?",
      choices: [
        "MAX is the last variable declared in the file",
        "MAX is a constant — its value cannot be reassigned",
        "MAX is a static variable accessible from anywhere",
        "MAX will be automatically deleted at end of scope",
      ],
      answerIndex: 1,
      explanation:
        "`final` makes a variable's value immutable — any attempt to reassign it later will be a compile-time error.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "What is the result type of `10 / 4` vs `10.0 / 4`?",
      choices: [
        "Both are `int` → 2",
        "Both are `double` → 2.5",
        "First is `int` → 2, second is `double` → 2.5",
        "First throws an error, second is `double` → 2.5",
      ],
      answerIndex: 2,
      explanation:
        "When BOTH operands are int, Java does integer division (drops the decimal). If at least one operand is a double, Java promotes the other to double and does floating-point division.",
    },
  ],
};
