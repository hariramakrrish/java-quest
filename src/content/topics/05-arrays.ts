import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "arrays",
  day: 5,
  title: "Arrays",
  module: "Java Basics",
  blurb: "Fixed-size, ordered collections of values of the same type.",
  emoji: "🗂️",
  videoUrl: "https://www.youtube.com/embed/NxCO4juhQu0",
  conceptMd: `
## Declaring & creating arrays
\`\`\`java
int[] nums = new int[5];           // length 5, all 0s
int[] primes = {2, 3, 5, 7, 11};   // literal initializer
String[] names = new String[]{"a","b","c"};
\`\`\`

## Accessing & length
\`\`\`java
System.out.println(primes[0]);     // 2
System.out.println(primes.length); // 5  (no parentheses!)
\`\`\`
Indexing is **0-based**. Going out of range throws \`ArrayIndexOutOfBoundsException\`.

## Iterating
\`\`\`java
for (int i = 0; i < primes.length; i++) {
    System.out.println(primes[i]);
}
for (int p : primes) {  // for-each
    System.out.println(p);
}
\`\`\`

## 2D arrays
\`\`\`java
int[][] grid = {
    {1, 2, 3},
    {4, 5, 6}
};
System.out.println(grid[1][2]);  // 6
\`\`\`

## Fixed size
Arrays cannot grow. For dynamic-size lists, use \`ArrayList\` (covered later).
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
        int[] a = {10, 20, 30, 40};
        System.out.println(a[2]);
    }
}`,
      expectedOutput: "30",
      hint: "Arrays are 0-indexed.",
      solution: "Index 0=10, 1=20, 2=30, 3=40 → a[2] is 30.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Find the max",
      prompt:
        "Given int[] arr = {3, 8, 2, 9, 4}, print the maximum element. Output just the number.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = {3, 8, 2, 9, 4};
        // your code here
    }
}`,
      expectedOutput: "9",
      hint: "Track a `max` variable, start it at arr[0], then update it whenever you see a bigger element.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[] arr = {3, 8, 2, 9, 4};
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        System.out.println(max);
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This should print every element of the array but it crashes with ArrayIndexOutOfBoundsException. Fix it.",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] data = {5, 10, 15, 20};
        for (int i = 0; i <= data.length; i++) {
            System.out.println(data[i]);
        }
    }
}`,
      expectedOutput: "5\n10\n15\n20",
      hint: "Length 4 means valid indices are 0..3. The condition `i <= data.length` lets i become 4 — out of range.",
      solution: `public class Main {
    public static void main(String[] args) {
        int[] data = {5, 10, 15, 20};
        for (int i = 0; i < data.length; i++) {  // < not <=
            System.out.println(data[i]);
        }
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "How do you get the size of an array `arr` in Java?",
      choices: ["arr.size()", "arr.length()", "arr.length", "size(arr)"],
      answerIndex: 2,
      explanation:
        "For arrays it's `arr.length` — a field, no parentheses. For collections like ArrayList it's `.size()`. Easy to mix up!",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What is the default value of an `int[]` element after `new int[3]`?",
      choices: ["null", "0", "undefined", "garbage memory"],
      answerIndex: 1,
      explanation:
        "Java initializes numeric primitive arrays to 0, boolean[] to false, and reference (e.g. String[]) arrays to null.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "Why can't you do `arr.add(99)` on a Java array?",
      choices: [
        "Wrong syntax — should be `arr.append(99)`",
        "Arrays are fixed-size — to grow, use ArrayList",
        "You can, it just resizes silently",
        "Only Object[] supports add",
      ],
      answerIndex: 1,
      explanation:
        "Java arrays have a fixed length set at creation. To grow/shrink dynamically, use `ArrayList` (or create a bigger array and copy).",
    },
  ],
};
