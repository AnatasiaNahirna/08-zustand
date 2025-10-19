'use client'


import css from "./notesPage.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query"; 
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { useEffect } from "react";
import Link from "next/link";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
  tag?: string | "";
}

export default function NotesClient({tag}: NotesClientProps) {
        const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    const {
        data: notesData,
    } = useQuery({
        queryKey: ["notes", page, debouncedQuery, tag],
        queryFn: () => fetchNotes(page, debouncedQuery, tag),
        placeholderData: keepPreviousData, 
    });

    const handlePageClick = (event: { selected: number }): void => {
        setPage(event.selected + 1);
    };

    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);


    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchQuery} onChange={setSearchQuery} />
                {notesData && notesData.totalPages > 1 && (
                    <Pagination
                        pageCount={notesData.totalPages}
                        currentPage={page}
                        onPageChange={handlePageClick}
                    />
                )}
                <Link href="/notes/action/create" className={css.button}>Create note +</Link>
            </header>

            <main>
                {notesData && notesData.notes.length > 0 && (
                    <NoteList
                        notes={notesData.notes}
                    />
                )}
            </main>
        </div>
    );
}