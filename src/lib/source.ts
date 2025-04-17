import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  // Enable search indexing
  search: {
    // Index all headings and content
    indexContent: true,
    // Index up to h4 headings
    indexDepth: 4,
  },
});
