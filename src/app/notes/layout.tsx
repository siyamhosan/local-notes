"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { SearchDialog } from "fumadocs-ui/components/dialog/search";
import { Note } from "@/lib/notes";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "../layout.config";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Note[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Optimized search with debounce
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/notes?search=${encodeURIComponent(query)}`,
        { next: { revalidate: 0 } }
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.notes);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearch(query);

      // Clear previous timeout for debounce
      const timeoutId = setTimeout(() => {
        performSearch(query);
      }, 300); // 300ms debounce time

      return () => clearTimeout(timeoutId);
    },
    [performSearch]
  );

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Ctrl (Windows/Linux) or Cmd (Mac) + K is pressed
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault(); // Prevent default browser behavior
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Format search results for the dialog
  const formattedResults =
    results.length === 0
      ? "empty"
      : results.map((result) => ({
          content: result.data.title,
          id: result.slug,
          url: `/notes/${result.slug}`,
          type: "page" as const,
        }));

  return (
    <HomeLayout {...baseOptions}>
      <main>{children}</main>

      <SearchDialog
        onOpenChange={setOpen}
        open={open}
        search={search}
        onSearchChange={handleSearch}
        results={formattedResults}
        isLoading={isSearching}
      />
    </HomeLayout>
  );
}
