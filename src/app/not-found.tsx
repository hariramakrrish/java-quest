import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl p-8 text-center">
      <div className="text-6xl">🫥</div>
      <h1 className="mt-3 font-display text-2xl font-bold">Topic not found</h1>
      <p className="mt-2 text-muted">That quest hasn&apos;t been written yet.</p>
      <Link href="/" className="btn-primary mt-5 inline-flex">
        ← Back to all topics
      </Link>
    </div>
  );
}
