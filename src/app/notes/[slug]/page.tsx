import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "@fumadocs/mdx-remote";
import { getMDXComponents } from "@/mdx-components";
import { TOCItems } from "fumadocs-ui/components/layout/toc";
import { Tags } from "@/components/Tags";

export const revalidate = 0; // Revalidate this page on every request

// Generate static params for all notes
export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

// Custom interface for TOC items
interface TocItem {
  id: string;
  title: string;
  depth: number;
}

// Function to extract headings for TOC
function extractToc(markdown: string): TocItem[] {
  // Regular expression to match markdown headings (# Heading)
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const title = match[2].trim();
    // Create an ID from the heading text
    const id = title.toLowerCase().replace(/[^\w]+/g, "-");

    headings.push({
      id,
      title,
      depth,
    });
  }

  return headings;
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  // Format the date
  const formattedDate = new Date(note.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Extract TOC from markdown
  const tocItems = extractToc(note.sourceContents);

  // Render MDX content
  const { body: MDXContent } = await compileMDX({
    source: note.sourceContents,
    components: getMDXComponents(),
  });

  return (
    <div className="container max-w-screen-xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <Link
            href="/notes"
            className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to notes
          </Link>
        </div>

        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          <a
            href={`https://github.com/yourusername/notes/edit/main/content/notes/${slug}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Note
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        <div className="min-w-0">
          <article className="max-w-3xl mx-auto">
            <div className="mb-8 pb-4 border-b border-border">
              <h1 className="text-4xl font-bold mb-3 text-foreground">
                {note.data.title}
              </h1>
              <div className="text-muted-foreground text-sm mb-4">
                {formattedDate}
              </div>

              <Tags tags={note.data.tags ?? []} />
            </div>

            <div
              className="prose dark:prose-invert prose-lg max-w-none 
              prose-headings:font-semibold prose-headings:text-foreground 
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg 
              prose-p:text-foreground/90
              prose-a:text-primary prose-a:no-underline
              prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-md 
              prose-img:rounded-lg 
              prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:italic
              prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-strong:text-foreground
              prose-li:text-foreground/90
            "
            >
              <MDXContent />
            </div>
          </article>
        </div>

        <div className="order-first lg:order-last w-full hidden lg:block">
          {tocItems.length > 0 ? (
            <TOCItems
              items={tocItems.map((item) => ({
                title: item.title,
                url: `#${item.id}`,
                depth: item.depth,
              }))}
            />
          ) : (
            <p className="text-muted-foreground">No headings found</p>
          )}
        </div>
      </div>
    </div>
  );
}
