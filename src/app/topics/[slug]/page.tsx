import { notFound } from "next/navigation";
import { getTopicBySlug } from "@/content/topics";
import { TopicView } from "@/components/TopicView";

export const dynamic = "force-dynamic";

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
