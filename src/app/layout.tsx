import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Java Quest — Learn Java one quest a day",
  description:
    "A daily Java learning game: one concept, three exercises (easy, medium, hard), three reviews. Built for streaks.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ctext y='52' font-size='52'%3E%E2%98%95%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen text-ink">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:pt-10">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-muted">
          built for streak-keepers · ☕ Java Quest
        </footer>
      </body>
    </html>
  );
}
