import { notFound } from "next/navigation";
import { TOPICS, getTopicBySlug } from "@/content/topics";
import { TopicView } from "@/components/TopicView";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();
  return <TopicView topic={topic} />;
}
