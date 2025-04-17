"use client";

import Link from "next/link";

interface TagsProps {
  tags: string[];
  className?: string;
}

export function Tags({ tags, className = "" }: TagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/notes/tags/${tag}`}
          className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80"
          onClick={(e) => e.stopPropagation()}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
