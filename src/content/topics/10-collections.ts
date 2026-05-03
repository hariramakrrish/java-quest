import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "collections",
  day: 10,
  title: "Collections — ArrayList & HashMap",
  module: "Java Standard Library",
  blurb: "Dynamic, type-safe data structures for everyday work.",
  emoji: "📚",
  videoUrl: "https://www.youtube.com/embed/viTHc_4XfCA",
  conceptMd: `
## ArrayList — a resizable array
\`\`\`java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Carol");

names.size();           // 3
names.get(0);           // "Alice"
names.set(1, "Bobby");  // replace
names.remove(0);        // remove by index
names.contains("Carol");// true

for (String n : names) {
    System.out.println(n);
}
\`\`\`
The \`<String>\` part is **generics** — it tells the list "you only hold Strings", giving you type safety at compile time.

## HashMap — key → value lookups
\`\`\`java
import java.util.HashMap;

HashMap<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);
ages.put("Bob", 25);

ages.get("Alice");          // 30
ages.containsKey("Bob");    // true
ages.getOrDefault("Eve", 0);// 0
ages.remove("Bob");

for (var entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
\`\`\`

### Choosing
- Need an **ordered, indexed list** → \`ArrayList\`.
- Need fast **lookup by key** → \`HashMap\`.
- Need **uniqueness** → \`HashSet\`.

### Why use these instead of arrays?
- Grow/shrink automatically.
- Rich API (\`contains\`, \`indexOf\`, sorting, etc.).
- Work seamlessly with streams, iterators, and the rest of the JDK.
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt: "What does this print?",
      starterCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(10);
        nums.add(20);
        nums.add(30);
        nums.remove(0);
        System.out.println(nums.get(0));
    }
}`,
      expectedOutput: "20",
      hint: "remove(0) deletes index 0 (which was 10). The list shifts left → index 0 is now what was index 1.",
      solution:
        "Start: [10,20,30]. After remove(0): [20,30]. get(0) → 20.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Word counter",
      prompt:
        "Given String[] words = {\"cat\",\"dog\",\"cat\",\"bird\",\"cat\",\"dog\"}, build a HashMap<String,Integer> of counts and print the count for 'cat'. Output just the number.",
      starterCode: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        String[] words = {"cat","dog","cat","bird","cat","dog"};
        // your code here
    }
}`,
      expectedOutput: "3",
      hint: "Use `counts.getOrDefault(w, 0) + 1` and put it back.",
      solution: `import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        String[] words = {"cat","dog","cat","bird","cat","dog"};
        HashMap<String,Integer> counts = new HashMap<>();
        for (String w : words) {
            counts.put(w, counts.getOrDefault(w, 0) + 1);
        }
        System.out.println(counts.get("cat"));
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This is supposed to remove every 'x' from the list and print [a, b]. But it crashes with ConcurrentModificationException. Fix it.",
      starterCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("a"); list.add("x"); list.add("b"); list.add("x");
        for (String s : list) {
            if (s.equals("x")) list.remove(s);
        }
        System.out.println(list);
    }
}`,
      expectedOutput: "[a, b]",
      hint: "You can't modify a list while iterating it with for-each. Use an Iterator + iterator.remove(), or removeIf().",
      solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("a"); list.add("x"); list.add("b"); list.add("x");
        list.removeIf(s -> s.equals("x"));  // safe modification
        System.out.println(list);
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "Which collection would you use for fast key→value lookups?",
      choices: ["ArrayList", "HashMap", "Array", "String"],
      answerIndex: 1,
      explanation:
        "HashMap gives ~O(1) average lookup by key. ArrayList is O(1) by index but O(n) to find by value.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What do the angle brackets in `ArrayList<String>` do?",
      choices: [
        "Decorative — they have no effect",
        "Specify generics — the list will only accept Strings; enforced at compile time",
        "Mark the list as final",
        "Set the maximum size",
      ],
      answerIndex: 1,
      explanation:
        "Generics give compile-time type safety. Without them you'd have a raw `ArrayList` of Object and would need casts everywhere — easy to break at runtime.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "Why does modifying a list inside a for-each loop throw ConcurrentModificationException?",
      choices: [
        "It's a bug in Java",
        "for-each uses an Iterator that detects structural changes via a `modCount` field — anything other than its own .remove() invalidates it",
        "Strings can't be removed",
        "The list is read-only inside loops",
      ],
      answerIndex: 1,
      explanation:
        "Iterators snapshot the list's modCount at creation. Modifying the list outside the iterator changes modCount → next .next() throws. Use iterator.remove() or removeIf().",
    },
  ],
};
