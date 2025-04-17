import { NotesList } from "@/components/NotesList";
import { TagsList } from "@/components/TagsList";
import { getAllTags, getNotesByTag } from "@/lib/notes";

export const revalidate = 0; // Revalidate this page on every request

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const notes = await getNotesByTag(tag);
  const tags = await getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-foreground">
          Notes tagged with &quot;{tag}&quot;
        </h1>
      </div>

      <TagsList tags={tags} activeTag={tag} />

      <NotesList notes={notes} />
    </div>
  );
}
