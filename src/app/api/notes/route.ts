import { NextRequest } from "next/server";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import matter from "gray-matter";
import Fuse from "fuse.js";

// Function to get all notes with frontmatter
const getAllNotes = () => {
  const notesDirectory = join(cwd(), "content/notes");
  const filenames = readdirSync(notesDirectory);

  const notes = filenames
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const fullPath = join(notesDirectory, filename);
      const fileContents = readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.mdx$/, ""),
        data,
        sourceContents: content,
      };
    })
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    });

  return notes;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    let notes = getAllNotes();

    // Filter by tag if provided
    if (tag) {
      notes = notes.filter(
        (note) => note.data.tags && note.data.tags.includes(tag)
      );
    }

    // Enhanced search with Fuse.js for fuzzy searching
    if (search) {
      const fuse = new Fuse(notes, {
        keys: [
          { name: "data.title", weight: 0.7 },
          { name: "sourceContents", weight: 0.3 },
          { name: "data.tags", weight: 0.2 },
        ],
        threshold: 0.3, // Lower threshold means more strict matching
        includeScore: true, // Include relevance score
        minMatchCharLength: 2, // Minimum characters to match
        useExtendedSearch: true, // Enable advanced search syntax
        ignoreLocation: true, // Better for full-text search
      });

      const searchResults = fuse.search(search);
      notes = searchResults.map((result) => result.item);
    }

    return Response.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return Response.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}
