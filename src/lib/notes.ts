import { cache } from "react";

// Types
export interface Note {
  slug: string;
  data: {
    title: string;
    date: string;
    tags?: string[];
    [key: string]: any;
  };
  sourceContents: string;
}

export interface Tag {
  name: string;
  count: number;
}

// Get all notes with frontmatter and content
export const getAllNotes = cache(async (): Promise<Note[]> => {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/notes`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
});

// Get note by slug
export const getNoteBySlug = cache(
  async (slug: string): Promise<Note | null> => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/notes/${slug}`, {
        next: { revalidate: 0 },
      });
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data.note;
    } catch (error) {
      console.error(`Error fetching note by slug: ${slug}`, error);
      return null;
    }
  }
);

// Get all unique tags from notes
export const getAllTags = cache(async (): Promise<Tag[]> => {
  const allNotes = await getAllNotes();
  const tagsMap = new Map<string, number>();

  allNotes.forEach((note) => {
    const tags = note.data.tags || [];
    tags.forEach((tag: string) => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagsMap.entries())
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

// Get notes filtered by tag
export const getNotesByTag = cache(async (tag: string): Promise<Note[]> => {
  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/notes?tag=${encodeURIComponent(tag)}`,
      {
        next: { revalidate: 0 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch notes by tag");
    }
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error(`Error fetching notes by tag: ${tag}`, error);
    return [];
  }
});

// Search notes by query
export const searchNotes = cache(async (query: string): Promise<Note[]> => {
  if (!query) return getAllNotes();

  try {
    const response = await fetch(
      `${process.env.APP_URL}/api/notes?search=${encodeURIComponent(query)}`,
      { next: { revalidate: 0 } }
    );
    if (!response.ok) {
      throw new Error("Failed to search notes");
    }
    const data = await response.json();
    return data.notes;
  } catch (error) {
    console.error(`Error searching notes: ${query}`, error);
    return [];
  }
});
