import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "classes-objects",
  day: 8,
  title: "Classes & Objects",
  module: "Object-Oriented Java",
  blurb: "A class is a blueprint; an object is an instance built from that blueprint.",
  emoji: "🏗️",
  videoUrl: "https://www.youtube.com/embed/V8tQDD6FOdU",
  conceptMd: `
## Class anatomy
\`\`\`java
public class Dog {
    // fields (state)
    String name;
    int age;

    // constructor — runs when you do new Dog(...)
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // method (behavior)
    public void bark() {
        System.out.println(name + " says woof!");
    }
}
\`\`\`

## Creating an object
\`\`\`java
Dog d = new Dog("Rex", 4);
d.bark();          // Rex says woof!
System.out.println(d.age); // 4
\`\`\`

### \`this\`
Inside a method or constructor, \`this\` refers to the current object. It's how you tell *the field* \`name\` apart from *the parameter* \`name\`.

## Default constructor
If you don't write any constructor, Java gives you a free no-arg one. Once you write *any* constructor, that freebie is gone.

## Multiple objects, independent state
\`\`\`java
Dog a = new Dog("Rex", 4);
Dog b = new Dog("Milo", 2);
a.age = 5;
// a.age is 5, b.age is still 2 — they have separate memory
\`\`\`
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt: "What does this print?",
      starterCode: `public class Main {
    static class Box {
        int value;
        Box(int v) { this.value = v; }
    }
    public static void main(String[] args) {
        Box b = new Box(42);
        System.out.println(b.value);
    }
}`,
      expectedOutput: "42",
      hint: "The constructor sets value = v.",
      solution: "new Box(42) calls the constructor with v=42, which assigns this.value = 42. Printing b.value → 42.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Build a Rectangle class",
      prompt:
        "Create a class Rectangle with int fields width and height, a constructor (width, height), and a method `int area()`. In main, print the area of a Rectangle(4, 5).",
      starterCode: `public class Main {
    // Rectangle class here

    public static void main(String[] args) {
        Rectangle r = new Rectangle(4, 5);
        System.out.println(r.area());
    }
}`,
      expectedOutput: "20",
      hint: "static class Rectangle inside Main works fine for this exercise.",
      solution: `public class Main {
    static class Rectangle {
        int width, height;
        Rectangle(int width, int height) {
            this.width = width;
            this.height = height;
        }
        int area() { return width * height; }
    }
    public static void main(String[] args) {
        Rectangle r = new Rectangle(4, 5);
        System.out.println(r.area());
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This is supposed to print 'Rex' but prints 'null'. Fix the constructor.",
      starterCode: `public class Main {
    static class Dog {
        String name;
        Dog(String name) {
            name = name;
        }
    }
    public static void main(String[] args) {
        Dog d = new Dog("Rex");
        System.out.println(d.name);
    }
}`,
      expectedOutput: "Rex",
      hint: "Inside the constructor, `name = name` just assigns the parameter to itself. The field is never touched. Use `this`.",
      solution: `public class Main {
    static class Dog {
        String name;
        Dog(String name) {
            this.name = name;  // this.name refers to the FIELD
        }
    }
    public static void main(String[] args) {
        Dog d = new Dog("Rex");
        System.out.println(d.name);
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "What's the difference between a class and an object?",
      choices: [
        "Nothing — they're synonyms",
        "Class is the blueprint; an object is an instance created from it",
        "Object is the blueprint; class is the instance",
        "Classes hold methods, objects hold fields — that's it",
      ],
      answerIndex: 1,
      explanation:
        "A class describes structure and behavior. `new ClassName(...)` builds an *object* (an instance) with its own copy of the fields.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "When does Java provide a default no-arg constructor?",
      choices: [
        "Always",
        "Only if you write `public Default() {}`",
        "Only when you don't write any constructor at all",
        "Never — you must always write one",
      ],
      answerIndex: 2,
      explanation:
        "If you write zero constructors, Java gives you a free public no-arg one. Write any constructor and that freebie disappears — you'd have to add the no-arg explicitly if you want it.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question: "What does `this` refer to inside an instance method?",
      choices: [
        "The class itself",
        "The current object the method was called on",
        "The most recently created object",
        "A reference to the parent class",
      ],
      answerIndex: 1,
      explanation:
        "`this` is the receiver — the specific instance you called the method on. It's how you disambiguate fields from parameters of the same name and how you pass the current object to other methods.",
    },
  ],
};
