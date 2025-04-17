"use client";

import Link from "next/link";
import { Note } from "@/lib/notes";
import { Tags } from "./Tags";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  // Format the date
  const formattedDate = new Date(note.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="block p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">
          {note.data.title}
        </h3>

        <div className="text-sm text-muted-foreground mb-4">
          {formattedDate}
        </div>

        {note.data.tags && <Tags tags={note.data.tags} className="mt-auto" />}
      </div>
    </Link>
  );
}
