"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";

import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

type NotesClientProps = {
  tag?: string;
};

function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1000);

  const { data } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link
          href={"/notes/action/create"}
          aria-label="Create note"
          className={css.button}
        >
          Create note +
        </Link>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      <Toaster />
    </div>
  );
}

export default NotesClient;
