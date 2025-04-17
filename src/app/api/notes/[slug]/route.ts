import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import fs from "fs";

// Function to get a note by slug
const getNoteBySlug = (slug: string) => {
  try {
    const notesDirectory = join(cwd(), "content/notes");
    const fullPath = join(notesDirectory, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    // Read file contents as string
    const fileContents = readFileSync(fullPath, "utf8");

    // Parse frontmatter and content (simple version without gray-matter)
    const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n/);

    if (!frontmatterMatch) {
      return {
        slug,
        data: { title: slug },
        sourceContents: fileContents,
      };
    }

    const frontmatterStr = frontmatterMatch[1];
    const content = fileContents.slice(frontmatterMatch[0].length);

    // Parse frontmatter manually
    const data: Record<string, any> = {};
    frontmatterStr.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {
        let value = valueParts.join(":").trim();

        // Handle arrays in the format: tags: ['tag1', 'tag2']
        if (value.startsWith("[") && value.endsWith("]")) {
          try {
            // Remove single quotes and replace with double quotes for JSON parsing
            const jsonValue = value.replace(/'/g, '"');
            data[key.trim()] = JSON.parse(jsonValue);
          } catch (e) {
            data[key.trim()] = value;
          }
        }
        // Handle string values with quotes
        else if (
          (value.startsWith("'") && value.endsWith("'")) ||
          (value.startsWith('"') && value.endsWith('"'))
        ) {
          data[key.trim()] = value.slice(1, -1);
        }
        // Other values
        else {
          data[key.trim()] = value;
        }
      }
    });

    return {
      slug,
      data,
      sourceContents: content,
    };
  } catch (error) {
    console.error(`Error getting note by slug: ${slug}`, error);
    return null;
  }
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const note = getNoteBySlug(slug);

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    return Response.json({ note });
  } catch (error) {
    console.error("Error fetching note:", error);
    return Response.json({ error: "Failed to fetch note" }, { status: 500 });
  }
}
