import type { Topic } from "@/lib/types";

export const topic: Topic = {
  slug: "inheritance",
  day: 9,
  title: "Inheritance",
  module: "Object-Oriented Java",
  blurb: "A child class reuses and extends the behavior of a parent class.",
  emoji: "🌳",
  videoUrl: "https://www.youtube.com/embed/3aOidNrhAOM",
  conceptMd: `
## extends
\`\`\`java
class Animal {
    void eat() { System.out.println("munch"); }
}

class Dog extends Animal {
    void bark() { System.out.println("woof"); }
}

Dog d = new Dog();
d.eat();   // inherited from Animal
d.bark();  // its own
\`\`\`

## Overriding
A child can replace a parent method by re-declaring it with the same signature. Use \`@Override\` — it tells the compiler to verify the signature matches.
\`\`\`java
class Cat extends Animal {
    @Override
    void eat() { System.out.println("nibble"); }
}
\`\`\`

## super
\`super.method(...)\` calls the parent's version. \`super(...)\` in a constructor calls the parent's constructor (must be the first line).

## Single inheritance
A Java class can extend exactly **one** parent. To get behavior from multiple sources, implement multiple **interfaces**.

## Polymorphism
\`\`\`java
Animal a = new Dog();   // upcast — legal
a.eat();                // calls Dog's eat() if overridden
// a.bark() — compile error, Animal doesn't have bark()
\`\`\`
The variable type controls *what you can call*; the actual object controls *which override runs*.
`,
  exercises: [
    {
      id: "ex1",
      type: "predict",
      difficulty: "easy",
      title: "Predict the output",
      prompt: "What does this print?",
      starterCode: `public class Main {
    static class A {
        void hi() { System.out.println("A"); }
    }
    static class B extends A {
        @Override
        void hi() { System.out.println("B"); }
    }
    public static void main(String[] args) {
        A x = new B();
        x.hi();
    }
}`,
      expectedOutput: "B",
      hint: "The variable is type A but the object is a B. Java picks the override based on the actual object.",
      solution:
        "Method dispatch in Java is based on the runtime type. x holds a B object, so B's overridden hi() runs → 'B'.",
    },
    {
      id: "ex2",
      type: "write",
      difficulty: "medium",
      title: "Subclass with extra method",
      prompt:
        "Given the Vehicle class below, write a Car class that extends Vehicle and adds a method `int wheels()` returning 4. In main, print new Car().wheels().",
      starterCode: `public class Main {
    static class Vehicle {
        String type() { return "vehicle"; }
    }
    // Car class here

    public static void main(String[] args) {
        Car c = new Car();
        System.out.println(c.wheels());
    }
}`,
      expectedOutput: "4",
      hint: "`static class Car extends Vehicle { int wheels() { return 4; } }`",
      solution: `public class Main {
    static class Vehicle {
        String type() { return "vehicle"; }
    }
    static class Car extends Vehicle {
        int wheels() { return 4; }
    }
    public static void main(String[] args) {
        Car c = new Car();
        System.out.println(c.wheels());
    }
}`,
    },
    {
      id: "ex3",
      type: "debug",
      difficulty: "hard",
      title: "Find and fix the bug",
      prompt:
        "This won't compile. The Pup constructor must call the Dog constructor properly. Fix it so it prints 'Rex'.",
      starterCode: `public class Main {
    static class Dog {
        String name;
        Dog(String name) { this.name = name; }
    }
    static class Pup extends Dog {
        Pup(String name) {
            // missing call to super
        }
    }
    public static void main(String[] args) {
        Pup p = new Pup("Rex");
        System.out.println(p.name);
    }
}`,
      expectedOutput: "Rex",
      hint: "Dog has no no-arg constructor, so Pup MUST explicitly call `super(name);` as its first statement.",
      solution: `public class Main {
    static class Dog {
        String name;
        Dog(String name) { this.name = name; }
    }
    static class Pup extends Dog {
        Pup(String name) {
            super(name);  // call parent constructor
        }
    }
    public static void main(String[] args) {
        Pup p = new Pup("Rex");
        System.out.println(p.name);
    }
}`,
    },
  ],
  review: [
    {
      id: "rv1",
      difficulty: "easy",
      question: "How many parent classes can a Java class extend?",
      choices: ["Zero", "Exactly one", "Up to three", "Unlimited"],
      answerIndex: 1,
      explanation:
        "Java has single inheritance for classes. To combine behavior from multiple sources, implement multiple interfaces.",
    },
    {
      id: "rv2",
      difficulty: "medium",
      question: "What does `@Override` actually do?",
      choices: [
        "Forces the method to override",
        "Tells the compiler to verify the method really overrides a parent method — and fail if not",
        "Marks the method as final",
        "Required for all child methods",
      ],
      answerIndex: 1,
      explanation:
        "@Override is a safety check. If you typo the name or wrong parameter types, the compiler errors out instead of silently creating a *new* method that doesn't override anything.",
    },
    {
      id: "rv3",
      difficulty: "hard",
      question:
        "Given `Animal a = new Dog();`, why can you call `a.eat()` (defined in Animal) but not `a.bark()` (defined in Dog)?",
      choices: [
        "Java forgets the original type after assignment",
        "The compile-time type of `a` is Animal, so only Animal's API is callable. The actual override picks the runtime version.",
        "bark() must be public to be visible",
        "You can — bark() will work fine",
      ],
      answerIndex: 1,
      explanation:
        "Compile-time type controls *what methods exist on the variable*. Runtime type controls *which override runs*. To call bark(), cast: `((Dog) a).bark();`",
    },
  ],
};
