import { defineDocs, defineConfig } from "fumadocs-mdx/config";

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    async: true,
  },
});

export const notes = defineDocs({
  dir: "content/notes",
  docs: {
    async: true,
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
