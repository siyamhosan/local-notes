import { NotesList } from "@/components/NotesList";
import { TagsList } from "@/components/TagsList";
import { getAllNotes, getAllTags } from "@/lib/notes";

export const revalidate = 0; // Revalidate this page on every request

export default async function NotesPage() {
  const notes = await getAllNotes();
  const tags = await getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-foreground">All Notes</h1>
      </div>

      <TagsList tags={tags} />

      <NotesList notes={notes} />
    </div>
  );
}
