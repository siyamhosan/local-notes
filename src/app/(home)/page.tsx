import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Local Notes App</h1>
      <p className="text-fd-muted-foreground mb-4">
        A local-first note-taking application built with Next.js and MDX.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/notes"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View Notes
        </Link>
        <Link
          href="/docs"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Documentation
        </Link>
      </div>
    </main>
  );
}
