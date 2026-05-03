import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "strings",
  day: 7,
  title: "Strings",
  module: "Java Basics",
  blurb: "Sequences of characters — and one of the most-used classes in Java.",
  emoji: "🧵",
  videoUrl: "https://www.youtube.com/embed/MAo5Y8nbF1c",
  conceptMd: `
## Creating strings
\`\`\`java
String a = "hello";              // string literal (preferred)
String b = new String("hello");  // explicit object — almost never used
\`\`\`

## Common methods
\`\`\`java
String s = "Hello, Java!";
s.length();              // 12
s.charAt(7);             // 'J'
s.indexOf("Java");       // 7
s.substring(7, 11);      // "Java"
s.toUpperCase();         // "HELLO, JAVA!"
s.replace("Java", "World"); // "Hello, World!"
s.trim();                // removes leading/trailing whitespace
s.contains("Java");      // true
s.split(", ");           // ["Hello", "Java!"]
\`\`\`

## Strings are immutable
Every operation returns a **new** String — the original is unchanged.
\`\`\`java
String x = "hi";
x.toUpperCase();           // returns "HI" but x is still "hi"
x = x.toUpperCase();       // now x is "HI"
\`\`\`

## == vs .equals()
**Never use == to compare string contents.** \`==\` checks if they're the same object in memory; \`.equals()\` checks the actual characters.
\`\`\`java
String a = new String("hi");
String b = new String("hi");
a == b;          // false — different objects
a.equals(b);     // true  — same content
\`\`\`

## Concatenation in loops → use StringBuilder
\`\`\`java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) sb.append(i);
String result = sb.toString();
\`\`\`
\`+\` in a loop creates many throwaway Strings — \`StringBuilder\` is mutable and fast.
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
        String s = "JavaQuest";
        System.out.println(s.substring(4));
    }
}`,
      expectedOutput: "Quest",
      hint: "substring(beginIndex) goes from beginIndex to the end. 0='J', 1='a', 2='v', 3='a', 4='Q'…",
      solution: "Starting at index 4 ('Q') to the end gives 'Quest'.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Reverse a string",
      prompt:
        "Given String s = \"hello\", print its reverse. Output exactly: olleh",
      starterCode: `public class Main {
    public static void main(String[] args) {
        String s = "hello";
        // your code here
    }
}`,
      expectedOutput: "olleh",
      hint: "Use a StringBuilder — it has a `.reverse()` method.",
      solution: `public class Main {
    public static void main(String[] args) {
        String s = "hello";
        String r = new StringBuilder(s).reverse().toString();
        System.out.println(r);
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This is supposed to print 'match' but prints 'no match'. Fix it.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        String a = new String("java");
        String b = new String("java");
        if (a == b) {
            System.out.println("match");
        } else {
            System.out.println("no match");
        }
    }
}`,
      expectedOutput: "match",
      hint: "`==` compares object identity, not content. To compare contents, use `.equals()`.",
      solution: `public class Main {
    public static void main(String[] args) {
        String a = new String("java");
        String b = new String("java");
        if (a.equals(b)) {  // .equals compares the characters
            System.out.println("match");
        } else {
            System.out.println("no match");
        }
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "Are Java Strings mutable?",
      choices: ["Yes", "No — every modification returns a new String", "Only if declared final", "Only inside methods"],
      answerIndex: 1,
      explanation:
        "Strings are immutable. Every method like .toUpperCase() returns a *new* String — the original never changes.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "Why use StringBuilder when concatenating in a loop?",
      choices: [
        "It looks cleaner",
        "Strings are immutable, so `+` in a loop creates many throwaway objects — StringBuilder is mutable and fast",
        "+ doesn't compile inside loops",
        "StringBuilder auto-formats text",
      ],
      answerIndex: 1,
      explanation:
        "Each `+` allocates a new String. StringBuilder mutates a single internal buffer, so it's O(n) instead of O(n²) for long loops.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "Why might `\"hello\" == \"hello\"` return true but `new String(\"hello\") == new String(\"hello\")` return false?",
      choices: [
        "Compiler bug",
        "String literals are interned (deduped in a pool); `new String(...)` always creates a fresh object",
        "Random — depends on JVM version",
        "They both return true",
      ],
      answerIndex: 1,
      explanation:
        "The JVM pools String literals so identical literals share one object. `new String(...)` bypasses the pool and creates a brand-new object each time. Always use .equals() to compare contents.",
    },
  ],
};
