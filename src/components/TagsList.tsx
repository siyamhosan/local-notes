import Link from "next/link";
import { Tag } from "@/lib/notes";

interface TagsListProps {
  tags: Tag[];
  activeTag?: string;
}

export function TagsList({ tags, activeTag }: TagsListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 my-6">
      <Link
        href="/notes"
        className={`px-3 py-1 rounded-full text-sm ${
          !activeTag
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        } transition-colors`}
      >
        All
      </Link>

      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/notes/tags/${tag.name}`}
          className={`px-3 py-1 rounded-full text-sm ${
            activeTag === tag.name
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          } transition-colors`}
        >
          {tag.name} <span className="text-xs ml-1">({tag.count})</span>
        </Link>
      ))}
    </div>
  );
}
