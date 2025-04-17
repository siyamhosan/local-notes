import { Note } from "@/lib/notes";
import { NoteCard } from "@/components/NoteCard";

interface NotesListProps {
  notes: Note[];
}

export function NotesList({ notes }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No notes found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.slug} note={note} />
      ))}
    </div>
  );
}
