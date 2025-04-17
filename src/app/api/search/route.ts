import { source } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

export const { GET } = createSearchAPI("simple", {
  indexes: source.getPages().map((page) => ({
    title: page.data.title,
    content: page.data.content,
    url: page.url,
  })),
});
