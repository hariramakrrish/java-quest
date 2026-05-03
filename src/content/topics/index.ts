import { topic as t01 } from "./01-variables";
import { topic as t02 } from "./02-operators";
import { topic as t03 } from "./03-conditionals";
import { topic as t04 } from "./04-loops";
import { topic as t05 } from "./05-arrays";
import { topic as t06 } from "./06-methods";
import { topic as t07 } from "./07-strings";
import { topic as t08 } from "./08-classes-objects";
import { topic as t09 } from "./09-inheritance";
import { topic as t10 } from "./10-collections";
import type { Topic } from "@/lib/types";

export const TOPICS: Topic[] = [t01, t02, t03, t04, t05, t06, t07, t08, t09, t10];

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getTopicByDay(day: number): Topic | undefined {
  return TOPICS.find((t) => t.day === day);
}
